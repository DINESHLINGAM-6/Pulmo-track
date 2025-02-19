from fastapi import APIRouter, UploadFile
from datetime import datetime

router = APIRouter()

@router.get("/")
async def get_reports():
    return [{
        "id": 1,
        "title": "Pulmonary Function Test",
        "date": datetime.now(),
        "doctor": "Dr. Sarah Smith",
        "type": "Test Results",
        "fileSize": "2.4 MB"
    }]

@router.post("/upload")
async def upload_report(file: UploadFile):
    return {"filename": file.filename} 