import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import BatchPerformanceTable from '../../components/ui/BatchPerformanceTable'
import StudentsAtRiskTable from '../../components/ui/StudentsAtRiskTable'
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

function AdminDashboard() {
  const [profile, setProfile] = useState(null)
  const [overview, setOverview] = useState(null)
  const [batchPerformance, setBatchPerformance] = useState([])
  const [atRiskStudents, setAtRiskStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    const user = JSON.parse(localStorage.getItem('user'))
    setProfile(user)

    Promise.all([
      api.get('/admin/overview'),
      api.get('/admin/batch-performance'),
      api.get('/admin/at-risk'),
    ]).then(function (results) {
      setOverview(results[0].data)
      setBatchPerformance(results[1].data)
      setAtRiskStudents(results[2].data)
    }).catch(function (error) {
      console.error('Failed to load admin dashboard:', error)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading || !profile || !overview) {
    return <Spinner />
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: 'Welcome, ' + profile.name + ' 👋',
        subText: 'Monitor overall CRT training progress across all batches.',
        userName: profile.name,
        userRole: profile.designation || 'TPO',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Students" value={overview.totalStudents} />
        <StatCard label="Avg. Attendance" value={overview.avgAttendance + '%'} valueColor="text-green-600" />
        <StatCard label="Avg. Assignment" value={overview.avgAssignments + '%'} valueColor="text-blue-600" />
        <StatCard label="Avg. Coding Activity" value={overview.avgCodingActivity + '%'} valueColor="text-purple-600" />
        <StatCard label="At Risk Students" value={overview.atRiskCount} valueColor="text-red-500" />
      </div>

      <div className="mt-4">
        <BatchPerformanceTable batches={batchPerformance} />
      </div>

      <div className="mt-4">
        <StudentsAtRiskTable
          students={atRiskStudents.map(function (s) {
            return {
              name: s.name,
              id: s.rollNumber,
              readiness: s.readiness,
              attendance: s.attendance + '%',
              lastActive: new Date(s.updatedAt).toLocaleDateString(),
            }
          })}
        />
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard