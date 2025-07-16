export default function MatchScoreBar({ score }) {
  const bgColor =
    score >= 75
      ? "bg-rose-500"
      : score >= 50
      ? "bg-rose-400"
      : "bg-rose-300"

  return (
    <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden shadow-inner border border-slate-600">
      <div
        className={`h-full ${bgColor} text-white text-sm font-semibold flex items-center justify-center transition-all duration-700`}
        style={{ width: `${score}%` }}
      >
        {score}%
      </div>
    </div>
  )
}
