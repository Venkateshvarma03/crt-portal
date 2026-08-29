import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Register() {
  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    email: '',
    password: '',
    branch: '',
    section: '',
    year: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/student/register', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', 'student')
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/student')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-[#f1f5f9] w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Student Registration</h1>
        <p className="text-sm text-gray-500 mb-6">Create your CRT Portal account</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="e.g. Malyala Venkatesh"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="e.g. 23R91A05J1"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">College Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="e.g. venkatesh@college.edu"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
                          <div>
              <label className="text-xs font-medium text-gray-600">Branch</label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="AI&ML/IT">AI&ML / IT</option>
                <option value="EEE/ECE">EEE / ECE</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Section</label>
              <input
                type="text"
                name="section"
                value={form.section}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="A"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Year</label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1"
                placeholder="2026"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mt-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 mt-6 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register