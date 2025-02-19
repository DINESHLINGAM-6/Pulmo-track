from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime
from models.report import Report, ReportType, ReportStatus
from services.mongo_service import db
from services.storage_service import upload_to_storage  # You'll need to implement this
from routes.auth_routes import get_current_user
from models.user import User
import uuid
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter()

ALLOWED_FILE_TYPES = {
    'image': ['image/jpeg', 'image/png', 'image/dicom'],
    'document': ['application/pdf'],
    'data': ['text/csv', 'application/json']
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

class FileResponse(BaseModel):
    file_id: str
    filename: str
    file_url: str
    report_id: Optional[str]
    upload_date: datetime
    file_type: str
    file_size: int

async def validate_file(file: UploadFile) -> None:
    # Check file size
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)
    
    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size ({size} bytes) exceeds maximum allowed size ({MAX_FILE_SIZE} bytes)"
        )

    # Validate file type
    content_type = file.content_type
    allowed_types = [mime for types in ALLOWED_FILE_TYPES.values() for mime in types]
    if content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type {content_type} not supported. Allowed types: {allowed_types}"
        )

@router.post("/upload", response_model=FileResponse)
async def upload_file(
    file: UploadFile = File(...),
    report_type: ReportType = None,
    description: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    try:
        # Validate file
        await validate_file(file)
        
        # Generate unique IDs
        file_id = str(uuid.uuid4())
        report_id = str(ObjectId())
        
        # Read file contents
        contents = await file.read()
        
        # Upload file to storage (implement this according to your storage solution)
        file_url = await upload_to_storage(file_id, contents, file.content_type)
        
        # Create report entry
        report = Report(
            id=report_id,
            patient_id=str(current_user["_id"]),
            report_type=report_type or ReportType.OTHER,
            title=file.filename,
            description=description,
            file_url=file_url,
            file_type=file.content_type,
            file_size=len(contents),
            status=ReportStatus.PENDING
        )
        
        # Save report to database
        await db.reports.insert_one(report.dict(by_alias=True))
        
        return FileResponse(
            file_id=file_id,
            filename=file.filename,
            file_url=file_url,
            report_id=report_id,
            upload_date=datetime.utcnow(),
            file_type=file.content_type,
            file_size=len(contents)
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )

@router.get("/files", response_model=List[FileResponse])
async def get_user_files(
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 10
):
    try:
        reports = await db.reports.find(
            {"patient_id": str(current_user["_id"])}
        ).skip(skip).limit(limit).to_list(length=limit)
        
        return [
            FileResponse(
                file_id=str(report["_id"]),
                filename=report["title"],
                file_url=report["file_url"],
                report_id=str(report["_id"]),
                upload_date=report["uploaded_at"],
                file_type=report["file_type"],
                file_size=report["file_size"]
            ) for report in reports
        ]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving files: {str(e)}"
        )

@router.delete("/files/{file_id}")
async def delete_file(
    file_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        # Check if file exists and belongs to user
        report = await db.reports.find_one({
            "_id": ObjectId(file_id),
            "patient_id": str(current_user["_id"])
        })
        
        if not report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found or access denied"
            )
        
        # Delete file from storage
        # Implement delete_from_storage according to your storage solution
        await delete_from_storage(report["file_url"])
        
        # Delete report from database
        await db.reports.delete_one({"_id": ObjectId(file_id)})
        
        return {"message": "File deleted successfully"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting file: {str(e)}"
        )

@router.get("/files/{file_id}")
async def get_file(
    file_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        report = await db.reports.find_one({
            "_id": ObjectId(file_id),
            "patient_id": str(current_user["_id"])
        })
        
        if not report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found or access denied"
            )
            
        return FileResponse(
            file_id=str(report["_id"]),
            filename=report["title"],
            file_url=report["file_url"],
            report_id=str(report["_id"]),
            upload_date=report["uploaded_at"],
            file_type=report["file_type"],
            file_size=report["file_size"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving file: {str(e)}"
        )
