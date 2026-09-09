import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { mockUsers, mockProjectMembers, mockProjects, getInitials } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const roleColors: Record<string, string> = {
  ADMIN:             'bg-purple-100 text-purple-700',
  AGILE_COORDINATOR: 'bg-blue-100 text-blue-700',
  TEAM_LEAD:         'bg-indigo-100 text-indigo-700',
  MEMBER:            'bg-gray-100 text-gray-700',
}

const roleAvatarColors: Record<string, string> = {
  ADMIN:             'from-purple-500 to-indigo-600',
  AGILE_COORDINATOR: 'from-blue-500 to-cyan-600',
  TEAM_LEAD:         'from-indigo-500 to-blue-600',
  MEMBER:            'from-emerald-400 to-teal-600',
}

export default function TeamMembers() {
  const [search, setSearch] = useState('')

  const filtered = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  // Get user's projects
  const getUserProjects = (userId: string) =>
    mockProjectMembers
      .filter(m => m.userId === userId)
      .map(m => mockProjects.find(p => p.id === m.projectId))
      .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: mockUsers.filter(u => u.role !== 'ADMIN').length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Team Leads',    value: mockUsers.filter(u => u.role === 'TEAM_LEAD').length, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Developers',    value: mockUsers.filter(u => u.role === 'MEMBER').length, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Admins',        value: mockUsers.filter(u => u.role === 'ADMIN').length, color: 'text-purple-600 bg-purple-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={cn('text-3xl font-black', s.color.split(' ')[0])}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-md shadow-sm">
        <Search size={15} className="text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400" />
      </div>

      <p className="text-sm text-gray-500">{filtered.length} member{filtered.length !== 1 ? 's' : ''}</p>

      {/* Member Cards */}
      <motion.div
        initial="hidden" animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map(user => {
          const projects = getUserProjects(user.id)
          return (
            <motion.div
              key={user.id}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center"
            >
              <div className={cn('w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg mb-3 shadow-md', roleAvatarColors[user.role] || 'from-gray-400 to-gray-600')}>
                {getInitials(user.name)}
              </div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">{user.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate w-full">{user.email}</p>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium mt-2', roleColors[user.role])}>
                {user.role.replace('_', ' ')}
              </span>
              {projects.length > 0 && (
                <div className="mt-3 w-full">
                  <p className="text-xs text-gray-400 mb-1.5">Projects</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {projects.slice(0, 3).map(p => (
                      <span key={p!.id} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono">{p!.id}</span>
                    ))}
                    {projects.length > 3 && <span className="text-xs text-gray-400">+{projects.length - 3}</span>}
                  </div>
                </div>
              )}
              <div className={cn('mt-2 w-2 h-2 rounded-full', user.accountStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400')} title={user.accountStatus} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
