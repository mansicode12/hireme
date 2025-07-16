// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Reports from "./pages/Reports"
import Home from './pages/Home'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Results from './pages/Results'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true"
    setIsLoggedIn(auth)
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/results" element={isLoggedIn ? <Results /> : <Navigate to="/login" />} />
      <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  )
}
