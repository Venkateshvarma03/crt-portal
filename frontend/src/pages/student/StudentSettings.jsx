import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
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

function StudentSettings() {
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Settings', subText: 'Manage your account.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="max-w-md bg-white rounded-xl border border-[#f1f5f9] p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Account</h3>
        <p className="text-sm text-gray-600 mb-1">{profile.name}</p>
        <p className="text-xs text-gray-400 mb-6">{profile.email}</p>
        <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 text-sm font-medium py-2.5 rounded-lg hover:bg-red-100">
          Logout
        </button>
      </div>
    </DashboardLayout>
  )
}

export default StudentSettings