import { FileText } from 'lucide-react'

function SubmissionsToGrade({ submissions }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Submissions to Grade</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <div className="space-y-3">
        {submissions.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
              <FileText size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-400">{s.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubmissionsToGrade