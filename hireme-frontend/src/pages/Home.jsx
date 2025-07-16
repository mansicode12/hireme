import { useRef, useState } from "react"
import ResumeUpload from "../components/ResumeUpload"
import JobDescriptionInput from "../components/JobDescriptionInput"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const fileInputRef = useRef()
  const [jobDescription, setJobDescription] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const file = fileInputRef.current.files[0]
    if (!file || !jobDescription) {
      alert("Please upload a resume and paste the job description.")
      return
    }

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("job_description", jobDescription)

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("hireme_results", JSON.stringify(data))
        navigate("/results")
      } else {
        alert("Error: " + (data?.detail || "Something went wrong"))
      }
    } catch (err) {
      console.error(err)
      alert("Network error while submitting data")
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 grid gap-8 place-items-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold text-rose-400 text-center">
        HireMe - AI Resume Matcher
      </h1>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
        <ResumeUpload fileInputRef={fileInputRef} />
        <JobDescriptionInput onChange={setJobDescription} />
      </div>

      <button
        className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl shadow-lg"
        onClick={handleSubmit}
      >
       🚀 Analyze Resume
      </button>

      <button
        onClick={() => navigate("/reports")}
        className="text-sm text-rose-400 underline hover:text-rose-500 mt-2"
      >
        📊 View Past Reports
      </button>
    </div>
  )
}
