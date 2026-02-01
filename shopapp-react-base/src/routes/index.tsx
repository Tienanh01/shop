import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import { useAuth } from '../context/AuthContext'
import Home from '../pages/home/Home'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div>Profile page (protected)</div>
            </PrivateRoute>
          }
        /> 
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<div>404 - Not found</div>} />
    </Routes>
  )
}

export default AppRoutes