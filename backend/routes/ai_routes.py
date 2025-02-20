from fastapi import APIRouter, Depends, HTTPException
from utils.auth_middleware import auth_handler
from services.gemini import analyze_report

router = APIRouter()

@router.get("/analyze")
async def analyze(current_user: str = Depends(auth_handler.verify_token)):
    # Your route logic here
    pass

@router.post("/analyze/{report_id}")
async def analyze_medical_report(
    report_id: str,
    current_user: dict = Depends(auth_handler.verify_token)
):
    try:
        analysis = await analyze_report(report_id)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
