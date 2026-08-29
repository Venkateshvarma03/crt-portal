import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, FileCheck, BarChart3, Bell, Settings, Search } from 'lucide-react'

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

function TrainerStudents() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/students/batch').then(function (res) {
      setStudents(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const filtered = students.filter(function (s) {
    const query = search.toLowerCase()
    return s.name.toLowerCase().indexOf(query) !== -1 || s.rollNumber.toLowerCase().indexOf(query) !== -1
  })

  const percentColor = function (value) {
    if (value >= 70) return 'text-green-600'
    if (value >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const readinessColor = function (score) {
    if (score >= 60) return 'bg-green-100 text-green-700'
    if (score >= 35) return 'bg-orange-100 text-orange-700'
    return 'bg-red-100 text-red-700'
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Welcome, ' + (profile.name || 'Trainer'), subText: 'View all students and their progress.', userName: profile.name, userRole: 'Trainer' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">All Students ({students.length})</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={function (e) { setSearch(e.target.value) }} placeholder="Search by name or roll number" className="border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-xs w-64" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400">No students found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Roll No.</th>
                <th className="py-2 font-medium">Branch</th>
                <th className="py-2 font-medium">Attendance</th>
                <th className="py-2 font-medium">Assignments</th>
                <th className="py-2 font-medium">Coding</th>
                <th className="py-2 font-medium">Readiness</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function (s) {
                return (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{s.name}</td>
                    <td className="py-2.5 text-gray-500">{s.rollNumber}</td>
                    <td className="py-2.5 text-gray-500">{s.branch} {s.section} - {s.year}</td>
                    <td className={'py-2.5 font-medium ' + percentColor(s.attendance)}>{s.attendance}%</td>
                    <td className={'py-2.5 font-medium ' + percentColor(s.assignments)}>{s.assignments}%</td>
                    <td className={'py-2.5 font-medium ' + percentColor(s.codingActivity)}>{s.codingActivity}%</td>
                    <td className="py-2.5"><span className={'px-2 py-0.5 rounded-full text-xs font-medium ' + readinessColor(s.readiness)}>{s.readiness}</span></td>
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

export default TrainerStudents