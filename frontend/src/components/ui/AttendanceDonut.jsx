import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function AttendanceDonut({ present, absent, late, average }) {
  const data = [
    { name: 'Present', value: present, color: '#22c55e' },
    { name: 'Absent', value: absent, color: '#ef4444' },
    { name: 'Late', value: late, color: '#f97316' },
  ]
  const total = present + absent + late

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Attendance Overview</h3>
        <span className="text-xs text-gray-400">This Week</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-extrabold text-gray-900">{average}%</span>
            <span className="text-[10px] text-gray-400">Average</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-gray-600">{d.name}</span>
              <span className="text-gray-400">
                {d.value} ({((d.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AttendanceDonut