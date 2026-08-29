function RecentAssignments({ assignments }) {
  const barColor = (percent) => {
    if (percent >= 60) return 'bg-green-500'
    if (percent >= 30) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Recent Assignments</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <div className="space-y-4">
        {assignments.map((a, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-800">{a.title}</p>
              <span className="text-xs text-gray-500">{a.submittedPercent}%</span>
            </div>
            <p className="text-xs text-gray-400 mb-1.5">{a.due}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor(a.submittedPercent)}`}
                style={{ width: `${a.submittedPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentAssignments