import Sidebar from './Sidebar'
import Topbar from './Topbar'

function DashboardLayout({ navItems, topbarProps, children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col">
        <Topbar {...topbarProps} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout