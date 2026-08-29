import { Download, Send, RefreshCw, FileBarChart } from 'lucide-react'

const iconMap = [Download, Send, RefreshCw, FileBarChart]

function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h3>

      <div className="space-y-2">
        {actions.map((action, i) => {
          const Icon = iconMap[i % iconMap.length]
          return (
            <button
              key={i}
              className="w-full flex items-center gap-3 text-left text-sm text-gray-700 px-3 py-2.5 rounded-lg border border-gray-100 hover:bg-gray-50"
            >
              <Icon size={16} className="text-blue-500" />
              {action}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions