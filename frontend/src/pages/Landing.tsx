import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Shield, Zap, Users, BarChart3,
  Target, GitBranch, Star, FolderKanban,
  CheckCircle, Lock
} from 'lucide-react'

const features = [
  { icon: Shield,       title: 'Role-Based Security',   desc: 'Project-scoped permissions. Same user can have different roles in different projects.',  color: 'from-purple-500 to-indigo-600' },
  { icon: Zap,          title: 'Sprint Management',      desc: 'Plan, track and complete sprints with real-time progress, goals, and burndown data.',     color: 'from-yellow-400 to-orange-500' },
  { icon: Users,        title: 'Team Collaboration',     desc: 'Manage members, assign tasks, and coordinate across multiple projects seamlessly.',       color: 'from-blue-500 to-cyan-500'     },
  { icon: BarChart3,    title: 'Analytics & Reports',    desc: 'Cross-project insights, sprint velocity, blocked tasks, and team performance metrics.',    color: 'from-green-400 to-emerald-600' },
  { icon: GitBranch,    title: 'Agile Workflow',         desc: 'Full hierarchy: Backlogs → Epics → User Stories → Tasks, all in one system.',             color: 'from-rose-500 to-pink-600'     },
  { icon: FolderKanban, title: 'Kanban Boards',          desc: 'Visualise task flow with interactive kanban boards, status tracking, and filters.',        color: 'from-teal-400 to-cyan-600'     },
]

const roles = [
  { role: 'Admin',             sub: 'Full organisation access',        color: 'from-purple-600 to-indigo-600', icon: Shield  },
  { role: 'Agile Coordinator', sub: 'Cross-project coordination',      color: 'from-blue-500 to-cyan-600',     icon: BarChart3 },
  { role: 'Team Lead',         sub: 'Project management & leadership', color: 'from-indigo-500 to-blue-600',   icon: Target  },
  { role: 'Member',            sub: 'Task view & progress updates',    color: 'from-emerald-500 to-teal-600',  icon: CheckCircle },
]

const liveProjects = [
  { id: 'P001', name: 'Wellness Web/App',       sprint: 'Sprint 2', progress: 40, members: 5  },
  { id: 'P002', name: 'Hospital Management',    sprint: 'Sprint 2', progress: 55, members: 7  },
  { id: 'P004', name: 'BBA-SM Fitness Tracker', sprint: 'Sprint 1', progress: 46, members: 6  },
  { id: 'P005', name: 'Quiz Website (Nepal)',   sprint: 'Sprint 2', progress: 80, members: 5  },
  { id: 'P008', name: 'AI Counsellor',          sprint: 'Sprint 1', progress: 30, members: 4  },
  { id: 'P009', name: 'Appse AI',               sprint: 'Sprint 2', progress: 40, members: 8  },
]

// ── Fade-in-up animation preset ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#040812] text-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 backdrop-blur-xl bg-black/40 border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <span className="text-white font-black text-sm">IS</span>
          </div>
          <span className="font-black text-lg tracking-tight">INSEED</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {['Features', 'Roles', 'Projects'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-600/30"
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* NOTE: No framer-motion parallax opacity on the hero wrapper — that caused blank first-view */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/8 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '44px 44px' }} />
        </div>

        {/* Content — uses direct animate, NOT scroll-linked opacity */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-8"
          >
            <Star size={13} className="fill-blue-400 text-blue-400" />
            Internal Project Management Platform · 9 Active Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 leading-none"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Manage Projects
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Without Limits
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            INSEED is a secure, role-based Agile project management platform.
            One command centre for all your teams, sprints, tasks, and collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(59,130,246,0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-2xl shadow-blue-600/30 transition-all"
            >
              <Lock size={16} /> Sign In to INSEED
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white px-8 py-3.5 rounded-xl text-base font-semibold backdrop-blur-sm transition-all"
            >
              View Demo <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-500"
          >
            {[['9', 'Active Projects'], ['40+', 'Team Members'], ['4', 'Role Types'], ['3', 'Mentors']].map(([v, l]) => (
              <div key={l} className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{v}</span>
                <span>{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-5 h-9 border-2 border-gray-700 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2.5 bg-gray-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14" {...fadeUp()}>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything you need
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              A complete Agile project management suite built for modern teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm transition-all cursor-default"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Roles ─────────────────────────────────────────────────────────── */}
      <section id="roles" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" {...fadeUp()}>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Built for every role
            </h2>
            <p className="text-gray-400 text-lg">
              Project-scoped permissions — the right people always see the right things.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {roles.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div
                  key={r.role}
                  {...fadeUp(i * 0.08)}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(99,102,241,0.4)' }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 text-center transition-all cursor-default"
                >
                  <div className={`w-13 h-13 rounded-full bg-gradient-to-br ${r.color} mx-auto mb-4 flex items-center justify-center shadow-lg w-14 h-14`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1 text-sm">{r.role}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{r.sub}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Live Projects ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14" {...fadeUp()}>
            <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Currently active
            </h2>
            <p className="text-gray-400">9 projects running across the organisation right now</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveProjects.map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(i * 0.07)}
                whileHover={{ y: -3, borderColor: 'rgba(59,130,246,0.35)' }}
                onClick={() => navigate('/login')}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded">{p.id}</span>
                  <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">{p.sprint}</span>
                </div>
                <h3 className="font-semibold text-white text-sm mb-3 group-hover:text-blue-300 transition-colors">{p.name}</h3>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users size={11} />{p.members} members</span>
                  <span className="font-semibold text-gray-300">{p.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)} className="text-center mt-10">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
            >
              Sign in to view all projects <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <motion.div
          {...fadeUp()}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600/15 to-indigo-600/15 border border-blue-500/25 rounded-3xl p-14 backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Ready to get started?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Sign in with your Inspiria credentials or pick a demo account to explore INSEED.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(59,130,246,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3.5 rounded-xl text-base font-semibold shadow-2xl transition-all"
          >
            Sign In to INSEED <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">IS</span>
            </div>
            <span className="font-bold text-white text-sm">INSEED</span>
            <span className="text-gray-600 text-sm">· Internal Project Management System</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            {['Features', 'Roles', 'Projects'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-gray-400 transition-colors">{l}</a>
            ))}
            <button onClick={() => navigate('/login')} className="hover:text-gray-400 transition-colors">Sign In</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
