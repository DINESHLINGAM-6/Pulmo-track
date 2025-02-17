from fastapi import APIRouter, HTTPException, Depends
from models.report import Report
from services.mongo_service import db
from utils.auth_middleware import verify_token

router = APIRouter()

@router.post("/upload")
async def upload_report(report: Report, user=Depends(verify_token)):
    report_dict = report.dict()
    await db.reports.insert_one(report_dict)
    return {"message": "Report uploaded successfully"}

@router.get("/")
async def get_reports(user=Depends(verify_token)):
    reports = await db.reports.find().to_list(100)
    return reports
