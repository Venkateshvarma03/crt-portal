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

function MyProfile() {
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

  const fields = [
    { label: 'Full Name', value: profile.name },
    { label: 'Roll Number', value: profile.rollNumber },
    { label: 'College Email', value: profile.email },
    { label: 'Branch', value: profile.branch },
    { label: 'Section', value: profile.section },
    { label: 'Year', value: profile.year },
    { label: 'Member Since', value: new Date(profile.createdAt).toLocaleDateString() },
  ]

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'My Profile', subText: 'Your personal and academic details.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="max-w-2xl bg-white rounded-xl border border-[#f1f5f9] p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(function (f) {
            return (
              <div key={f.label}>
                <p className="text-xs text-gray-400">{f.label}</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{f.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MyProfile