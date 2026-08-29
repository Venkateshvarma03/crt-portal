import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'

function Sidebar({ navItems, portalName = 'CRT Portal' }) {
  const location = useLocation()

  return (
    <aside className="w-60 bg-[#0f172a] text-gray-300 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <LayoutDashboard size={22} className="text-blue-400" />
        <span className="font-semibold text-white text-lg">{portalName}</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-white/5 hover:text-white w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar