function AssignmentsList({ assignments }) {
  const statusStyles = {
    Submitted: 'bg-green-100 text-green-700',
    'In Progress': 'bg-orange-100 text-orange-700',
    Pending: 'bg-gray-100 text-gray-500',
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Assignments</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <div className="space-y-3">
        {assignments.map((a, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">{a.title}</p>
              <p className="text-xs text-gray-400">{a.due}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[a.status]}`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssignmentsList