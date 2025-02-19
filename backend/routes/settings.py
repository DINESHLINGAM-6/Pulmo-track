from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UserSettings(BaseModel):
    notifications: bool
    privacy: dict
    devices: list
    profile: dict

@router.get("/")
async def get_settings():
    return {
        "sections": [
            {
                "title": "Profile Settings",
                "description": "Update your personal information"
            },
            {
                "title": "Notifications",
                "description": "Manage your notification preferences"
            },
            {
                "title": "Privacy & Security",
                "description": "Control your privacy settings"
            },
            {
                "title": "Connected Devices",
                "description": "Manage your connected health devices"
            }
        ]
    }

@router.put("/")
async def update_settings(settings: UserSettings):
    return {"status": "success", "data": settings} 