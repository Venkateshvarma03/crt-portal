function ProgressRingCard({ label, value, max = 100, statusText, color = '#22c55e' }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference
  const offset = circumference - progress

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col items-center">
      <p className="text-sm text-gray-500 self-start mb-2">{label}</p>
      <div className="relative w-24 h-24">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
         <span className="text-xl font-extrabold text-gray-900">{value}</span>          <span className="text-[10px] text-gray-400">/{max}</span>
        </div>
      </div>
      {statusText && <p className="text-xs text-gray-500 mt-2">{statusText}</p>}
    </div>
  )
}

export default ProgressRingCard