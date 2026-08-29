import { BookOpen } from 'lucide-react'

function UpcomingClasses({ classes }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Upcoming Classes</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <div className="space-y-3">
        {classes.map((cls, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{cls.subject}</p>
              <p className="text-xs text-gray-400">{cls.time}</p>
              <p className="text-xs text-gray-400">{cls.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingClasses