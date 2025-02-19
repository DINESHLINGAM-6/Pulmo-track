from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/metrics")
async def get_dashboard_metrics():
    return {
        "healthMetrics": [
            {"name": "Heart Rate", "value": "72 bpm", "color": "text-red-500"},
            {"name": "SpO2", "value": "98%", "color": "text-blue-500"},
            {"name": "Blood Pressure", "value": "120/80", "color": "text-purple-500"},
            {"name": "Air Quality", "value": "Good", "color": "text-green-500"}
        ],
        "dailyMissions": [
            {"title": "Take morning medication", "completed": True},
            {"title": "10 minute breathing exercise", "completed": False},
            {"title": "Record peak flow reading", "completed": False}
        ]
    }
