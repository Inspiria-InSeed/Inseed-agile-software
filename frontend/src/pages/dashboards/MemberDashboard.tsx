import { motion } from 'framer-motion'
import { CheckSquare, Clock, AlertTriangle, FolderKanban } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import { mockTasks, mockProjects, mockProjectMembers, getStatusColor, getPriorityColor } from '@/lib/mockData'
import { cn } from '@/lib/utils'

// Simulate logged-in member: Biplob Sinha (M009) - in P008 and P009
const myMemberships = mockProjectMembers.filter(m => m.userId === 'M009')
const myProjectIds  = myMemberships.map(m => m.projectId)
const myProjects    = mockProjects.filter(p => myProjectIds.includes(p.id))
const myTasks       = mockTasks.filter(t => t.assignee?.id === 'M009')

const statusOrder: Record<string, number> = { IN_PROGRESS: 0, REVIEW: 1, TODO: 2, DONE: 3 }

export default function MemberDashboard() {
  const sorted = [...myTasks].sort((a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99))

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Projects"   value={myProjects.length}                           icon={FolderKanban}  color="text-blue-600"  bg="bg-blue-100"  delay={0} />
        <StatCard label="Assigned Tasks"value={myTasks.length}                              icon={CheckSquare}   color="text-indigo-600"bg="bg-indigo-100"delay={0.1} />
        <StatCard label="In Progress"   value={myTasks.filter(t=>t.status==='IN_PROGRESS').length} icon={Clock} color="text-orange-600"bg="bg-orange-100"delay={0.2} />
        <StatCard label="Blocked"       value={myTasks.filter(t=>t.blocked).length}         icon={AlertTriangle} color="text-red-600"   bg="bg-red-100"   delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
          {sorted.length === 0
            ? <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                <CheckSquare size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tasks assigned yet</p>
              </div>
            : <div className="space-y-3">
                {sorted.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{t.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.projectName}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(t.status))}>{t.status.replace('_',' ')}</span>
                          <span className={cn('text-xs px-2 py-0.5 rounded font-medium', getPriorityColor(t.priority))}>{t.priority}</span>
                          {t.blocked && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">BLOCKED</span>}
                        </div>
                      </div>
                      {t.dueDate && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-400">Due</p>
                          <p className="text-xs font-medium text-gray-700">{t.dueDate}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
          }
        </div>

        {/* My Projects */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">My Projects</h2>
          <div className="space-y-3">
            {myProjects.map((p, i) => {
              const membership = myMemberships.find(m => m.projectId === p.id)
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', membership?.role === 'TEAM_LEAD' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600')}>
                      {membership?.role?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ delay: i * 0.1 + 0.4, duration: 0.7 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{p.currentSprint?.name ?? 'No active sprint'}</span>
                    <span className="font-medium text-gray-700">{p.progress}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
