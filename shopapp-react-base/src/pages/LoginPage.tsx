import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import '../styles/auth.css'
import { useAuth } from '../context/AuthContext'

type LoginResponse = {
	access_token: string
	refresh_token: string
	token_type: string
	expires_in: number
	user: {
		id: number
		userName: string
		role: 'USER' | 'ADMIN'
		fullName: string
	}
}

type LoginFormData = {
  phone_number: string
  password: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    phone_number: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const res = await axiosClient.post('/users/login', {
        phone_number: formData.phone_number,
        password: formData.password,
      })
        console.log('Login response:', res)

      const data = res.data as LoginResponse
      console.log('Login data:', data)

      // save token and user via auth context
      await auth.login(data)
      setSuccess('Đăng nhập thành công — chuyển hướng...')
      navigate('/')
    } catch (err) {
      const anyErr = err as any
      const message = (anyErr?.response?.data as any)?.message ?? anyErr?.message ?? 'Login failed'
      setError(String(message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Username or Phone Number"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  )
}
