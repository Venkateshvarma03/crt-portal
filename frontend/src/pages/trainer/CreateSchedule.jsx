import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import api from '../../api/axios'
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, FileCheck, BarChart3, Bell, Settings } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/trainer', icon: LayoutDashboard },
  { label: 'My Batches', path: '/trainer/batches', icon: Users },
  { label: 'Attendance', path: '/trainer/attendance', icon: CalendarCheck },
  { label: 'Assignments', path: '/trainer/assignments', icon: ClipboardList },
  { label: 'Submissions', path: '/trainer/submissions', icon: FileCheck },
  { label: 'Students', path: '/trainer/students', icon: Users },
  { label: 'Reports', path: '/trainer/reports', icon: BarChart3 },
  { label: 'Notifications', path: '/trainer/notifications', icon: Bell },
  { label: 'Settings', path: '/trainer/settings', icon: Settings },
]

function CreateSchedule() {
  const [form, setForm] = useState({
    batch: '',
    subject: '',
    date: new Date().toISOString().slice(0, 10),
    startTime: '',
    endTime: '',
    room: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/schedule', form)
      setSuccess('Class scheduled successfully!')
      setForm({ batch: '', subject: '', date: new Date().toISOString().slice(0, 10), startTime: '', endTime: '', room: '' })
      setTimeout(() => navigate('/trainer'), 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to schedule class')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: `Welcome, ${profile.name || 'Trainer'}`,
        subText: 'Schedule a new class for your batch.',
        userName: profile.name,
        userRole: 'Trainer',
      }}
    >
      <div className="max-w-xl">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Schedule a Class</h2>
          <p className="text-sm text-gray-500 mb-6">This will appear on your Today's Classes and the students' Upcoming Classes.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Batch</label>
              <input
                type="text"
                name="batch"
                value={form.batch}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="e.g. CSE A - 2026"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="e.g. DSA - Graphs"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Start Time</label>
                <input
                  type="text"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="e.g. 10:00 AM"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">End Time</label>
                <input
                  type="text"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                  placeholder="e.g. 11:30 AM"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Room</label>
              <input
                type="text"
                name="room"
                value={form.room}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="e.g. Room 302"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Scheduling...' : 'Schedule Class'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateSchedule