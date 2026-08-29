import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function ReadinessDistributionDonut({ present, good, average, atRisk, behind, total }) {
  const data = [
    { name: 'Present (≥80)', value: present, color: '#22c55e' },
    { name: 'Good (60-80)', value: good, color: '#3b82f6' },
    { name: 'Average (40-60)', value: average, color: '#f59e0b' },
    { name: 'At Risk (20-40)', value: atRisk, color: '#ef4444' },
    { name: 'Behind (<20)', value: behind, color: '#94a3b8' },
  ]

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Readiness Score Distribution</h3>

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
            <span className="text-lg font-extrabold text-gray-900">{total}</span>
            <span className="text-[10px] text-gray-400">Students</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-gray-600">{d.name}</span>
              <span className="text-gray-400">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReadinessDistributionDonut