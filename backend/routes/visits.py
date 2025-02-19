from fastapi import APIRouter, Depends
from utils.auth_middleware import get_current_user
from pydantic import BaseModel
from datetime import datetime
from typing import List

router = APIRouter()

class Visit(BaseModel):
    id: int
    doctor: str
    hospital: str
    date: datetime
    summary: str
    status: str

@router.get("/")
async def get_visits(current_user: str = Depends(get_current_user)):
    return [{
        "id": 1,
        "doctor": "Dr. Smith",
        "date": datetime.now(),
        "summary": "Regular checkup",
        "status": "completed"
    }]

@router.post("/schedule")
async def schedule_visit(visit: dict, current_user: str = Depends(get_current_user)):
    return {"status": "success", "data": visit} 