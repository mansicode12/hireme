// src/components/ResumeUpload.jsx

export default function ResumeUpload({ fileInputRef }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result
        localStorage.setItem("resumeFile", base64)
      }
      reader.readAsArrayBuffer(file) 
    } else {
      alert("Please upload a PDF file.")
    }
  }

  return (
    <div className="bg-slate-800 text-white p-4 rounded-xl shadow-md border border-white/10">
      <h2 className="text-lg font-semibold mb-2">Upload Your Resume (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef} 
        className="w-full bg-slate-700 border border-slate-600 text-white rounded p-2"
        onChange={handleFileChange}
      />
    </div>
  )
}
