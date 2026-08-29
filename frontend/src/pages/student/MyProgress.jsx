import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import ProgressTrendChart from '../../components/ui/ProgressTrendChart'
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

function MyProgress() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    api.get('/students/me').then(function (res) {
      setProfile(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading || !profile) {
    return <Spinner />
  }

  const metrics = [
    { label: 'Attendance', value: profile.attendance, color: 'bg-green-500' },
    { label: 'Assignments', value: profile.assignments, color: 'bg-blue-500' },
    { label: 'Coding Activity', value: profile.codingActivity, color: 'bg-purple-500' },
    { label: 'Overall Readiness', value: profile.readiness, color: 'bg-orange-500' },
  ]

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'My Progress', subText: 'Track your improvement over time.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Current Standing</h3>
        <div className="space-y-4">
          {metrics.map(function (metric) {
            return (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {metric.value}{metric.label !== 'Overall Readiness' ? '%' : '/100'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={'h-full rounded-full ' + metric.color} style={{ width: metric.value + '%' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProgressTrendChart data={[]} />
      <p className="text-xs text-gray-400 mt-2">Historical trend data will appear here as more records are collected over time.</p>
    </DashboardLayout>
  )
}

export default MyProgress