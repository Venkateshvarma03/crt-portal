import { useEffect, useState } from 'react'
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

function MarkAttendance() {
  const [students, setStudents] = useState([])
  const [batch, setBatch] = useState('')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [statusMap, setStatusMap] = useState({}) // { studentId: 'present' | 'absent' | 'late' }
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchStudents = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await api.get('/students/batch', { params: batch ? { branch: batch.split(' ')[0] } : {} })
      setStudents(res.data)
      const initialStatus = {}
      res.data.forEach((s) => { initialStatus[s._id] = 'present' })
      setStatusMap(initialStatus)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setStatus = (studentId, status) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }))
  }

  const handleSubmit = async () => {
    if (!subject || !batch) {
      setMessage('Please enter subject and batch before submitting.')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      const records = students.map((s) => ({ studentId: s._id, status: statusMap[s._id] || 'present' }))
      await api.post('/attendance/mark', { batch, subject, date, records })
      setMessage('Attendance marked successfully!')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to mark attendance')
    } finally {
      setSaving(false)
    }
  }

  const statusColors = {
    present: 'bg-green-100 text-green-700 border-green-300',
    absent: 'bg-red-100 text-red-700 border-red-300',
    late: 'bg-orange-100 text-orange-700 border-orange-300',
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: `Welcome, ${profile.name || 'Trainer'}`,
        subText: 'Mark attendance for your class.',
        userName: profile.name,
        userRole: 'Trainer',
      }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                 <div>
            <label className="text-xs font-medium text-gray-600">Batch</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              onBlur={fetchStudents}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="e.g. CSE A - 2026"
            />
            <div className="flex gap-2 mt-2">
              {['CSE', 'AI&ML/IT', 'EEE/ECE'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBatch(b + ' ')}
                  className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="e.g. DSA - Graphs"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Students</h3>
          <button
            onClick={fetchStudents}
            className="text-xs text-blue-600 font-medium"
          >
            Refresh List
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-sm text-gray-400">No students found. Try entering a branch in Batch (e.g. "CSE").</p>
        ) : (
          <div className="space-y-2">
            {students.map((s) => (
              <div key={s._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.rollNumber}</p>
                </div>
                <div className="flex gap-2">
                  {['present', 'absent', 'late'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatus(s._id, status)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium capitalize ${
                        statusMap[s._id] === status ? statusColors[status] : 'border-gray-200 text-gray-500'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {message && (
          <p className={`text-xs mt-3 ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {students.length > 0 && (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 mt-4 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Submit Attendance'}
          </button>
        )}
      </div>
    </DashboardLayout>
  )
}

export default MarkAttendance