import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { LayoutDashboard, User, CalendarCheck, ClipboardList, Code2, TrendingUp, Trophy, Bell, BookMarked, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
  { label: 'My Profile', path: '/student/profile', icon: User },
  { label: 'Attendance', path: '/student/attendance', icon: CalendarCheck },
  { label: 'Assignments', path: '/student/assignments', icon: ClipboardList },
  { label: 'Coding Profiles', path: '/student/coding', icon: Code2 },
  { label: 'My Progress', path: '/student/progress', icon: TrendingUp },
  { label: 'Leaderboard', path: '/student/leaderboard', icon: Trophy },
  { label: 'Notifications', path: '/student/notifications', icon: Bell },
  { label: 'Resources', path: '/student/resources', icon: BookMarked },
  { label: 'Settings', path: '/student/settings', icon: Settings },
]

function MyAttendance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/attendance/me').then(function (res) {
      setRecords(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const statusStyles = {
    present: 'bg-green-100 text-green-700',
    absent: 'bg-red-100 text-red-700',
    late: 'bg-orange-100 text-orange-700',
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'My Attendance', subText: 'Full attendance history.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Attendance History ({records.length} records)</h3>
        {records.length === 0 ? (
          <p className="text-sm text-gray-400">No attendance records yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Batch</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(function (r) {
                return (
                  <tr key={r._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 text-gray-600">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="py-2.5 font-medium text-gray-800">{r.subject}</td>
                    <td className="py-2.5 text-gray-500">{r.batch}</td>
                    <td className="py-2.5">
                      <span className={'px-2 py-0.5 rounded-full text-xs font-medium capitalize ' + statusStyles[r.status]}>{r.status}</span>
                    </td>
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

export default MyAttendance