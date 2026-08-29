import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, FileCheck, BarChart3, Bell, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/trainer', icon: LayoutDashboard },
  { label: 'My Batches', path: '/trainer/batches', icon: Users },
  { label: 'Attendance', path: '/trainer/attendance', icon: CalendarCheck },
  { label: 'Assignments', path: '/trainer/assignments', icon: ClipboardList },
  { label: 'Submissions', path: '/trainer/assignments', icon: FileCheck },
  { label: 'Students', path: '/trainer/students', icon: Users },
  { label: 'Reports', path: '/trainer/reports', icon: BarChart3 },
  { label: 'Notifications', path: '/trainer/notifications', icon: Bell },
  { label: 'Settings', path: '/trainer/settings', icon: Settings },
]

function TrainerSettings() {
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = function () {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: 'Settings',
        subText: 'Manage your account.',
        userName: profile.name,
        userRole: 'Trainer',
      }}
    >
      <div className="max-w-md bg-white rounded-xl border border-[#f1f5f9] p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Account</h3>
        <p className="text-sm text-gray-600 mb-1">{profile.name}</p>
        <p className="text-xs text-gray-400 mb-1">{profile.email}</p>
        <p className="text-xs text-gray-400 mb-6">{profile.specialization}</p>
        <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 text-sm font-medium py-2.5 rounded-lg hover:bg-red-100">
          Logout
        </button>
      </div>
    </DashboardLayout>
  )
}

export default TrainerSettings