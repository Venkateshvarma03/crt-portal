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

function Leaderboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/students/leaderboard').then(function (res) {
      setStudents(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const medalColor = function (rank) {
    if (rank === 0) return 'bg-yellow-100 text-yellow-700'
    if (rank === 1) return 'bg-gray-100 text-gray-600'
    if (rank === 2) return 'bg-orange-100 text-orange-700'
    return 'bg-gray-50 text-gray-500'
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Leaderboard', subText: 'See how you rank in your batch.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Batch Rankings (by Readiness)</h3>
        {students.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet.</p>
        ) : (
          <div className="space-y-2">
            {students.map(function (s, i) {
              return (
                <div
                  key={s._id}
                  className={'flex items-center justify-between p-3 rounded-lg ' + (s.rollNumber === profile.rollNumber ? 'bg-blue-50 border border-blue-200' : 'border border-gray-50')}
                >
                  <div className="flex items-center gap-3">
                    <span className={'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ' + medalColor(i)}>{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.name}{s.rollNumber === profile.rollNumber ? ' (You)' : ''}</p>
                      <p className="text-xs text-gray-400">{s.rollNumber}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{s.readiness}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Leaderboard