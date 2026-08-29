import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
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

function AdminSettings() {
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
        userRole: profile.designation || 'TPO',
      }}
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

export default AdminSettings