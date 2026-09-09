import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'
import { mockUsers } from '@/lib/mockData'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginAsDemo: (userId: string) => void
  logout: () => void
  updateUser: (updates: Partial<Pick<User, 'name'>>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const SESSION_KEY = 'inseed_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem(SESSION_KEY) }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800))

    // Find user in mock data by email
    const found = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) return { success: false, error: 'No account found with this email address.' }
    if (found.accountStatus === 'suspended') return { success: false, error: 'Your account has been suspended. Contact an administrator.' }
    if (found.accountStatus === 'pending') return { success: false, error: 'Your account is pending approval. Contact an administrator.' }

    setUser(found)
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
    return { success: true }
  }

  const loginAsDemo = (userId: string) => {
    const found = mockUsers.find(u => u.id === userId)
    if (!found) return
    setUser(found)
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  const updateUser = (updates: Partial<Pick<User, 'name'>>) => {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginAsDemo, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

// Helper: get the correct dashboard route for a role
export function getDashboardRoute(role: string): string {
  switch (role) {
    case 'ADMIN':             return '/dashboard/admin'
    case 'AGILE_COORDINATOR': return '/dashboard/coordinator'
    case 'TEAM_LEAD':         return '/dashboard/team-lead'
    default:                  return '/dashboard/member'
  }
}
