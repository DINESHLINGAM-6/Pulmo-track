from fastapi import APIRouter, Depends
from utils.auth_middleware import get_current_user
from pydantic import BaseModel

router = APIRouter()

class UserSettings(BaseModel):
    notifications: bool
    privacy: dict
    devices: list
    profile: dict

@router.get("/")
async def get_settings(current_user: str = Depends(get_current_user)):
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
async def update_settings(
    settings: dict,
    current_user: str = Depends(get_current_user)
):
    return {"status": "success", "data": settings} 