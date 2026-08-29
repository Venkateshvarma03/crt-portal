function BatchPerformanceTable({ batches }) {
  const readinessColor = (score) => {
    if (score >= 60) return 'bg-green-100 text-green-700'
    if (score >= 35) return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }

  const percentColor = (value) => {
    const num = parseInt(value)
    if (num >= 70) return 'text-green-600'
    if (num >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Batch Performance</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="py-2 font-medium">Batch</th>
            <th className="py-2 font-medium">Students</th>
            <th className="py-2 font-medium">Attendance</th>
            <th className="py-2 font-medium">Assignments</th>
            <th className="py-2 font-medium">Coding Activity</th>
            <th className="py-2 font-medium">Readiness</th>
            <th className="py-2 font-medium">At Risk</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 font-medium text-gray-800">{b.batch}</td>
              <td className="py-2.5 text-gray-600">{b.students}</td>
              <td className={`py-2.5 font-medium ${percentColor(b.attendance)}`}>{b.attendance}</td>
              <td className={`py-2.5 font-medium ${percentColor(b.assignments)}`}>{b.assignments}</td>
              <td className={`py-2.5 font-medium ${percentColor(b.coding)}`}>{b.coding}</td>
              <td className="py-2.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${readinessColor(b.readiness)}`}>
                  {b.readiness}
                </span>
              </td>
              <td className="py-2.5 text-red-500 font-medium">{b.atRisk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BatchPerformanceTable