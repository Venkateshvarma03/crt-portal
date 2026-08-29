import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import { LayoutDashboard, Users, CalendarCheck, ClipboardList, FileCheck, BarChart3, Bell, Settings, Plus } from 'lucide-react'

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

function TrainerAssignments() {
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    Promise.all([
      api.get('/assignments'),
      api.get('/assignments/submissions/trainer'),
    ]).then(function (results) {
      setAssignments(results[0].data)
      setSubmissions(results[1].data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const submissionCount = function (assignmentId) {
    return submissions.filter(function (s) { return s.assignment && s.assignment._id === assignmentId }).length
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Assignments', subText: 'All assignments you have created.', userName: profile.name, userRole: 'Trainer' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">My Assignments</h2>
        <Link to="/trainer/assignments/new" className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={16} /> New Assignment
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        {assignments.length === 0 ? (
          <p className="text-sm text-gray-400">No assignments created yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Title</th>
                <th className="py-2 font-medium">Batch</th>
                <th className="py-2 font-medium">Due Date</th>
                <th className="py-2 font-medium">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(function (a) {
                return (
                  <tr key={a._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{a.title}</td>
                    <td className="py-2.5 text-gray-500">{a.batch}</td>
                    <td className="py-2.5 text-gray-500">{new Date(a.dueDate).toLocaleDateString()}</td>
                    <td className="py-2.5 text-gray-600">{submissionCount(a._id)}</td>
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

export default TrainerAssignments