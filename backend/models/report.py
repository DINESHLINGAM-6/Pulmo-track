from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum

class ReportType(str, Enum):
    SPIROMETRY = "spirometry"
    XRAY = "xray"
    CT_SCAN = "ct_scan"
    MRI = "mri"
    BLOOD_TEST = "blood_test"
    BIOPSY = "biopsy"
    OTHER = "other"

class ReportStatus(str, Enum):
    PENDING = "pending"
    ANALYZED = "analyzed"
    REVIEWED = "reviewed"
    ARCHIVED = "archived"

class AIAnalysisResult(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    findings: List[str]
    severity: str
    recommendations: List[str]
    confidence_score: float
    metadata: Dict[str, str]

class VitalSigns(BaseModel):
    spo2_level: Optional[float] = None
    heart_rate: Optional[int] = None
    blood_pressure: Optional[str] = None
    respiratory_rate: Optional[int] = None
    temperature: Optional[float] = None

class Report(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    id: Optional[str] = None
    patient_id: str
    doctor_id: Optional[str] = None
    
    # Basic Information
    type: ReportType
    title: str
    description: Optional[str] = None
    
    # File Information
    file_path: str
    file_type: str  # e.g., "pdf", "jpg", "dicom"
    file_size: Optional[int] = None
    
    # Timestamps
    uploaded_at: datetime = datetime.utcnow()
    analyzed_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    
    # Status and Results
    status: ReportStatus = ReportStatus.PENDING
    vital_signs: Optional[VitalSigns] = None
    analysis_result: Optional[AIAnalysisResult] = None
    
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
    
    created_at: Optional[str] = None
    
    def get_summary(self) -> Dict[str, any]:
        """Returns a summary of the report for dashboard display"""
        return {
            "title": self.title,
            "type": self.type,
            "date": self.uploaded_at,
            "status": self.status,
            "is_critical": self.is_critical,
            "key_findings": self.analysis_result.findings if self.analysis_result else None,
            "next_appointment": self.next_appointment
        }
