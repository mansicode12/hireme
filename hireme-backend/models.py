# models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

class AnalysisResult(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    resume_name: str
    job_description: str
    match_score: int
    missing_keywords: str  # Store as comma-separated string
    cover_letter: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))