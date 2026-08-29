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

function AdminCodingProfiles() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/students').then(function (res) {
      setStudents(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Spinner />
  }

  const withProfiles = students.filter(function (s) { return s.codingProfiles && s.codingProfiles.length > 0 })

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Coding Profiles', subText: 'Students with linked coding platform profiles.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Students with Coding Profiles ({withProfiles.length})</h3>
        {withProfiles.length === 0 ? (
          <p className="text-sm text-gray-400">No students have added coding profiles yet.</p>
        ) : (
          <div className="space-y-4">
            {withProfiles.map(function (s) {
              return (
                <div key={s._id} className="border-b border-gray-50 pb-3 last:border-0">
                  <p className="text-sm font-medium text-gray-800 mb-2">{s.name} <span className="text-gray-400 text-xs">({s.rollNumber})</span></p>
                  <div className="flex flex-wrap gap-3">
                    {s.codingProfiles.map(function (p, i) {
                      return (
                        <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-xs">
                          <span className="font-medium text-gray-700">{p.platform}</span>
                          <span className="text-gray-400"> — {p.stat}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminCodingProfiles