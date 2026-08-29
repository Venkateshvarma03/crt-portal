import { Bell } from 'lucide-react'

function RecentNotifications({ notifications }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Recent Notifications</h3>
        <span className="text-xs text-blue-500 font-medium cursor-pointer">View All</span>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Bell size={13} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-700">{n.title}</p>
              <p className="text-xs text-gray-400">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentNotifications