import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, FileCheck, BarChart3, Bell, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/trainer', icon: LayoutDashboard },
  { label: 'My Batches', path: '/trainer/batches', icon: Users },
  { label: 'Attendance', path: '/trainer/attendance', icon: CalendarCheck },
  { label: 'Assignments', path: '/trainer/assignments', icon: ClipboardList },
  { label: 'Submissions', path: '/trainer/submissions', icon: FileCheck },
  { label: 'Students', path: '/trainer/students', icon: Users },
  { label: 'Reports', path: '/trainer/reports', icon: BarChart3 },
  { label: 'Notifications', path: '/trainer/notifications', icon: Bell },
  { label: 'Settings', path: '/trainer/settings', icon: Settings },
]

function MyBatches() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/students/batch').then(function (res) {
      setStudents(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const percentColor = function (value) {
    if (value >= 70) return 'text-green-600'
    if (value >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  if (loading) {
    return <Spinner />
  }

  const batches = {}
  students.forEach(function (s) {
    const key = s.branch + ' ' + s.section + ' - ' + s.year
    if (!batches[key]) batches[key] = []
    batches[key].push(s)
  })
  const batchKeys = Object.keys(batches)

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'My Batches', subText: 'Overview of batches you handle.', userName: profile.name, userRole: 'Trainer' }}
    >
      {batchKeys.length === 0 ? (
        <p className="text-sm text-gray-400">No batches found.</p>
      ) : (
        <div className="space-y-4">
          {batchKeys.map(function (batchName) {
            const list = batches[batchName]
            const avgAttendance = Math.round(list.reduce(function (sum, s) { return sum + s.attendance }, 0) / list.length)
            const avgAssignments = Math.round(list.reduce(function (sum, s) { return sum + s.assignments }, 0) / list.length)
            return (
              <div key={batchName} className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">{batchName}</h3>
                  <span className="text-xs text-gray-400">{list.length} students</span>
                </div>
                <div className="flex gap-6 mb-3 text-xs">
                  <span>Avg. Attendance: <span className={'font-semibold ' + percentColor(avgAttendance)}>{avgAttendance}%</span></span>
                  <span>Avg. Assignments: <span className={'font-semibold ' + percentColor(avgAssignments)}>{avgAssignments}%</span></span>
                </div>
                <div className="space-y-1">
                  {list.map(function (s) {
                    return (
                      <div key={s._id} className="flex items-center justify-between text-sm py-1 border-t border-gray-50">
                        <span className="text-gray-700">{s.name} <span className="text-gray-400 text-xs">({s.rollNumber})</span></span>
                        <span className="text-xs text-gray-400">Readiness: {s.readiness}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}

export default MyBatches