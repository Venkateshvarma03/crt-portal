import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { LayoutDashboard, Layers, Users, GraduationCap, CalendarCheck, ClipboardList, Code2, BarChart3, PieChart, Bell, Settings } from 'lucide-react'

const navItems = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Batches', path: '/admin/batches', icon: Layers },
  { label: 'Students', path: '/admin/students', icon: GraduationCap },
  { label: 'Trainers', path: '/admin/trainers', icon: Users },
  { label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
  { label: 'Assignments', path: '/admin/assignments', icon: ClipboardList },
  { label: 'Coding Profiles', path: '/admin/coding', icon: Code2 },
  { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  { label: 'Analytics', path: '/admin/analytics', icon: PieChart },
  { label: 'Notifications', path: '/admin/notifications', icon: Bell },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]

function AdminReports() {
  const [overview, setOverview] = useState(null)
  const [atRisk, setAtRisk] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    Promise.all([
      api.get('/admin/overview'),
      api.get('/admin/at-risk'),
    ]).then(function (results) {
      setOverview(results[0].data)
      setAtRisk(results[1].data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading || !overview) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Reports', subText: 'Overall CRT training performance report.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Students</p>
          <p className="text-2xl font-extrabold mt-1">{overview.totalStudents}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Attendance</p>
          <p className="text-2xl font-extrabold mt-1 text-green-600">{overview.avgAttendance}%</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Assignment</p>
          <p className="text-2xl font-extrabold mt-1 text-blue-600">{overview.avgAssignments}%</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Coding</p>
          <p className="text-2xl font-extrabold mt-1 text-purple-600">{overview.avgCodingActivity}%</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">At Risk</p>
          <p className="text-2xl font-extrabold mt-1 text-red-500">{overview.atRiskCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Students Needing Attention</h3>
        {atRisk.length === 0 ? (
          <p className="text-xs text-gray-400">No at-risk students</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Roll No.</th>
                <th className="py-2 font-medium">Readiness</th>
                <th className="py-2 font-medium">Attendance</th>
                <th className="py-2 font-medium">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {atRisk.map(function (s) {
                return (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{s.name}</td>
                    <td className="py-2.5 text-gray-500">{s.rollNumber}</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">{s.readiness}</span></td>
                    <td className="py-2.5 text-red-500 font-medium">{s.attendance}%</td>
                    <td className="py-2.5 text-gray-400 text-xs">{new Date(s.updatedAt).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminReports