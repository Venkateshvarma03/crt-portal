import { ChevronLeft, ChevronRight } from 'lucide-react'

function AttendanceCalendar({ month = 'May 2025', daysInMonth = 31, startDay = 4, attendanceDays }) {
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const blanks = Array(startDay).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const getStatus = (day) => {
    if (attendanceDays.present.includes(day)) return 'present'
    if (attendanceDays.absent.includes(day)) return 'absent'
    if (attendanceDays.holiday.includes(day)) return 'holiday'
    return null
  }

  const statusStyles = {
    present: 'bg-green-100 text-green-700',
    absent: 'bg-red-100 text-red-700',
    holiday: 'bg-gray-100 text-gray-400',
  }

  return (
    <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Attendance Overview</h3>
        <span className="text-xs text-gray-400">This Month</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <ChevronLeft size={16} className="text-gray-400 cursor-pointer" />
        <span className="text-sm font-medium text-gray-700">{month}</span>
        <ChevronRight size={16} className="text-gray-400 cursor-pointer" />
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekLabels.map((d) => (
          <span key={d} className="text-[11px] text-gray-400 font-medium">{d}</span>
        ))}
        {blanks.map((_, i) => <span key={`b${i}`} />)}
        {days.map((day) => {
          const status = getStatus(day)
          return (
            <span
              key={day}
              className={`text-xs py-1.5 rounded-md font-medium ${status ? statusStyles[status] : 'text-gray-600'}`}
            >
              {day}
            </span>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Present</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Absent</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" /> Holiday</span>
      </div>
    </div>
  )
}

export default AttendanceCalendar