import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaRegClock, FaGift, FaTruck, FaExternalLinkAlt } from 'react-icons/fa'
import '../../styles/TopBar.css'
import '../../styles/Header.css'
import Header from './Header'
import AppFooter from './Footer'
import TopBar from './TopBar'

const MainLayout = () => {
  // const navigate = useNavigate()
  // const { isAuthenticated, user, logout } = useAuth()

  // const handleLogout = () => {
  //   logout()
  //   navigate('/login')
  // }

  return (
    <div className="app-root">
      <TopBar />

   {/* Gọi Header gọn gàng (không cần truyền props) */}
      <Header />

      <main style={{ padding: '24px', minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </main>

      {/* <footer
        style={{
          padding: '16px 24px',
          textAlign: 'center',
          background: '#111827',
          color: '#9ca3af',
        }}
      >
        © {new Date().getFullYear()} ShopApp. Base React structure.
      </footer> */} 

      <AppFooter  />
    </div>
  )
}

export default MainLayout