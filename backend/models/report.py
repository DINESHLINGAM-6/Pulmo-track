from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Report(BaseModel):
    patient_name: str
    report_data: str
    uploaded_at: datetime = datetime.utcnow()
    ai_analysis_result: Optional[str] = None
