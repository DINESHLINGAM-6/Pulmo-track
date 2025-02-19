from fastapi import APIRouter, Depends
from utils.auth_middleware import get_current_user
from backend.services.gemini import analyze_report

router = APIRouter()

@router.get("/analyze")
async def analyze(current_user: str = Depends(get_current_user)):
    # Your route logic here
    pass

@router.post("/analyze")
async def analyze(report_id: str, user=Depends(verify_token)):
    analysis = await analyze_report(report_id)
    return {"analysis": analysis}
