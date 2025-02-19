from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import Optional, List, Dict
from datetime import datetime
from models.user import User, UserSettings, Sex, BloodType, CancerType
from services.mongo_service import db
from routes.auth_routes import get_current_user
from bson import ObjectId
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    name: Optional[str]
    phone_number: Optional[str]
    dob: Optional[datetime]
    sex: Optional[Sex]
    blood_type: Optional[BloodType]
    diagnosed_with_lung_cancer: Optional[bool]
    cancer_type: Optional[CancerType]
    registration_date: datetime
    settings: UserSettings
    last_spo2_level: Optional[float]
    last_cough_count: Optional[int]
    next_doctor_visit: Optional[datetime]

class UserUpdateRequest(BaseModel):
    name: Optional[str]
    phone_number: Optional[str]
    dob: Optional[datetime]
    sex: Optional[Sex]
    blood_type: Optional[BloodType]
    diagnosed_with_lung_cancer: Optional[bool]
    cancer_type: Optional[CancerType]
    settings: Optional[UserSettings]

@router.get("/me", response_model=UserResponse)
async def get_user_details(current_user: User = Depends(get_current_user)):
    try:
        user_data = await db.users.find_one(
            {"_id": ObjectId(current_user["_id"])},
            {"password": 0}  # Exclude password from response
        )
        
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        # Convert ObjectId to string for response
        user_data["id"] = str(user_data["_id"])
        del user_data["_id"]
        
        return user_data

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving user details: {str(e)}"
        )

@router.put("/me", response_model=UserResponse)
async def update_user_details(
    updates: UserUpdateRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        # Convert updates to dict and remove None values
        update_data = {k: v for k, v in updates.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid update data provided"
            )

        # Update user in database
        result = await db.users.update_one(
            {"_id": ObjectId(current_user["_id"])},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found or no changes made"
            )
        
        # Get updated user data
        updated_user = await db.users.find_one(
            {"_id": ObjectId(current_user["_id"])},
            {"password": 0}
        )
        
        # Convert ObjectId to string for response
        updated_user["id"] = str(updated_user["_id"])
        del updated_user["_id"]
        
        return updated_user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating user details: {str(e)}"
        )

@router.put("/me/settings", response_model=UserSettings)
async def update_user_settings(
    settings: UserSettings,
    current_user: User = Depends(get_current_user)
):
    try:
        result = await db.users.update_one(
            {"_id": ObjectId(current_user["_id"])},
            {"$set": {"settings": settings.dict()}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found or no changes made"
            )
            
        return settings

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating user settings: {str(e)}"
        )

@router.put("/me/vitals")
async def update_vital_signs(
    spo2_level: Optional[float] = None,
    cough_count: Optional[int] = None,
    current_user: User = Depends(get_current_user)
):
    try:
        update_data = {}
        if spo2_level is not None:
            if not 0 <= spo2_level <= 100:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="SpO2 level must be between 0 and 100"
                )
            update_data["last_spo2_level"] = spo2_level
            
        if cough_count is not None:
            if cough_count < 0:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Cough count cannot be negative"
                )
            update_data["last_cough_count"] = cough_count

        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No valid vital signs provided"
            )

        result = await db.users.update_one(
            {"_id": ObjectId(current_user["_id"])},
            {"$set": update_data}
        )
        
        return {"message": "Vital signs updated successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating vital signs: {str(e)}"
        )

@router.put("/me/next-visit")
async def update_next_visit(
    next_visit: datetime,
    current_user: User = Depends(get_current_user)
):
    try:
        if next_visit < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Next visit date cannot be in the past"
            )

        result = await db.users.update_one(
            {"_id": ObjectId(current_user["_id"])},
            {"$set": {"next_doctor_visit": next_visit}}
        )
        
        return {"message": "Next visit date updated successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating next visit date: {str(e)}"
        )
