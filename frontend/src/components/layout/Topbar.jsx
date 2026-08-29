import { Bell } from 'lucide-react'

function Topbar({ welcomeText, subText, userName, userRole, avatarUrl }) {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
      <div>
       <h1 className="text-lg font-bold text-gray-900">{welcomeText}</h1>        <p className="text-sm text-gray-500">{subText}</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src={avatarUrl || 'https://i.pravatar.cc/40'}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900">{userName}</p>
            <p className="text-gray-500 text-xs">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar