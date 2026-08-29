import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post(`/auth/${role}/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', role)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate(`/${role}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  const registerLink =
    role === 'student' ? '/register' : role === 'trainer' ? '/register/trainer' : '/register/admin'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-[#f1f5f9] w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">CRT Portal Login</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your dashboard</p>

        <label className="text-xs font-medium text-gray-600">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 mt-1"
        >
          <option value="student">Student</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin (TPO)</option>
        </select>

        <label className="text-xs font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 mt-1"
        />

        <label className="text-xs font-medium text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 mt-1"
        />

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700">
          Sign In
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          New here?{' '}
          <a href={registerLink} className="text-blue-600 font-medium">
            Create a {role} account
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login