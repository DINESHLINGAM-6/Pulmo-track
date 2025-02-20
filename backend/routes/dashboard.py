from fastapi import APIRouter, Depends, HTTPException
from utils.auth_middleware import get_current_user
from services.mongo_service import mongodb

router = APIRouter()

@router.get("/metrics")
async def get_dashboard_metrics(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("sub")  # Get user ID from token payload
        
        # Get user's latest health metrics
        latest_spo2 = await mongodb.db.spo2_readings.find_one(
            {"user_id": user_id},
            sort=[("timestamp", -1)]
        )
        
        latest_cough = await mongodb.db.cough_counts.find_one(
            {"user_id": user_id},
            sort=[("timestamp", -1)]
        )

        return {
            "healthMetrics": [
                {
                    "name": "SpO2",
                    "value": f"{latest_spo2['value']}%" if latest_spo2 else "98%",
                    "color": "text-blue-500"
                },
                {
                    "name": "Heart Rate",
                    "value": "72 bpm",
                    "color": "text-red-500"
                },
                {
                    "name": "Cough Count",
                    "value": str(latest_cough['count']) if latest_cough else "0",
                    "color": "text-purple-500"
                }
            ],
            "dailyMissions": [
                {"title": "Take morning medication", "completed": True},
                {"title": "Record SpO2 reading", "completed": False},
                {"title": "10 minute breathing exercise", "completed": False}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
