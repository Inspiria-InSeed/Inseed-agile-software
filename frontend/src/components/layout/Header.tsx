import { Bell, Search, Moon, Sun, ChevronDown, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/mockData'
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext'
import type { User } from '@/types'

interface HeaderProps {
  user: User
  title?: string
  dark: boolean
  toggleDark: () => void
}

const roleColors: Record<string, string> = {
  ADMIN:             'from-purple-500 to-indigo-600',
  AGILE_COORDINATOR: 'from-blue-500 to-cyan-600',
  TEAM_LEAD:         'from-indigo-500 to-blue-600',
  MEMBER:            'from-emerald-500 to-teal-600',
}

const roleBadge: Record<string, string> = {
  ADMIN:             'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  AGILE_COORDINATOR: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  TEAM_LEAD:         'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  MEMBER:            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

const roleLabel: Record<string, string> = {
  ADMIN: 'Admin', AGILE_COORDINATOR: 'Agile Coord.', TEAM_LEAD: 'Team Lead', MEMBER: 'Member'
}

const notifications = [
  { title: 'Sprint 2 ending soon',    desc: 'Hospital Management — 1 day left',  time: '1h ago',  dot: 'bg-red-500'    },
  { title: 'Task blocked in P004',    desc: '"Update the Database" is blocked',   time: '3h ago',  dot: 'bg-yellow-500' },
  { title: 'New member joined',       desc: 'Rahul Chettri joined P002',          time: '1d ago',  dot: 'bg-green-500'  },
  { title: 'Quiz Website Sprint done',desc: 'P005 Sprint 2 — all 5 tasks done ✓', time: '2d ago',  dot: 'bg-blue-500'   },
]

export default function Header({ user, title = 'Dashboard', dark, toggleDark }: HeaderProps) {
  const { logout }          = useAuth()
  const navigate             = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen,  setUserOpen]  = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef  = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (userRef.current  && !userRef.current.contains(e.target as Node))  setUserOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between pl-14 md:pl-6 pr-4 flex-shrink-0 relative z-30">
      {/* Title */}
      <motion.div key={title} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="min-w-0">
        <h1 className="text-base font-bold text-gray-900 dark:text-white truncate">{title}</h1>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 hidden sm:block">
          Welcome back, <span className="text-gray-600 dark:text-gray-400 font-medium">{user.name.split(' ')[0]}</span>
        </p>
      </motion.div>

      <div className="flex items-center gap-1 ml-3">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 w-48 mr-1">
          <Search size={13} className="text-gray-400 flex-shrink-0" />
          <input className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 outline-none w-full" placeholder="Search..." />
        </div>

        {/* Dark mode — actually works now */}
        <button
          onClick={toggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {dark
            ? <Sun  size={16} className="text-yellow-400" />
            : <Moon size={16} className="text-gray-500"   />
          }
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(p => !p); setUserOpen(false) }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
                  <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">2 new</span>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800 max-h-64 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-colors">
                      <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', n.dot)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{n.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 text-center">
                  <button
                    onClick={() => { navigate('/activity'); setNotifOpen(false) }}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    View all activity →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => { setUserOpen(p => !p); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
          >
            <div className={cn(
              'w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0',
              roleColors[user.role] || 'from-gray-500 to-gray-700'
            )}>
              {getInitials(user.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{user.name.split(' ')[0]}</p>
            </div>
            <ChevronDown size={12} className="text-gray-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-60 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                {/* Profile info */}
                <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
                      roleColors[user.role]
                    )}>
                      {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-semibold mt-1 inline-block', roleBadge[user.role])}>
                        {roleLabel[user.role]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                  {[
                    { label: 'My Dashboard', action: () => { navigate(getDashboardRoute(user.role)); setUserOpen(false) } },
                    { label: 'Settings',     action: () => { navigate('/settings');                  setUserOpen(false) } },
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 p-1.5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
