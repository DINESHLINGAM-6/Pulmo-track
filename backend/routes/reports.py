from fastapi import APIRouter, Depends, UploadFile, File
from datetime import datetime
from utils.auth_middleware import get_current_user
from services.storage_service import upload_to_storage

router = APIRouter()

@router.get("/")
async def get_reports(current_user: str = Depends(get_current_user)):
    return [{
        "id": 1,
        "title": "Lung Function Test",
        "date": datetime.now(),
        "type": "Test Results"
    }]

@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user)
):
    file_path = await upload_to_storage(file)
    return {"filename": file.filename, "path": file_path} 