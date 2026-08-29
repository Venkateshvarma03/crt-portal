function BatchProgressTable({ students }) {
  const readinessColor = (score) => {
    if (score >= 60) return 'bg-green-100 text-green-700'
    if (score >= 35) return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }

  // Helper: converts "92%" -> 92, then returns a text color class
  const percentColor = (value) => {
    const num = parseInt(value)
    if (num >= 70) return 'text-green-600'
    if (num >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Batch Progress</h3>
          <p className="text-xs text-gray-400">Student Progress Summary</p>
        </div>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View Report</span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="py-2 font-medium">#</th>
            <th className="py-2 font-medium">Top Students</th>
            <th className="py-2 font-medium">Attendance</th>
            <th className="py-2 font-medium">Assignments</th>
            <th className="py-2 font-medium">Coding Activity</th>
            <th className="py-2 font-medium">Readiness</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 text-gray-400">{s.rank}</td>
              <td className="py-2.5 font-medium text-gray-800">{s.name}</td>
              <td className={`py-2.5 font-medium ${percentColor(s.attendance)}`}>{s.attendance}</td>
              <td className={`py-2.5 font-medium ${percentColor(s.assignments)}`}>{s.assignments}</td>
              <td className={`py-2.5 font-medium ${percentColor(s.coding)}`}>{s.coding}</td>
              <td className="py-2.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${readinessColor(s.readiness)}`}>
                  {s.readiness}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BatchProgressTable