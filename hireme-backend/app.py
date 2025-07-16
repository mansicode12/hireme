from fastapi import FastAPI, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session
from models import AnalysisResult
from database import create_db_and_tables, get_session
from utils.resume_parser import analyze_resume
from utils.cover_letter_gen import generate_cover_letter
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/analyze")
async def analyze_endpoint(
    resume: UploadFile,
    job_description: str = Form(...),
    session: Session = Depends(get_session)
):
    resume_bytes = await resume.read()
    result = analyze_resume(resume_bytes, job_description)
    cover_letter = generate_cover_letter(job_description)

    analysis = AnalysisResult(
        resume_name=resume.filename,
        job_description=job_description,
        match_score=result["match_score"],
        missing_keywords=", ".join(result["missing_keywords"]),
        cover_letter=cover_letter
    )
    session.add(analysis)
    session.commit()
    session.refresh(analysis)

    return {
        "match_score": result["match_score"],
        "missing_keywords": result["missing_keywords"],
        "cover_letter": cover_letter
    }

@app.get("/reports", response_model=List[AnalysisResult])
def get_all_reports(session: Session = Depends(get_session)):
    return session.query(AnalysisResult).order_by(AnalysisResult.id.desc()).all()

@app.delete("/report/{report_id}")
def delete_report(report_id: int, session: Session = Depends(get_session)):
    report = session.get(AnalysisResult, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    session.delete(report)
    session.commit()
    return {"message": "Report deleted successfully"}
