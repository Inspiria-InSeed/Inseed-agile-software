import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ChevronDown, Loader2, AlertCircle } from 'lucide-react'
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext'
import { mockUsers } from '@/lib/mockData'

// Demo accounts grouped by role
const demoAccounts = [
  { label: 'Admin — Pritham Kalhi',            id: 'admin1',  role: 'ADMIN',             email: 'pritham@inseed.com'  },
  { label: 'Admin — Neha Thapa',               id: 'admin2',  role: 'ADMIN',             email: 'neha@inseed.com'     },
  { label: 'Agile Coordinator',               id: 'u4',      role: 'AGILE_COORDINATOR', email: 'sara@inseed.com'     },
  { label: 'Team Lead — Deb Prasad (P001)',    id: 'M0036',   role: 'TEAM_LEAD',         email: 'deb.g.0225@inspiria.edu.in' },
  { label: 'Team Lead — Anindita (P002)',      id: 'M0013',   role: 'TEAM_LEAD',         email: 'anindita@inspiria.edu.in'   },
  { label: 'Team Lead — Akash Bhagat (P005)', id: 'M0029',   role: 'TEAM_LEAD',         email: 'akash.b@inspiria.edu.in'    },
  { label: 'Member — Biplob Sinha',            id: 'M009',    role: 'MEMBER',            email: 'biplob.s@inspiria.edu.in'   },
  { label: 'Member — Rohit Pandit',            id: 'M0011',   role: 'MEMBER',            email: 'rohit.p@inspiria.edu.in'    },
]

const roleBadgeColors: Record<string, string> = {
  ADMIN:             'bg-purple-100 text-purple-700',
  AGILE_COORDINATOR: 'bg-blue-100 text-blue-700',
  TEAM_LEAD:         'bg-indigo-100 text-indigo-700',
  MEMBER:            'bg-emerald-100 text-emerald-700',
}

export default function Login() {
  const { login, loginAsDemo, isAuthenticated, user } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = (location.state as any)?.from?.pathname

  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [demoOpen,   setDemoOpen]   = useState(false)

  // If already authenticated, redirect to correct dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(from || getDashboardRoute(user.role), { replace: true })
    }
  }, [isAuthenticated, user, navigate, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (!password.trim()) { setError('Please enter your password.'); return }
    setError('')
    setLoading(true)
    const result = await login(email.trim(), password)
    setLoading(false)
    if (!result.success) { setError(result.error ?? 'Login failed.'); return }
  }

  const handleDemo = (id: string) => {
    setDemoOpen(false)
    loginAsDemo(id)
  }

  return (
    <div className="min-h-screen bg-[#040812] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/40 mb-4"
          >
            <span className="text-white font-black text-xl">IS</span>
          </motion.div>
          <h1 className="text-2xl font-black text-white tracking-tight">INSEED</h1>
          <p className="text-gray-400 text-sm mt-1">Project Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-1">Sign in to your account</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="you@inspiria.edu.in"
                  className="w-full bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-snug">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.01 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs font-medium">or continue with demo</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Demo accounts dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDemoOpen(p => !p)}
              className="w-full flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-gray-300 rounded-xl px-4 py-3 text-sm transition-all"
            >
              <span>Select a demo account</span>
              <motion.span animate={{ rotate: demoOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-gray-400" />
              </motion.span>
            </button>

            <AnimatePresence>
              {demoOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute left-0 right-0 top-14 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {/* Group by role */}
                  {(['ADMIN', 'AGILE_COORDINATOR', 'TEAM_LEAD', 'MEMBER'] as const).map(role => {
                    const group = demoAccounts.filter(d => d.role === role)
                    if (!group.length) return null
                    const roleLabel = { ADMIN: 'Admin', AGILE_COORDINATOR: 'Agile Coordinator', TEAM_LEAD: 'Team Lead', MEMBER: 'Member' }[role]
                    return (
                      <div key={role}>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 pt-3 pb-1">{roleLabel}</p>
                        {group.map(d => (
                          <button
                            key={d.id}
                            onClick={() => handleDemo(d.id)}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                          >
                            <div>
                              <p className="text-sm text-white font-medium leading-snug">
                                {mockUsers.find(u => u.id === d.id)?.name ?? d.label.split('—')[1]?.trim()}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">{d.email}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-3 ${roleBadgeColors[role]}`}>
                              {roleLabel}
                            </span>
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-gray-600 mt-5 text-center">
            Demo mode — any password works for registered emails
          </p>
        </div>

        {/* Back to landing */}
        <p className="text-center mt-5">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to Home
          </button>
        </p>
      </motion.div>
    </div>
  )
}
