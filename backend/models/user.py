from pydantic import BaseModel, EmailStr, constr
from datetime import datetime
from typing import Optional
from enum import Enum

class Sex(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class CancerType(str, Enum):
    NSCLC = "NSCLC"
    SLC = "SLC"

class BloodType(str, Enum):
    A_POSITIVE = "A+"
    A_NEGATIVE = "A-"
    B_POSITIVE = "B+"
    B_NEGATIVE = "B-"
    O_POSITIVE = "O+"
    O_NEGATIVE = "O-"
    AB_POSITIVE = "AB+"
    AB_NEGATIVE = "AB-"

class UserSettings(BaseModel):
    notifications: bool = True
    reminders: bool = True
    data_sharing: bool = False

class User(BaseModel):
    # Authentication fields
    username: str
    email: EmailStr
    password: str
    
    # Personal Information
    name: Optional[str] = None
    phone_number: Optional[constr(regex=r'^\+?[1-9]\d{8,14}$')] = None
    dob: Optional[datetime] = None
    sex: Optional[Sex] = None
    blood_type: Optional[BloodType] = None
    
    # Medical Information
    diagnosed_with_lung_cancer: Optional[bool] = None
    cancer_type: Optional[CancerType] = None
    
    # System fields
    registration_date: datetime = datetime.utcnow()
    settings: UserSettings = UserSettings()
    
    # Optional tracking fields for dashboard
    last_spo2_level: Optional[float] = None
    last_cough_count: Optional[int] = None
    next_doctor_visit: Optional[datetime] = None

    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
