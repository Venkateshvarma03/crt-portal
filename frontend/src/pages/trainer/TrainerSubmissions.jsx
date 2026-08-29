import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
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

function TrainerSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [gradingId, setGradingId] = useState(null)
  const [gradeInput, setGradeInput] = useState('')
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchSubmissions = function () {
    setLoading(true)
    api.get('/assignments/submissions/trainer').then(function (res) {
      setSubmissions(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }

  useEffect(function () { fetchSubmissions() }, [])

  const handleGrade = function (submissionId) {
    if (!gradeInput || isNaN(gradeInput)) return
    api.put('/assignments/submissions/' + submissionId + '/grade', { grade: Number(gradeInput) }).then(function () {
      setGradingId(null)
      setGradeInput('')
      fetchSubmissions()
    })
  }

  const statusStyles = {
    submitted: 'bg-orange-100 text-orange-700',
    graded: 'bg-green-100 text-green-700',
    pending: 'bg-gray-100 text-gray-500',
  }

  if (loading) {
    return <Spinner />
  }

  const pending = submissions.filter(function (s) { return s.status !== 'graded' })
  const graded = submissions.filter(function (s) { return s.status === 'graded' })

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Submissions', subText: 'Review and grade student submissions.', userName: profile.name, userRole: 'Trainer' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Submissions</p>
          <p className="text-2xl font-extrabold mt-1">{submissions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Pending Grading</p>
          <p className="text-2xl font-extrabold mt-1 text-orange-500">{pending.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <p className="text-xs text-gray-500">Graded</p>
          <p className="text-2xl font-extrabold mt-1 text-green-600">{graded.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">All Submissions</h3>
        {submissions.length === 0 ? (
          <p className="text-sm text-gray-400">No submissions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Assignment</th>
                <th className="py-2 font-medium">Student</th>
                <th className="py-2 font-medium">Submitted</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Grade</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(function (s) {
                return (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{s.assignment ? s.assignment.title : ''}</td>
                    <td className="py-2.5 text-gray-600">{s.student ? s.student.name : ''} <span className="text-gray-400">({s.student ? s.student.rollNumber : ''})</span></td>
                    <td className="py-2.5 text-gray-500">{new Date(s.submittedAt).toLocaleDateString()}</td>
                    <td className="py-2.5"><span className={'px-2 py-0.5 rounded-full text-xs font-medium ' + statusStyles[s.status]}>{s.status}</span></td>
                    <td className="py-2.5 text-gray-600">{s.grade !== undefined && s.grade !== null ? s.grade : '—'}</td>
                    <td className="py-2.5">
                      {gradingId === s._id ? (
                        <div className="flex items-center gap-2">
                          <input type="number" min="0" max="100" value={gradeInput} onChange={function (e) { setGradeInput(e.target.value) }} className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-xs" placeholder="0-100" />
                          <button onClick={function () { handleGrade(s._id) }} className="text-xs text-white bg-blue-600 px-2 py-1 rounded-lg">Save</button>
                          <button onClick={function () { setGradingId(null); setGradeInput('') }} className="text-xs text-gray-500">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={function () { setGradingId(s._id); setGradeInput(s.grade || '') }} className="text-xs text-blue-600 font-medium">
                          {s.status === 'graded' ? 'Edit Grade' : 'Grade'}
                        </button>
                      )}
                    </td>
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

export default TrainerSubmissions