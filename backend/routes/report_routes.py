from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status, Query, Form
from typing import List, Optional
from datetime import datetime
from models.report import Report, ReportType, ReportStatus, AIAnalysisResult
from services.mongo_service import db
from services.storage_service import upload_to_storage, delete_from_storage
from routes.auth_routes import get_current_user
from models.user import User
from bson import ObjectId
import uuid
from pydantic import BaseModel
from utils.auth_middleware import get_current_user
from services.mongo_service import mongodb

router = APIRouter()

class ReportResponse(BaseModel):
    id: str
    patient_id: str
    report_type: ReportType
    title: str
    description: Optional[str]
    file_url: str
    status: ReportStatus
    uploaded_at: datetime
    analyzed_at: Optional[datetime]
    ai_analysis: Optional[AIAnalysisResult]
    doctor_notes: Optional[str]
    is_critical: bool

ALLOWED_REPORT_TYPES = {
    'XRAY': ['image/jpeg', 'image/png', 'image/dicom'],
    'CT_SCAN': ['application/dicom', 'image/dicom'],
    'LAB_RESULT': ['application/pdf', 'image/jpeg', 'image/png'],
    'PRESCRIPTION': ['application/pdf'],
    'OTHER': ['application/pdf', 'image/jpeg', 'image/png']
}

MAX_FILE_SIZE = 15 * 1024 * 1024  # 15MB

async def validate_report_upload(file: UploadFile, report_type: ReportType) -> None:
    # Check file size
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)
    
    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds {MAX_FILE_SIZE/(1024*1024)}MB limit"
        )

    # Validate file type based on report type
    content_type = file.content_type
    allowed_types = ALLOWED_REPORT_TYPES.get(report_type.value, ALLOWED_REPORT_TYPES['OTHER'])
    
    if content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type {content_type} not allowed for report type {report_type}"
        )

@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...),
    report_type: str = Form(...),
    description: str = Form(None),
    current_user: dict = Depends(get_current_user)
):
    try:
        # Validate report type
        valid_types = ["medical_report", "xray", "ct_scan", "mri", "lab_result"]
        if report_type.lower() not in valid_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid report type. Must be one of: {', '.join(valid_types)}"
            )

        # Read file content
        content = await file.read()
        
        # Create report document
        report = {
            "_id": str(ObjectId()),
            "user_id": current_user["sub"],
            "filename": file.filename,
            "content_type": file.content_type,
            "report_type": report_type.lower(),
            "description": description,
            "uploaded_at": datetime.utcnow(),
            "file_size": len(content)
        }

        # Save file and report details
        await mongodb.db.reports.insert_one(report)
        
        return {
            "message": "Report uploaded successfully",
            "report_id": report["_id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/reports", response_model=List[ReportResponse])
async def get_reports(
    current_user: User = Depends(get_current_user),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
    report_type: Optional[ReportType] = None,
    is_critical: Optional[bool] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    try:
        # Build query
        query = {"patient_id": str(current_user["_id"])}
        
        if report_type:
            query["report_type"] = report_type
        if is_critical is not None:
            query["is_critical"] = is_critical
        if start_date and end_date:
            query["uploaded_at"] = {
                "$gte": start_date,
                "$lte": end_date
            }

        # Execute query with pagination
        reports = await db.reports.find(query)\
            .sort("uploaded_at", -1)\
            .skip(skip)\
            .limit(limit)\
            .to_list(length=limit)
            
        return reports

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving reports: {str(e)}"
        )

@router.get("/reports/{report_id}", response_model=ReportResponse)
async def get_report(
    report_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        report = await db.reports.find_one({
            "_id": ObjectId(report_id),
            "patient_id": str(current_user["_id"])
        })
        
        if not report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Report not found"
            )
            
        return report

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving report: {str(e)}"
        )

@router.put("/reports/{report_id}")
async def update_report(
    report_id: str,
    doctor_notes: Optional[str] = None,
    is_critical: Optional[bool] = None,
    current_user: User = Depends(get_current_user)
):
    try:
        # Build update document
        update_data = {}
        if doctor_notes is not None:
            update_data["doctor_notes"] = doctor_notes
        if is_critical is not None:
            update_data["is_critical"] = is_critical
            
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid update data provided"
            )

        # Update report
        result = await db.reports.update_one(
            {
                "_id": ObjectId(report_id),
                "patient_id": str(current_user["_id"])
            },
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Report not found or no changes made"
            )
            
        return {"message": "Report updated successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating report: {str(e)}"
        )

@router.delete("/reports/{report_id}")
async def delete_report(
    report_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        # Get report first to get file URL
        report = await db.reports.find_one({
            "_id": ObjectId(report_id),
            "patient_id": str(current_user["_id"])
        })
        
        if not report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Report not found"
            )

        # Delete file from storage
        await delete_from_storage(report["file_url"])
        
        # Delete report from database
        await db.reports.delete_one({"_id": ObjectId(report_id)})
        
        return {"message": "Report deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting report: {str(e)}"
        )
