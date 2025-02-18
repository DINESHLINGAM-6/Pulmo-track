from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from models.report import Report
from services.mongo_service import db
from utils.auth_middleware import verify_token
import shutil
from pathlib import Path

router = APIRouter()

@router.post("/upload")
async def upload_report(file: UploadFile = File(...), user=Depends(verify_token)):
    file_location = f"reports/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    report_dict = {
        "patient_name": user["sub"],
        "report_data": file_location,
        "uploaded_at": datetime.datetime.utcnow()
    }
    await db.reports.insert_one(report_dict)
    return {"message": "Report uploaded successfully"}

@router.get("/")
async def get_reports(user=Depends(verify_token)):
    reports = await db.reports.find().to_list(100)
    return reports
