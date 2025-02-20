from fastapi import APIRouter, Depends, HTTPException
from utils.auth_middleware import auth_handler
from services.gemini import generate_report

router = APIRouter()

@router.post("/chat")
async def chat_with_bot(
    message: str,
    current_user: dict = Depends(auth_handler.verify_token)
):
    try:
        response = {
            "message": f"You said: {message}",
            "suggestions": [
                "Tell me about my health metrics",
                "When is my next appointment?",
                "Show my recent reports"
            ]
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-report")
async def generate_medical_report(
    visit_details: dict,
    current_user: dict = Depends(auth_handler.verify_token)
):
    try:
        report = generate_report(visit_details)
        return {"report": report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
