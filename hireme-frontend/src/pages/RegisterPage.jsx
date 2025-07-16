import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Both fields are required")
      return
    }

    localStorage.setItem("hireme_user", JSON.stringify({ username, password }))
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
      <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-rose-400 text-center mb-6">📝 Register for HireMe</h2>

        <form onSubmit={handleRegister} className="space-y-5">
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
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-rose-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
