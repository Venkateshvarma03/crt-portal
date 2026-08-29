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

function AdminAssignments() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(function () {
    api.get('/assignments/submissions/all').then(function (res) {
      setSubmissions(res.data)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  const statusStyles = {
    submitted: 'bg-orange-100 text-orange-700',
    graded: 'bg-green-100 text-green-700',
    pending: 'bg-gray-100 text-gray-500',
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{ welcomeText: 'Assignments Overview', subText: 'All submissions across all trainers and batches.', userName: profile.name, userRole: profile.designation || 'TPO' }}
    >
      <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Submissions ({submissions.length})</h3>
        {submissions.length === 0 ? (
          <p className="text-sm text-gray-400">No submissions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">Assignment</th>
                <th className="py-2 font-medium">Batch</th>
                <th className="py-2 font-medium">Student</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(function (s) {
                return (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 font-medium text-gray-800">{s.assignment ? s.assignment.title : ''}</td>
                    <td className="py-2.5 text-gray-500">{s.assignment ? s.assignment.batch : ''}</td>
                    <td className="py-2.5 text-gray-600">{s.student ? s.student.name : ''} <span className="text-gray-400 text-xs">({s.student ? s.student.rollNumber : ''})</span></td>
                    <td className="py-2.5"><span className={'px-2 py-0.5 rounded-full text-xs font-medium ' + statusStyles[s.status]}>{s.status}</span></td>
                    <td className="py-2.5 text-gray-600">{s.grade !== undefined && s.grade !== null ? s.grade : '—'}</td>
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

export default AdminAssignments