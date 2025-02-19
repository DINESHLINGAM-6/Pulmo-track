from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/events")
async def get_timeline_events():
    return [{
        "id": 1,
        "date": datetime.now(),
        "title": "Doctor Visit",
        "description": "Regular checkup with Dr. Smith",
        "type": "visit"
    }, {
        "id": 2,
        "date": datetime.now() - timedelta(days=1),
        "title": "Lung Function Test",
        "description": "SpO2 levels normal",
        "type": "test"
    }] 