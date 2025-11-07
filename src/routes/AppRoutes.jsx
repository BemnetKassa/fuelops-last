import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import NotFound from '../pages/NotFound'
import LandingPage from '../pages/LandingPage'

// Context
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate to="/login" />
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        {/* Landing page (public) */}
        <Route path="/" element={<LandingPage />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
}
