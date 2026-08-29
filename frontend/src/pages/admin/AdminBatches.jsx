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

function AdminBatches() {
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
      topbarProps={{ welcomeText: 'All Batches', subText: 'Performance breakdown by batch.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      {batches.length === 0 ? (
        <p className="text-sm text-gray-400">No batches found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {batches.map(function (b) {
            return (
              <div key={b.batch} className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">{b.batch}</h3>
                  <span className={'px-2 py-0.5 rounded-full text-xs font-medium ' + readinessColor(b.readiness)}>{b.readiness}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
                  <p>Students: <span className="font-semibold text-gray-800">{b.students}</span></p>
                  <p>Attendance: <span className="font-semibold text-gray-800">{b.attendance}%</span></p>
                  <p>Assignments: <span className="font-semibold text-gray-800">{b.assignments}%</span></p>
                  <p>Coding: <span className="font-semibold text-gray-800">{b.codingActivity}%</span></p>
                  <p>At Risk: <span className="font-semibold text-red-500">{b.atRisk}</span></p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}

export default AdminBatches