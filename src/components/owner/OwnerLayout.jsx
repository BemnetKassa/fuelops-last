// src/components/OwnerLayout.jsx (Updated with logout and user context)
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function OwnerLayout() {
  const { logout, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      <nav className="w-64 p-4 bg-gray-100 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">FuelOps</h2>
          <ul className="space-y-4">
            <li><Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link to="/vehicles" className="text-blue-600 hover:underline">Vehicles</Link></li>
            <li><Link to="/fuel-records" className="text-blue-600 hover:underline">Fuel Records</Link></li>
            <li><Link to="/reports" className="text-blue-600 hover:underline">Reports</Link></li>
          </ul>
        </div>
        <div className="mt-4">
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        </div>
      </nav>
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  )
}
