import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import BatchProgressTable from '../../components/ui/BatchProgressTable'
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

function TrainerDashboard() {
  const [profile, setProfile] = useState(null)
  const [students, setStudents] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [todayClasses, setTodayClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    const user = JSON.parse(localStorage.getItem('user'))
    setProfile(user)

    Promise.all([
      api.get('/students/batch'),
      api.get('/assignments/submissions/trainer'),
      api.get('/schedule/today'),
    ]).then(function (results) {
      setStudents(results[0].data)
      setSubmissions(results[1].data)
      setTodayClasses(results[2].data)
    }).catch(function (error) {
      console.error('Failed to load trainer dashboard:', error)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading || !profile) {
    return <Spinner />
  }

  const totalStudents = students.length
  const avgAttendance = totalStudents ? Math.round(students.reduce(function (sum, s) { return sum + s.attendance }, 0) / totalStudents) : 0
  const avgAssignments = totalStudents ? Math.round(students.reduce(function (sum, s) { return sum + s.assignments }, 0) / totalStudents) : 0
  const atRiskCount = students.filter(function (s) { return s.readiness < 40 }).length

  const batchProgressData = students.map(function (s, i) {
    return {
      rank: i + 1,
      name: s.name,
      attendance: s.attendance + '%',
      assignments: s.assignments + '%',
      coding: s.codingActivity + '%',
      readiness: s.readiness,
    }
  })

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: 'Welcome, ' + profile.name,
        subText: 'Manage your batches, sessions and students.',
        userName: profile.name,
        userRole: 'Trainer',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={totalStudents} />
        <StatCard label="Attendance Avg." value={avgAttendance + '%'} valueColor="text-green-600" />
        <StatCard label="Assignment Avg." value={avgAssignments + '%'} valueColor="text-blue-600" />
        <StatCard label="At Risk Students" value={atRiskCount} valueColor="text-red-500" />
      </div>

      <div className="mt-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Today's Classes</h3>
            <Link to="/trainer/schedule/new" className="text-xs text-blue-600 font-medium">+ Schedule Class</Link>
          </div>
          {todayClasses.length === 0 ? (
            <p className="text-xs text-gray-400">No classes scheduled for today.</p>
          ) : (
            <div className="space-y-3">
              {todayClasses.map(function (c) {
                return (
                  <div key={c._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.subject}</p>
                      <p className="text-xs text-gray-400">{c.startTime} - {c.endTime}</p>
                      <p className="text-xs text-gray-400">{c.room}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">{c.batch}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Submissions to Grade</h3>
          <div className="space-y-3">
            {submissions.filter(function (s) { return s.status !== 'graded' }).length === 0 ? (
              <p className="text-xs text-gray-400">No pending submissions 🎉</p>
            ) : (
              submissions.filter(function (s) { return s.status !== 'graded' }).map(function (s) {
                return (
                  <div key={s._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{s.assignment ? s.assignment.title : ''}</p>
                      <p className="text-xs text-gray-400">{s.student ? s.student.name : ''} ({s.student ? s.student.rollNumber : ''})</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">{s.status}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <BatchProgressTable students={batchProgressData} />
      </div>
    </DashboardLayout>
  )
}

export default TrainerDashboard