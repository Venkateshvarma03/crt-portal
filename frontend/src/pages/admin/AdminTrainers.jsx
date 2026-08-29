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

function AdminTrainers() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/trainers').then(function (res) {
      setTrainers(res.data)
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
      topbarProps={{ welcomeText: 'All Trainers', subText: 'Trainers registered on the CRT Portal.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Trainers ({trainers.length})</h3>
        {trainers.length === 0 ? (
          <p className="text-sm text-gray-400">No trainers found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Email</th>
                <th className="py-2 font-medium">Specialization</th>
                <th className="py-2 font-medium">Batches</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map(function (t) {
                const batchList = t.batches && t.batches.length > 0 ? t.batches.join(', ') : '—'
                return (
                  <tr key={t._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{t.name}</td>
                    <td className="py-2.5 text-gray-500">{t.email}</td>
                    <td className="py-2.5 text-gray-500">{t.specialization || '—'}</td>
                    <td className="py-2.5 text-gray-500">{batchList}</td>
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

export default AdminTrainers