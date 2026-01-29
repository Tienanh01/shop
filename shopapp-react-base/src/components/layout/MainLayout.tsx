import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaRegClock, FaGift, FaTruck, FaExternalLinkAlt } from 'react-icons/fa'
import '../../styles/TopBar.css'
import '../../styles/Header.css'
import Header from './Header'

const MainLayout = () => {
  // const navigate = useNavigate()
  // const { isAuthenticated, user, logout } = useAuth()

  // const handleLogout = () => {
  //   logout()
  //   navigate('/login')
  // }

  return (
    <div className="app-root">
  <div className="top-bar">
      <div className="top-bar-container">
        
        {/* Nút bên trái */}
        <a href="/shop" className="btn-shop">
          Shop Now 
          <FaExternalLinkAlt className="icon-small" />
        </a>

        {/* Thông tin bên phải */}
        <div className="info-list">
          <div className="info-item">
            <FaRegClock className="icon" />
            <span>Same Day Dispatch Before 2PM</span>
          </div>
          
          <div className="info-item">
            <FaGift className="icon" />
            <span>Gift Cards Available</span>
          </div>

          <div className="info-item">
            <FaTruck className="icon" />
            <span>Free Shipping on Orders $50+</span>
          </div>
        </div>

      </div>
    </div>
   {/* Gọi Header gọn gàng (không cần truyền props) */}
      <Header />

      <main style={{ padding: '24px', minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </main>

      <footer
        style={{
          padding: '16px 24px',
          textAlign: 'center',
          background: '#111827',
          color: '#9ca3af',
        }}
      >
        © {new Date().getFullYear()} ShopApp. Base React structure.
      </footer>
    </div>
  )
}

export default MainLayout