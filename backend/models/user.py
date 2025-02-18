from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class User(BaseModel):
    username: str
    email: EmailStr
    password: str
    name: Optional[str] = None
    age: Optional[int] = None
    sex: Optional[str] = None
    diagnosed_with_lung_cancer: Optional[bool] = None
    registration_date: datetime = datetime.utcnow()  # Use datetime instead of date
