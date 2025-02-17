from fastapi import APIRouter, HTTPException
from backend.services.mongo_service import reports_collection
from bson import ObjectId # type: ignore

router = APIRouter()

# Create a report
@router.post("/report")
async def create_report(report: dict):
    new_report = await reports_collection.insert_one(report)
    return {"id": str(new_report.inserted_id)}

# Get all reports
@router.get("/reports")
async def get_reports():
    reports = await reports_collection.find().to_list(100)
    return reports

# Get a report by ID
@router.get("/report/{report_id}")
async def get_report(report_id: str):
    report = await reports_collection.find_one({"_id": ObjectId(report_id)})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
