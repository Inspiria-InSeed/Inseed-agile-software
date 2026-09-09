import { motion } from 'framer-motion'
import { AlertTriangle, Zap, Clock, Eye } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import ProjectCard from '@/components/shared/ProjectCard'
import { mockProjects, mockTasks, mockSprints, getStatusColor, getPriorityColor } from '@/lib/mockData'
import { cn } from '@/lib/utils'

// Simulating team lead of P001 and P004
const myProjects = mockProjects.filter(p => ['P001', 'P004'].includes(p.id))
const myTasks    = mockTasks.filter(t => ['P001', 'P004'].includes(t.projectId))
const mySprints  = mockSprints.filter(s => ['P001', 'P004'].includes(s.projectId) && s.status === 'active')

export default function TeamLeadDashboard() {
  const blockedTasks = myTasks.filter(t => t.blocked)
  const openTasks    = myTasks.filter(t => t.status !== 'DONE')

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Projects"    value={myProjects.length} icon={Eye}           color="text-blue-600"   bg="bg-blue-100"   delay={0.0} />
        <StatCard label="Open Tasks"     value={openTasks.length}  icon={Clock}         color="text-orange-600" bg="bg-orange-100" delay={0.1} />
        <StatCard label="Blocked Tasks"  value={blockedTasks.length}icon={AlertTriangle} color="text-red-600"    bg="bg-red-100"    delay={0.2} />
        <StatCard label="Active Sprints" value={mySprints.length}  icon={Zap}           color="text-purple-600" bg="bg-purple-100" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Projects */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">My Projects</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {myProjects.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.1} />)}
          </div>

          {/* Sprint Progress */}
          <h2 className="text-lg font-semibold text-gray-900 pt-2">Active Sprints</h2>
          <div className="space-y-3">
            {mySprints.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{s.name}</h3>
                    <p className="text-xs text-gray-500">{s.projectName} · {s.goal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{s.progress}%</p>
                    <p className="text-xs text-gray-400">{s.daysRemaining}d left</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ delay: i * 0.1 + 0.4, duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{s.completedTasks} / {s.totalTasks} tasks done</span>
                  <span>{s.startDate} → {s.endDate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tasks needing attention */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Needs Attention</h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {blockedTasks.length === 0
              ? <p className="p-4 text-sm text-gray-400 text-center">No blocked tasks 🎉</p>
              : blockedTasks.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t.title}</p>
                      <p className="text-xs text-gray-500">{t.projectName}</p>
                      <div className="flex gap-2 mt-1">
                        <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', getPriorityColor(t.priority))}>{t.priority}</span>
                        <span className="text-xs text-red-500 font-medium">BLOCKED</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Recent Tasks</h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {myTasks.slice(0, 6).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-3">
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getStatusColor(t.status))}>{t.status.replace('_', ' ')}</span>
                  <p className="text-sm text-gray-700 truncate flex-1">{t.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
