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

function AdminNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/notifications/me').then(function (res) {
      setNotifications(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Notifications', subText: 'Your recent notifications.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-400">No notifications yet.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map(function (n) {
              return (
                <div key={n._id} className="border-b border-gray-50 pb-2 last:border-0">
                  <p className="text-sm text-gray-700">{n.title}</p>
                  <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminNotifications