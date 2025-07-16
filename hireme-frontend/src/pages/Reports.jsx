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

  // ✅ DELETE function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return

    try {
      await fetch(`http://127.0.0.1:8000/report/${id}`, {
        method: "DELETE",
      })
      setReports((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error("Failed to delete report:", err)
      alert("Could not delete report.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-lg text-rose-300 animate-pulse">Loading reports...</p>
      </div>
    )
  }

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
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-rose-300">
                  📄 {report.resume_name}
                </h2>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="text-sm text-red-400 hover:text-red-600 font-semibold"
                  title="Delete this report"
                >
                  ❌
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-1">
                🕒 {new Date(report.created_at).toLocaleString()}
              </p>

              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  <strong className="text-white">Match Score:</strong>{" "}
                  {report.match_score}%
                </p>
                <p>
                  <strong className="text-white">Missing Keywords:</strong>{" "}
                  {report.missing_keywords || "None"}
                </p>
              </div>

              <details className="mt-3 cursor-pointer">
                <summary className="text-rose-400 hover:underline font-medium">
                  📬 View Cover Letter
                </summary>
                <p className="mt-3 whitespace-pre-wrap text-gray-200">
                  {report.cover_letter}
                </p>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
