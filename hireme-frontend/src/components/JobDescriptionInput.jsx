export default function JobDescriptionInput({ onChange }) {
  const handleChange = (e) => {
    const value = e.target.value
    localStorage.setItem("jobDescription", value)
    onChange(value)
  }

  return (
    <div className="bg-slate-800 text-white p-4 rounded-xl shadow-md border border-slate-700">
      <h2 className="text-lg font-semibold mb-2 text-rose-400">📋 Paste Job Description</h2>
      <textarea
        rows="8"
        placeholder="Paste job description here..."
        className="w-full bg-slate-900 text-white border border-slate-600 rounded p-3 placeholder-gray-400"
        onChange={handleChange}
      />
    </div>
  )
}
