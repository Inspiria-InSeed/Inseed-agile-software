import { motion } from 'framer-motion'
import { mockActivities, mockTasks, getInitials, getRelativeTime } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import { CheckCircle, Zap, PlusCircle, UserPlus, FolderPlus, AlertTriangle } from 'lucide-react'

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  task_completed:  { icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-100 dark:bg-green-900/30'  },
  sprint_started:  { icon: Zap,         color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  task_created:    { icon: PlusCircle,  color: 'text-blue-600',   bg: 'bg-blue-100 dark:bg-blue-900/30'    },
  member_added:    { icon: UserPlus,    color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  project_created: { icon: FolderPlus, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
}

// Recent blocked/at-risk items
const alertItems = [
  { id: 'a1', text: 'T006-P004: "Update the Database" is blocked',    level: 'critical' },
  { id: 'a2', text: 'P002 Sprint 2 ends in 1 day — 45% complete',     level: 'warning'  },
  { id: 'a3', text: 'T014-P004: "Defining Plots" blocked, overdue',   level: 'critical' },
  { id: 'a4', text: 'T015-P004: "Data Relationship Mapping" delayed', level: 'warning'  },
]

export default function Activity() {
  return (
    <div className="space-y-6">
      {/* Alerts */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Attention Required</h2>
        <div className="space-y-2">
          {alertItems.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                'flex items-start gap-3 p-4 rounded-xl border text-sm',
                a.level === 'critical'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              )}
            >
              <AlertTriangle size={16} className={cn('mt-0.5 flex-shrink-0', a.level === 'critical' ? 'text-red-500' : 'text-yellow-500')} />
              <p className={cn('font-medium', a.level === 'critical' ? 'text-red-800 dark:text-red-300' : 'text-yellow-800 dark:text-yellow-300')}>
                {a.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity feed */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm divide-y divide-gray-50 dark:divide-gray-800">
            {mockActivities.map((a, i) => {
              const cfg = typeConfig[a.type] ?? typeConfig.task_created
              const Icon = cfg.icon
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', cfg.bg)}>
                    <Icon size={14} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{a.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[9px] font-bold text-blue-600 dark:text-blue-400">
                        {getInitials(a.user.name)}
                      </div>
                      <p className="text-xs text-gray-400">{a.user.name} · {getRelativeTime(a.timestamp)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Recently updated tasks */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Recent Task Updates</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm divide-y divide-gray-50 dark:divide-gray-800">
            {mockTasks.slice(0, 10).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
              >
                <div className={cn('w-2 h-2 rounded-full flex-shrink-0', {
                  'bg-slate-400':  t.status === 'TODO',
                  'bg-blue-500':   t.status === 'IN_PROGRESS',
                  'bg-purple-500': t.status === 'REVIEW',
                  'bg-green-500':  t.status === 'DONE',
                })} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{t.title}</p>
                  <p className="text-xs text-gray-400 truncate">{t.projectName}</p>
                </div>
                {t.blocked && (
                  <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded flex-shrink-0">
                    BLOCKED
                  </span>
                )}
                {t.assignee && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" title={t.assignee.name}>
                    {getInitials(t.assignee.name)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
