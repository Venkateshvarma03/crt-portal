function StudentsAtRiskTable({ students }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Students At Risk</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
            <th className="py-2 font-medium">Student</th>
            <th className="py-2 font-medium">Readiness</th>
            <th className="py-2 font-medium">Attendance</th>
            <th className="py-2 font-medium">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5">
                <p className="font-medium text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-400">{s.id}</p>
              </td>
              <td className="py-2.5">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  {s.readiness}
                </span>
              </td>
              <td className="py-2.5 text-red-500 font-medium">{s.attendance}</td>
              <td className="py-2.5 text-gray-400 text-xs">{s.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentsAtRiskTable