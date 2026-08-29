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

function CreateAssignment() {
  const [form, setForm] = useState({ title: '', description: '', batch: '', dueDate: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/assignments', form)
      setSuccess('Assignment created successfully!')
      setForm({ title: '', description: '', batch: '', dueDate: '' })
      setTimeout(() => navigate('/trainer/assignments'), 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create assignment')
    } finally {
      setLoading(false)
    }
  }

  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: `Welcome, ${profile.name || 'Trainer'}`,
        subText: 'Create a new assignment for your batch.',
        userName: profile.name,
        userRole: 'Trainer',
      }}
    >
      <div className="max-w-xl">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Create Assignment</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in the details below to assign work to a batch.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="e.g. Graph Algorithms Problem Set"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="e.g. Solve 5 graph problems covering BFS and DFS"
              />
            </div>

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
              <label className="text-xs font-medium text-gray-600">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Assignment'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateAssignment