import React, { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

const Signup = ({ handleSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const move = (e) =>
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      handleSignup(formData)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "employee",
      })
      setIsLoading(false)
    }, 1500)
  }

  const roles = ["employee", "admin"]

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139,92,246,.4), rgba(59,130,246,.3) 35%, rgba(16,185,129,.2) 70%, transparent 100%)`,
        }}
      />

      <div className="relative z-30 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="relative group">
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                  <span className="text-3xl animate-pulse">⚡</span>
                </div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-white/70">Sign up to get started</p>
              </div>

              {/* Form */}
              <form onSubmit={submitHandler} className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

                {/* Role */}
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-black text-white">
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Signup Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:scale-105 transition disabled:opacity-70"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </button>
              </form>

              {/* Switch to Login */}
              <div className="text-center mt-6 pt-6 border-t border-white/20">
                <p className="text-white/60 mb-3">Already have an account?</p>
                <button
                  onClick={onSwitchToLogin}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg"
                >
                  Sign In →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
