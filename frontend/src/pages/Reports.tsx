import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, AlertTriangle, CheckSquare, Users, Zap } from 'lucide-react'
import { mockProjects, mockSprints, mockTasks, getProjectHealth, orgStats } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

export default function Reports() {
  const blocked   = mockTasks.filter(t => t.blocked)
  const done      = mockTasks.filter(t => t.status === 'DONE')
  const inProg    = mockTasks.filter(t => t.status === 'IN_PROGRESS')
  const review    = mockTasks.filter(t => t.status === 'REVIEW')
  const todo      = mockTasks.filter(t => t.status === 'TODO')
  const activeSpr = mockSprints.filter(s => s.status === 'active')

  return (
    <div className="space-y-8">
      {/* Overview */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Organisation Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total Projects',  value: orgStats.totalProjects,     icon: BarChart3,    color: 'text-blue-600',    bg: 'bg-blue-100 dark:bg-blue-900/30'   },
            { label: 'Total Members',   value: orgStats.totalMembers,      icon: Users,        color: 'text-purple-600',  bg: 'bg-purple-100 dark:bg-purple-900/30'},
            { label: 'Active Sprints',  value: orgStats.activeSprints,     icon: Zap,          color: 'text-yellow-600',  bg: 'bg-yellow-100 dark:bg-yellow-900/30'},
            { label: 'Completed Tasks', value: orgStats.completedTasks,    icon: CheckSquare,  color: 'text-green-600',   bg: 'bg-green-100 dark:bg-green-900/30'  },
            { label: 'Open Tasks',      value: orgStats.openTasks,         icon: TrendingUp,   color: 'text-indigo-600',  bg: 'bg-indigo-100 dark:bg-indigo-900/30'},
            { label: 'Blocked Tasks',   value: orgStats.blockedTasks,      icon: AlertTriangle,color: 'text-red-600',     bg: 'bg-red-100 dark:bg-red-900/30'      },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.label} {...fadeUp(i * 0.06)} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', s.bg)}>
                  <Icon size={18} className={s.color} />
                </div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Task status breakdown */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Task Status Breakdown</h2>
        <motion.div {...fadeUp(0.1)} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="space-y-4">
            {[
              { label: 'Done',        count: done.length,   color: 'bg-green-500',  pct: Math.round(done.length  / mockTasks.length * 100) },
              { label: 'In Progress', count: inProg.length, color: 'bg-blue-500',   pct: Math.round(inProg.length/ mockTasks.length * 100) },
              { label: 'In Review',   count: review.length, color: 'bg-purple-500', pct: Math.round(review.length/ mockTasks.length * 100) },
              { label: 'To Do',       count: todo.length,   color: 'bg-slate-400',  pct: Math.round(todo.length  / mockTasks.length * 100) },
              { label: 'Blocked',     count: blocked.length,color: 'bg-red-500',    pct: Math.round(blocked.length/mockTasks.length* 100) },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2.5 h-2.5 rounded-full', row.color)} />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400">{row.count} tasks</span>
                    <span className="font-bold text-gray-900 dark:text-white w-10 text-right">{row.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: 'easeOut' }}
                    className={cn('h-full rounded-full', row.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project health table */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Health Report</h2>
        <motion.div {...fadeUp(0.15)} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  {['Project', 'Status', 'Progress', 'Members', 'Tasks', 'Blocked', 'Sprint', 'Health'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {mockProjects.map((p, i) => {
                  const health = getProjectHealth(p)
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                          <p className="text-xs text-gray-400 font-mono">{p.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold capitalize px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{p.memberCount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{p.completedTasks}/{p.taskCount}</td>
                      <td className="px-4 py-3">
                        {p.blockedTasks > 0
                          ? <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">{p.blockedTasks} blocked</span>
                          : <span className="text-xs text-gray-400">None</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{p.currentSprint?.name ?? '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className={cn('w-2 h-2 rounded-full', health.dot)} />
                          <span className={cn('text-xs font-semibold', health.color)}>{health.label}</span>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Sprint performance */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sprint Performance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSpr.map((s, i) => (
            <motion.div key={s.id} {...fadeUp(i * 0.07)} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.projectName}</p>
                </div>
                <span className="text-xl font-black text-blue-600">{s.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.progress}%` }}
                  transition={{ delay: i * 0.07 + 0.4, duration: 0.7 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{s.completedTasks}/{s.totalTasks} tasks done</span>
                <span className={s.daysRemaining <= 2 ? 'text-red-500 font-semibold' : ''}>{s.daysRemaining}d left</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
