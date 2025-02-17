from fastapi import APIRouter, Depends
from services.mongo_service import db
from utils.auth_middleware import verify_token

router = APIRouter()

@router.get("/me")
async def get_user_details(user=Depends(verify_token)):
    db_user = await db.users.find_one({"email": user["sub"]}, {"_id": 0, "password": 0})
    return db_user
