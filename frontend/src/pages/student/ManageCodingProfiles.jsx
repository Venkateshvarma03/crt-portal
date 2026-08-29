import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
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

function ManageCodingProfiles() {
  const [profiles, setProfiles] = useState([])
  const [form, setForm] = useState({ platform: '', username: '', stat: '', extra: '' })
  const [message, setMessage] = useState('')
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchProfiles = function () {
    api.get('/students/coding-profiles').then(function (res) { setProfiles(res.data) })
  }

  useEffect(function () { fetchProfiles() }, [])

  const handleChange = function (e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  const handleSubmit = function (e) {
    e.preventDefault()
    setMessage('')
    api.post('/students/coding-profiles', form).then(function () {
      setMessage('Profile saved!')
      setForm({ platform: '', username: '', stat: '', extra: '' })
      fetchProfiles()
    }).catch(function (error) {
      setMessage(error.response && error.response.data ? error.response.data.message : 'Failed to save')
    })
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Coding Profiles', subText: 'Add or update your coding platform stats.', userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Add / Update Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="platform" value={form.platform} onChange={handleChange} required placeholder="Platform (e.g. LeetCode)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input name="username" value={form.username} onChange={handleChange} required placeholder="Username" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input name="stat" value={form.stat} onChange={handleChange} placeholder="Stat (e.g. Solved 152)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input name="extra" value={form.extra} onChange={handleChange} placeholder="Extra (e.g. Rating 1580)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            {message && <p className="text-xs text-green-600">{message}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700">Save Profile</button>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">My Profiles</h3>
          {profiles.length === 0 ? (
            <p className="text-sm text-gray-400">No profiles added yet.</p>
          ) : (
            <div className="space-y-3">
              {profiles.map(function (p) {
                return (
                  <div key={p._id} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.platform}</p>
                      <p className="text-xs text-gray-400">{p.username}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{p.stat}</p>
                      <p>{p.extra}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageCodingProfiles