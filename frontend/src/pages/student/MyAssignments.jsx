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

function MyAssignments() {
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [fileUrl, setFileUrl] = useState('')
  const [submittingId, setSubmittingId] = useState(null)
  const [message, setMessage] = useState('')
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  const batch = profile.branch + ' ' + profile.section + ' - ' + profile.year

  const fetchData = function () {
    setLoading(true)
    Promise.all([
      api.get('/assignments', { params: { batch: batch } }),
      api.get('/assignments/submissions/me'),
    ]).then(function (results) {
      setAssignments(results[0].data)
      setSubmissions(results[1].data)
    }).finally(function () {
      setLoading(false)
    })
  }

  useEffect(function () { fetchData() }, [])

  const getSubmission = function (assignmentId) {
    return submissions.find(function (s) {
      return (s.assignment && s.assignment._id === assignmentId) || s.assignment === assignmentId
    })
  }

  const handleSubmit = function (assignmentId) {
    setMessage('')
    api.post('/assignments/' + assignmentId + '/submit', { fileUrl: fileUrl }).then(function () {
      setMessage('Submitted successfully!')
      setSubmittingId(null)
      setFileUrl('')
      fetchData()
    }).catch(function (error) {
      setMessage(error.response && error.response.data ? error.response.data.message : 'Submission failed')
    })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'My Assignments', subText: 'Assignments for ' + batch, userName: profile.name, userRole: profile.rollNumber }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">All Assignments</h3>
        {message && <p className="text-xs text-green-600 mb-3">{message}</p>}
        {assignments.length === 0 ? (
          <p className="text-sm text-gray-400">No assignments for your batch yet.</p>
        ) : (
          <div className="space-y-3">
            {assignments.map(function (a) {
              const submission = getSubmission(a._id)
              return (
                <div key={a._id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{a.title}</p>
                      <p className="text-xs text-gray-400">{a.description}</p>
                      <p className="text-xs text-gray-400">Due: {new Date(a.dueDate).toLocaleDateString()}</p>
                    </div>
                    {submission ? (
                      <span className={'text-xs px-2 py-1 rounded-full font-medium ' + (submission.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700')}>
                        {submission.status === 'graded' ? 'Graded: ' + submission.grade : 'Submitted'}
                      </span>
                    ) : submittingId === a._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fileUrl}
                          onChange={function (e) { setFileUrl(e.target.value) }}
                          placeholder="File URL"
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs w-40"
                        />
                        <button onClick={function () { handleSubmit(a._id) }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg">Submit</button>
                      </div>
                    ) : (
                      <button onClick={function () { setSubmittingId(a._id) }} className="text-xs text-blue-600 font-medium">Submit Now</button>
                    )}
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

export default MyAssignments