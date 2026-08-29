import DashboardLayout from '../../components/layout/DashboardLayout'
import { LayoutDashboard, User, CalendarCheck, ClipboardList, Code2, TrendingUp, Trophy, Bell, BookMarked, Settings, ExternalLink } from 'lucide-react'

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

const resourceList = [
  { title: 'Data Structures & Algorithms', desc: 'Core DSA concepts and practice problems', link: 'https://leetcode.com' },
  { title: 'System Design Basics', desc: 'Fundamentals of designing scalable systems', link: 'https://github.com/donnemartin/system-design-primer' },
  { title: 'Aptitude Practice', desc: 'Quantitative and logical reasoning practice', link: 'https://www.indiabix.com' },
  { title: 'Mock Interview Prep', desc: 'Behavioral and technical interview guides', link: 'https://www.pramp.com' },
]

function openLink(url) {
  window.open(url, '_blank')
}

function ResourceCard(props) {
  return (
    <div
      onClick={function () { openLink(props.link) }}
      className="bg-white rounded-xl border border-[#f1f5f9] p-4 shadow-sm hover:border-blue-200 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-800">{props.title}</p>
        <ExternalLink size={14} className="text-gray-400" />
      </div>
      <p className="text-xs text-gray-400 mt-1">{props.desc}</p>
    </div>
  )
}

function Resources() {
  const profile = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <DashboardLayout
      navItems={navItems}
      topbarProps={{
        welcomeText: 'Resources',
        subText: 'Curated learning material for CRT prep.',
        userName: profile.name,
        userRole: profile.rollNumber,
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resourceList.map(function (item, index) {
          return <ResourceCard key={index} title={item.title} desc={item.desc} link={item.link} />
        })}
      </div>
    </DashboardLayout>
  )
}

export default Resources