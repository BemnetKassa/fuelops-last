import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Welcome to FuelOps</h1>
        <p className="mb-2">Logged in as: <strong>{user?.name}</strong> ({user?.email})</p>
        <p className="mb-4 text-sm text-gray-500">Role: {user?.role}</p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
