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

function TrainerReports() {
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

  if (loading) {
    return <Spinner />
  }

  const total = students.length
  const avg = function (key) {
    if (total === 0) return 0
    return Math.round(students.reduce(function (s, st) { return s + st[key] }, 0) / total)
  }
  const topPerformers = students.slice().sort(function (a, b) { return b.readiness - a.readiness }).slice(0, 5)
  const atRisk = students.filter(function (s) { return s.readiness < 40 })

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Reports', subText: 'Performance summary for your students.', userName: profile.name, userRole: 'Trainer' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Students</p>
          <p className="text-2xl font-extrabold mt-1">{total}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Attendance</p>
          <p className="text-2xl font-extrabold mt-1 text-green-600">{avg('attendance')}%</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Assignments</p>
          <p className="text-2xl font-extrabold mt-1 text-blue-600">{avg('assignments')}%</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">At Risk</p>
          <p className="text-2xl font-extrabold mt-1 text-red-500">{atRisk.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Top Performers</h3>
          {topPerformers.map(function (s, i) {
            return (
              <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{i + 1}. {s.name}</span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{s.readiness}</span>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">At Risk Students</h3>
          {atRisk.length === 0 ? (
            <p className="text-xs text-gray-400">No at-risk students</p>
          ) : (
            atRisk.map(function (s) {
              return (
                <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{s.name}</span>
                  <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{s.readiness}</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TrainerReports