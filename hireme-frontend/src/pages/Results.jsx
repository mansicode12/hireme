// src/pages/Reports.jsx
import { useEffect, useState } from "react"

export default function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/reports")
        const data = await res.json()
        setReports(data)
      } catch (err) {
        console.error("Failed to fetch reports:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading)
    return <div className="text-white text-center mt-10">Loading reports...</div>

  return (
    <div className="min-h-screen px-6 py-12 bg-slate-900 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-rose-400">
        📊 Past Resume Analyses
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-400">No reports found.</p>
      ) : (
        <div className="grid gap-8 max-w-5xl mx-auto">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2 text-rose-300">
                {report.resume_name}
              </h2>
              <p className="text-sm text-gray-300 mb-1">
                <strong className="text-white">Match Score:</strong> {report.match_score}%
              </p>
              <p className="text-sm text-gray-300 mb-1">
                <strong className="text-white">Missing Keywords:</strong>{" "}
                {report.missing_keywords || "None"}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-white">Date:</strong>{" "}
                {new Date(report.created_at).toLocaleString()}
              </p>
              <details className="mt-3 cursor-pointer">
                <summary className="text-rose-400 hover:underline font-medium">
                  📄 View Cover Letter
                </summary>
                <p className="mt-3 whitespace-pre-wrap text-gray-200">{report.cover_letter}</p>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
