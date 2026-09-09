import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from '../App'
import AppLayout from '../components/layout/AppLayout'
import RequireAuth from '../components/layout/RequireAuth'
import DashboardRedirect from '../components/layout/DashboardRedirect'

// Lazy pages
const Landing              = lazy(() => import('../pages/Landing'))
const Login                = lazy(() => import('../pages/Login'))
const AdminDashboard       = lazy(() => import('../pages/dashboards/AdminDashboard'))
const TeamLeadDashboard    = lazy(() => import('../pages/dashboards/TeamLeadDashboard'))
const MemberDashboard      = lazy(() => import('../pages/dashboards/MemberDashboard'))
const CoordinatorDashboard = lazy(() => import('../pages/dashboards/CoordinatorDashboard'))
const ProjectsList         = lazy(() => import('../pages/projects/ProjectsList'))
const ProjectDetail        = lazy(() => import('../pages/projects/ProjectDetail'))
const TaskBoard            = lazy(() => import('../pages/tasks/TaskBoard'))
const SprintsList          = lazy(() => import('../pages/sprints/SprintsList'))
const SprintDetail         = lazy(() => import('../pages/sprints/SprintDetail'))
const TeamMembers          = lazy(() => import('../pages/team/TeamMembers'))
const Reports              = lazy(() => import('../pages/Reports'))
const Activity             = lazy(() => import('../pages/Activity'))
const Settings             = lazy(() => import('../pages/Settings'))
const NotFound             = lazy(() => import('../pages/NotFound'))

function Spin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function W({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Spin />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      { index: true,         element: <W><Landing /></W>  },
      { path: 'login',       element: <W><Login /></W>    },

      // Protected routes — guarded by RequireAuth
      {
        element: (
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        ),
        children: [
          { path: 'dashboard',             element: <DashboardRedirect />           },
          { path: 'dashboard/admin',       element: <W><AdminDashboard /></W>       },
          { path: 'dashboard/team-lead',   element: <W><TeamLeadDashboard /></W>    },
          { path: 'dashboard/member',      element: <W><MemberDashboard /></W>      },
          { path: 'dashboard/coordinator', element: <W><CoordinatorDashboard /></W> },
          { path: 'projects',              element: <W><ProjectsList /></W>         },
          { path: 'projects/:projectId',   element: <W><ProjectDetail /></W>        },
          { path: 'tasks',                 element: <W><TaskBoard /></W>            },
          { path: 'sprints',               element: <W><SprintsList /></W>          },
          { path: 'sprints/:sprintId',     element: <W><SprintDetail /></W>         },
          { path: 'team',                  element: <W><TeamMembers /></W>          },
          { path: 'reports',               element: <W><Reports /></W>              },
          { path: 'activity',              element: <W><Activity /></W>             },
          { path: 'settings',              element: <W><Settings /></W>             },
          { path: '*',                     element: <W><NotFound /></W>             },
        ],
      },
    ],
  },
])
