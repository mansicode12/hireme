import io
import PyPDF2

def extract_text_from_pdf(pdf_bytes):
    file_stream = io.BytesIO(pdf_bytes)           
    reader = PyPDF2.PdfReader(file_stream)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def analyze_resume(resume_bytes, job_desc):
    resume_text = extract_text_from_pdf(resume_bytes)

    # Simple keyword matching
    jd_keywords = [word.lower() for word in job_desc.split() if len(word) > 4]
    resume_words = resume_text.lower()

    matched = [kw for kw in jd_keywords if kw in resume_words]
    match_score = int((len(matched) / len(jd_keywords)) * 100)

    missing = list(set(jd_keywords) - set(matched))

    return {
        "match_score": match_score,
        "missing_keywords": missing[:10]
    }
