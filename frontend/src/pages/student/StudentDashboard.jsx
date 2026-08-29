import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import ProgressRingCard from '../../components/ui/ProgressRingCard'
import AttendanceCalendar from '../../components/ui/AttendanceCalendar'
import UpcomingClasses from '../../components/ui/UpcomingClasses'
import AssignmentsList from '../../components/ui/AssignmentsList'
import CodingProfiles from '../../components/ui/CodingProfiles'
import ProgressTrendChart from '../../components/ui/ProgressTrendChart'
import RecentNotifications from '../../components/ui/RecentNotifications'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  ClipboardList,
  Code2,
  TrendingUp,
  Trophy,
  Bell,
  BookMarked,
  Settings,
} from 'lucide-react'

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

function StudentDashboard() {
  const [profile, setProfile] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [codingProfiles, setCodingProfiles] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    Promise.all([
      api.get('/students/me'),
      api.get('/assignments/submissions/me'),
      api.get('/students/coding-profiles'),
      api.get('/attendance/me'),
      api.get('/schedule/upcoming'),
      api.get('/notifications/me'),
    ]).then(function (results) {
      setProfile(results[0].data)
      setAssignments(results[1].data)
      setCodingProfiles(results[2].data)
      setAttendanceRecords(results[3].data)
      setUpcomingClasses(results[4].data)
      setNotifications(results[5].data)
    }).catch(function (error) {
      console.error('Failed to load dashboard data:', error)
    }).finally(function () {
      setLoading(false)
    })
  }, [])

  if (loading || !profile) {
    return <Spinner />
  }

  const attendanceDays = {
    present: attendanceRecords.filter(function (r) { return r.status === 'present' }).map(function (r) { return new Date(r.date).getDate() }),
    absent: attendanceRecords.filter(function (r) { return r.status === 'absent' }).map(function (r) { return new Date(r.date).getDate() }),
    holiday: [],
  }

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: 'Welcome back, ' + profile.name + ' 👋',
        subText: "Here's your CRT training progress overview.",
        userName: profile.name,
        userRole: profile.rollNumber,
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgressRingCard label="Overall Readiness" value={profile.readiness} statusText={profile.readiness >= 60 ? 'On Track' : 'Needs Attention'} />
        <StatCard label="Attendance" value={profile.attendance + '%'} subLabel={attendanceRecords.length + ' classes tracked'} />
        <StatCard label="Assignments" value={profile.assignments + '%'} subLabel={assignments.length + ' submitted'} />
        <StatCard label="Coding Activity" value={profile.codingActivity + '%'} subLabel="Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <AttendanceCalendar attendanceDays={attendanceDays} />
        <UpcomingClasses
          classes={upcomingClasses.map(function (c) {
            return {
              subject: c.subject,
              time: new Date(c.date).toLocaleDateString() + ', ' + c.startTime + ' - ' + c.endTime,
              room: c.room,
            }
          })}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <AssignmentsList
          assignments={assignments.map(function (a) {
            return {
              title: a.assignment ? a.assignment.title : 'Assignment',
              due: a.assignment && a.assignment.dueDate ? 'Due: ' + new Date(a.assignment.dueDate).toLocaleDateString() : '',
              status: a.status === 'graded' ? 'Submitted' : a.status === 'submitted' ? 'Submitted' : 'Pending',
            }
          })}
        />
        <CodingProfiles profiles={codingProfiles} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <ProgressTrendChart data={[]} />
        <RecentNotifications
          notifications={notifications.map(function (n) {
            return { title: n.title, time: new Date(n.createdAt).toLocaleString() }
          })}
        />
      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard