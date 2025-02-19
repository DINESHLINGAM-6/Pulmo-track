from pydantic import BaseModel, constr
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum

class ReportType(str, Enum):
    XRAY = "xray"
    CT_SCAN = "ct_scan"
    MRI = "mri"
    BLOOD_TEST = "blood_test"
    BIOPSY = "biopsy"
    SPIROMETRY = "spirometry"
    OTHER = "other"

class ReportStatus(str, Enum):
    PENDING = "pending"
    ANALYZED = "analyzed"
    REVIEWED = "reviewed"
    ARCHIVED = "archived"

class AIAnalysisResult(BaseModel):
    confidence_score: float
    findings: List[str]
    recommendations: List[str]
    risk_level: str
    detected_anomalies: Optional[List[Dict[str, any]]] = None
    
class VitalSigns(BaseModel):
    spo2_level: Optional[float] = None
    heart_rate: Optional[int] = None
    blood_pressure: Optional[str] = None
    respiratory_rate: Optional[int] = None
    temperature: Optional[float] = None

class Report(BaseModel):
    # Identification
    id: Optional[str] = None
    patient_id: str
    doctor_id: Optional[str] = None
    
    # Basic Information
    report_type: ReportType
    title: str
    description: Optional[str] = None
    
    # File Information
    file_url: str
    file_type: str  # e.g., "pdf", "jpg", "dicom"
    file_size: Optional[int] = None
    
    # Timestamps
    uploaded_at: datetime = datetime.utcnow()
    analyzed_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    
    # Status and Results
    status: ReportStatus = ReportStatus.PENDING
    vital_signs: Optional[VitalSigns] = None
    ai_analysis: Optional[AIAnalysisResult] = None
    
    # Doctor's Input
    doctor_notes: Optional[str] = None
    diagnosis: Optional[str] = None
    recommended_actions: Optional[List[str]] = None
    
    # Follow-up
    next_appointment: Optional[datetime] = None
    follow_up_required: bool = False
    
    # Metadata
    tags: List[str] = []
    is_critical: bool = False
    visibility: str = "private"  # private, shared, public
    
    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        
    def get_summary(self) -> Dict[str, any]:
        """Returns a summary of the report for dashboard display"""
        return {
            "title": self.title,
            "type": self.report_type,
            "date": self.uploaded_at,
            "status": self.status,
            "is_critical": self.is_critical,
            "key_findings": self.ai_analysis.findings if self.ai_analysis else None,
            "next_appointment": self.next_appointment
        }
