import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import '../styles/auth.css'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

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

type RegisterFormData = {
  full_name: string
  address: string
  phone_number: string
  password: string
  confirm_password: string
   date_of_birth : Date
  role: string 
}

export default function RegisterPage() {
  // dùng để chuyển trang
  const navigate = useNavigate() 

  // lấy hàm login từ auth  
  const auth = useAuth()
  // trạng thái form
   
  const [formData, setFormData] = useState<RegisterFormData>({
    full_name: '',
    address: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    date_of_birth: new Date(),
    role: ''
  })
   // Trạng thái loading
  const [loading, setLoading] = useState(false)
  
   // Lỗi & thành công
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

    // ===== XỬ LÝ KHI GÕ INPUT =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Trạng thái roles
  const [roles, setRoles] = useState<Array<{ id: string; name: string }>>([])

  // ===== XỬ LÝ SUBMIT FORM =====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (formData.password !== formData.confirm_password) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp')
      return
    }

    setLoading(true)

    try {
      // Assumption: backend register endpoint is POST /users/register
      const res = await axiosClient.post('/users/register', {
        fullName: formData.full_name,
        address: formData.address,
        password: formData.password,
        phone_number: formData.phone_number,
        retype_password: formData.confirm_password,
        date_of_birth: formData.date_of_birth.toISOString(),
        facebook_account_id: 0,
        google_account_id: 0,
        role_id: formData.role
        
      })

      const data = res.data as LoginResponse
      // Log the user in with the response
      await auth.login(data)
      setSuccess('Đăng ký thành công — chuyển hướng...')
      navigate('/')
      return
    } catch (err) {
      const anyErr = err as any
      const message = (anyErr?.response?.data as any)?.message ?? anyErr?.message ?? 'Đăng ký thất bại'
      setError(String(message))
    } finally {
      setLoading(false)
    }
  }

  // Fetch roles on component mount
  const fetchedRef = useRef(false)
  useEffect(() => {
     if (fetchedRef.current) return
  fetchedRef.current = true
    const fetchRoles = async () => {
      try {
        const res = await axiosClient.get('/roles/getlist')
        setRoles(res.data)
      } catch (err) {
        console.error('Failed to fetch roles', err)
      }
    }
    fetchRoles()
  }, [])

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Register</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Nguyen Van A"
              required
              disabled={loading}
            />
          </div>

                 <div className="form-group">
            <label htmlFor="address">Địa chỉ </label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Hà Nôi"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">User Name</label>
            <input
              id="phone_number"
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
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
              placeholder="Enter a password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div> 

         
          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth</label>  
            <input
              id="date_of_birth"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth.toISOString().split('T')[0]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  date_of_birth: new Date(e.target.value),
                }))
              }
              required
              disabled={loading}
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.id} - {role.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="login-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  )
}
