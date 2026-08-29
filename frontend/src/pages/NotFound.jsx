import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-center px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
      <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/login" className="text-sm text-blue-600 font-medium hover:underline">
        Go back to Login
      </Link>
    </div>
  )
}

export default NotFound