from fastapi import APIRouter, Depends
from utils.auth_middleware import verify_token
from backend.services.gemini import analyze_report

router = APIRouter()

@router.post("/analyze")
async def analyze(report_id: str, user=Depends(verify_token)):
    analysis = await analyze_report(report_id)
    return {"analysis": analysis}
