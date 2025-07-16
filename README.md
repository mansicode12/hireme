# 💼 HireMe – AI Resume Analyzer & Matcher

**HireMe** is an intelligent resume analyzer that helps job seekers evaluate their resume against job descriptions, highlighting missing keywords, generating AI-based cover letters, and storing reports for future reference.

---

## 🚀 Features

- ✅ Resume Matching – Compare resumes to job descriptions and get a match score
- 🧠 Keyword Analysis – Identify missing skills or keywords from the job post
- ✍️ AI Cover Letter – Auto-generate personalized cover letters
- 📊 Reports Dashboard – View, manage, and delete previous analysis reports
- 🔐 Authentication – Register & log in with secure local authentication
- 📁 Resume Upload – Upload `.pdf` resumes directly for analysis
- 🎨 Clean UI – Built with React + Tailwind CSS for a sleek, responsive experience

---

## 📸 Screenshots

### 🏠 Home Page  
![Home Page](./screenshots/home.png)

### 📥 Upload + Analyze  
![Resume Upload](./screenshots/analyze.png)

### 📊 Past Reports  
![Reports](./screenshots/reports.png)

### 🔐 Login / Register  
![Login](./screenshots/login.png)

---

## 🧱 Tech Stack

**Frontend**: React, Tailwind CSS  
**Backend**: FastAPI (with Flask adapter), Python  
**AI/ML Tools**: OpenRouter API (for cover letter generation), Resume Parsing Logic  
**Database**: SQLite  
**Other**: LocalStorage for auth/session, FormData for uploads

---
---

## ⚙️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/mansicode12/hireme.git
cd hireme
2. Start the Backend
bash
Copy
Edit
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
The backend should now be running at http://127.0.0.1:8000

3. Start the Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
The frontend will be available at http://localhost:5173

