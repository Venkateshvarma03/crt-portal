import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function TrendOverTimeChart({ data }) {
  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Trend Over Time</h3>
        <span className="text-xs text-gray-400">Last 5 Weeks</span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="attendance" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Attendance" />
          <Line type="monotone" dataKey="assignments" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Assignments" />
          <Line type="monotone" dataKey="coding" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} name="Coding Activity" />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Attendance</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Assignments</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Coding Activity</span>
      </div>
    </div>
  )
}

export default TrendOverTimeChart