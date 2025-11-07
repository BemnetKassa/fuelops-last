import { Link } from 'react-router-dom'

<p className="text-sm text-center mt-4">
  Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register here</Link>
</p>

// ✅ AuthContext.jsx (unchanged logic-wise, ensure login accepts full user object)
// Just make sure login(userData) is flexible to accept vehicle info too

// ✅ DashboardPage.jsx (Enhanced with role-based info)
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name || user?.email}</h2>
          <p className="text-gray-600 mb-4">You're now logged into FuelOps.</p>

          {user?.role === 'driver' && user.vehicle && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Vehicle Info</h3>
              <p>Plate Number: {user.vehicle.plate_number}</p>
              <p>Fuel Type: {user.vehicle.fuel_type}</p>
              <p>Daily Limit: {user.vehicle.daily_limit}L</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
