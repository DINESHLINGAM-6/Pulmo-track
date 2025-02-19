from fastapi import APIRouter
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
async def get_visits():
    return [{
        "id": 1,
        "doctor": "Dr. Sarah Smith",
        "hospital": "City General Hospital",
        "date": datetime.now(),
        "summary": "Regular checkup and lung function test",
        "status": "completed"
    }]

@router.post("/schedule")
async def schedule_visit(visit: Visit):
    return {"status": "success", "data": visit} 