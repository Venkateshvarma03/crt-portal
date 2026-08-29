import { ArrowUp, ArrowDown } from 'lucide-react'

function StatCard({ label, value, valueColor = 'text-gray-900', subLabel, badge, trend }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.text}
          </span>
        )}
      </div>
      <p className={`text-2xl font-extrabold mt-1 tracking-tight ${valueColor}`}>{value}</p>
      {subLabel && !trend && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
      {trend && (
        <p className={`text-xs mt-1 flex items-center gap-1 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-500'}`}>
          {trend.direction === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {trend.value}
        </p>
      )}
    </div>
  )
}

export default StatCard