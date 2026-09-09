import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderKanban, CheckSquare, Zap,
  Users, BarChart3, Settings, LogOut, ChevronRight,
  Activity, Menu, X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/mockData'
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext'
import type { User } from '@/types'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard'  },
  { label: 'Projects',  icon: FolderKanban,    to: '/projects'   },
  { label: 'Tasks',     icon: CheckSquare,     to: '/tasks'      },
  { label: 'Sprints',   icon: Zap,             to: '/sprints'    },
  { label: 'Team',      icon: Users,           to: '/team'       },
  { label: 'Reports',   icon: BarChart3,       to: '/reports'    },
  { label: 'Activity',  icon: Activity,        to: '/activity'   },
  { label: 'Settings',  icon: Settings,        to: '/settings'   },
]

const roleGradients: Record<string, string> = {
  ADMIN:             'from-purple-500 to-indigo-600',
  AGILE_COORDINATOR: 'from-blue-500 to-cyan-600',
  TEAM_LEAD:         'from-indigo-500 to-blue-600',
  MEMBER:            'from-emerald-500 to-teal-600',
}

const roleLabels: Record<string, string> = {
  ADMIN:             'Admin',
  AGILE_COORDINATOR: 'Agile Coord.',
  TEAM_LEAD:         'Team Lead',
  MEMBER:            'Member',
}

function NavList({ user, onNavigate }: { user: User; onNavigate?: () => void }) {
  const location = useLocation()
  const items = navItems.map(n =>
    n.label === 'Dashboard' ? { ...n, to: getDashboardRoute(user.role) } : n
  )

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-2 mb-3">Navigation</p>
      {items.map((item) => {
        const Icon = item.icon
        const active =
          location.pathname === item.to ||
          (item.to.length > 1 &&
            item.to !== '/dashboard' &&
            location.pathname.startsWith(item.to)) ||
          (item.label === 'Dashboard' && location.pathname.startsWith('/dashboard'))

        return (
          <NavLink key={item.label} to={item.to} onClick={onNavigate}>
            <motion.div
              initial={false}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={12} className="opacity-50 flex-shrink-0" />}
            </motion.div>
          </NavLink>
        )
      })}
    </nav>
  )
}

function UserFooter({ user }: { user: User }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="border-t border-gray-800 p-3">
      <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
        <div className={cn(
          'w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0',
          roleGradients[user.role] || 'from-gray-500 to-gray-700'
        )}>
          {getInitials(user.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate leading-tight">{user.name}</p>
          <p className="text-gray-500 text-xs">{roleLabels[user.role]}</p>
        </div>
        <button
          onClick={handleLogout}
          title="Sign out"
          className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded flex-shrink-0"
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  )
}

// ── Desktop ───────────────────────────────────────────────────────────────────
function DesktopSidebar({ user }: { user: User }) {
  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-gray-900 border-r border-gray-800 flex-shrink-0">
      <div className="flex items-center gap-3 px-5 py-[18px] border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
          <span className="text-white font-black text-xs">IS</span>
        </div>
        <div>
          <p className="font-black text-white text-base leading-none tracking-tight">INSEED</p>
          <p className="text-gray-600 text-[10px] mt-0.5">Project Management</p>
        </div>
      </div>
      <NavList user={user} />
      <UserFooter user={user} />
    </aside>
  )
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function MobileSidebar({ user }: { user: User }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-800"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-[18px] border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-black text-xs">IS</span>
                  </div>
                  <p className="font-black text-white text-base">INSEED</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white p-1">
                  <X size={18} />
                </button>
              </div>
              <NavList user={user} onNavigate={() => setOpen(false)} />
              <UserFooter user={user} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Sidebar({ user }: { user: User }) {
  return (
    <>
      <DesktopSidebar user={user} />
      <MobileSidebar user={user} />
    </>
  )
}
