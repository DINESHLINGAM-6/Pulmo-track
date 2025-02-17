from pydantic import BaseModel
from datetime import datetime

class Report(BaseModel):
    patient_name: str
    report_data: str
    uploaded_at: datetime = datetime.utcnow()
