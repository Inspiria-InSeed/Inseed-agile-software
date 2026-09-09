import { Navigate } from 'react-router-dom'
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext'

export default function DashboardRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getDashboardRoute(user.role)} replace />
}
