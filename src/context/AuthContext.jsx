import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('fuelops-user')) || null
  )

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('fuelops-user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fuelops-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
