import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext'
import { useDarkMode } from '@/hooks/useDarkMode'

const pageTitles: Record<string, string> = {
  '/dashboard/admin':       'Admin Dashboard',
  '/dashboard/team-lead':   'Team Lead Dashboard',
  '/dashboard/member':      'My Dashboard',
  '/dashboard/coordinator': 'Agile Coordinator',
  '/projects':              'Projects',
  '/tasks':                 'Task Board',
  '/sprints':               'Sprint Management',
  '/team':                  'Team Members',
  '/settings':              'Settings',
  '/reports':               'Reports',
  '/activity':              'Activity Feed',
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-48">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="w-9 h-9 border-2 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  )
}

export default function AppLayout() {
  const { user } = useAuth()
  const location = useLocation()
  const { dark, toggle } = useDarkMode()

  // Redirect /dashboard to role-appropriate dashboard
  if (location.pathname === '/dashboard' && user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />
  }

  const title = pageTitles[location.pathname] ??
    Object.entries(pageTitles).find(([k]) => k.length > 1 && location.pathname.startsWith(k))?.[1] ??
    'INSEED'

  if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar user={user} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header user={user} title={title} dark={dark} toggleDark={toggle} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
