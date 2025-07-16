import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    const storedUser = localStorage.getItem("hireme_user")
    if (!storedUser) {
      setError("No user registered. Please sign up first.")
      return
    }

    const { username: storedUsername, password: storedPassword } = JSON.parse(storedUser)
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true")
      onLogin() // ✅ Inform App.jsx login succeeded
      navigate("/") // ✅ Redirect to home
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
      <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-rose-400 text-center mb-6">🔐 Login to HireMe</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-white">Username</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-slate-900 text-white border border-slate-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-white">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-slate-900 text-white border border-slate-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold">
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-rose-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
