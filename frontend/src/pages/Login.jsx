import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { GraduationCap } from 'lucide-react'

function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = function (e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    api.post('/auth/' + role + '/login', { email: email, password: password })
      .then(function (res) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', role)
        localStorage.setItem('user', JSON.stringify(res.data))
        navigate('/' + role)
      })
      .catch(function (err) {
        setError(err.response && err.response.data ? err.response.data.message : 'Login failed')
      })
      .finally(function () {
        setLoading(false)
      })
  }

  const registerLink = role === 'student' ? '/register' : role === 'trainer' ? '/register/trainer' : '/register/admin'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-3">
            <GraduationCap size={26} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">CRT Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Campus Recruitment Training</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">Access your dashboard</p>

          <label className="text-xs font-medium text-gray-600">Role</label>
          <select
            value={role}
            onChange={function (e) { setRole(e.target.value) }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm mb-4 mt-1 bg-white"
          >
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin (TPO)</option>
          </select>

          <label className="text-xs font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={function (e) { setEmail(e.target.value) }}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm mb-4 mt-1"
            placeholder="you@college.edu"
          />

          <label className="text-xs font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={function (e) { setPassword(e.target.value) }}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm mb-4 mt-1"
            placeholder="••••••••"
          />

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 active:scale-[0.99] transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-5">
            New here?{' '}
            <a href={registerLink} className="text-blue-600 font-semibold">
              Create a {role} account
            </a>
          </p>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 CRT Portal. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login