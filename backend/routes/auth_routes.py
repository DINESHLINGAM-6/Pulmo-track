from fastapi import APIRouter, HTTPException
from services.auth_service import sign_up, sign_in

router = APIRouter()

@router.post("/signup")
async def signup(email: str, password: str):
    response = sign_up(email, password)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return {"message": "User created successfully"}

@router.post("/signin")
async def signin(email: str, password: str):
    response = sign_in(email, password)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return {"message": "Login successful"}
