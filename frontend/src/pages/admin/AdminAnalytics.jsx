import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
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

function AdminAnalytics() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/admin/batch-performance').then(function (res) {
      setBatches(res.data)
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
      topbarProps={{ welcomeText: 'Analytics', subText: 'Batch comparison charts.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Batch Comparison</h3>
        {batches.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={batches}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#22c55e" name="Attendance %" />
              <Bar dataKey="assignments" fill="#3b82f6" name="Assignments %" />
              <Bar dataKey="codingActivity" fill="#a855f7" name="Coding %" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminAnalytics