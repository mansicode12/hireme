export default function CoverLetterOutput({ letter }) {
  return (
    <div className="bg-slate-800 border border-slate-700 text-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-rose-400">✉️ AI-Generated Cover Letter</h2>

      <textarea
        value={letter}
        readOnly
        rows="10"
        className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg p-3 resize-none shadow-inner"
      />

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          className="bg-rose-500 hover:bg-rose-600 transition text-white px-4 py-2 rounded-lg shadow"
          onClick={() => navigator.clipboard.writeText(letter)}
        >
          📋 Copy
        </button>
        <button
          className="bg-slate-600 hover:bg-slate-700 transition text-white px-4 py-2 rounded-lg shadow"
          onClick={() => {
            const blob = new Blob([letter], { type: "text/plain" })
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = "cover_letter.txt"
            link.click()
          }}
        >
          ⬇️ Download
        </button>
      </div>
    </div>
  )
}
