import { motion } from 'framer-motion'
import { Zap, AlertTriangle, Clock, TrendingUp } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import { mockSprints, mockTasks, mockProjects, orgStats, getProjectHealth } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const activeSprints = mockSprints.filter(s => s.status === 'active')
const blockedTasks  = mockTasks.filter(t => t.blocked)

export default function CoordinatorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Sprints"  value={activeSprints.length}  icon={Zap}           color="text-blue-600"   bg="bg-blue-100"   delay={0.0} />
        <StatCard label="Blocked Tasks"   value={blockedTasks.length}   icon={AlertTriangle} color="text-red-600"    bg="bg-red-100"    delay={0.1} />
        <StatCard label="Active Projects" value={orgStats.activeProjects}icon={TrendingUp}    color="text-indigo-600" bg="bg-indigo-100" delay={0.2} />
        <StatCard label="Open Tasks"      value={orgStats.openTasks}    icon={Clock}         color="text-orange-600" bg="bg-orange-100" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Sprints - sorted by days remaining */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Sprints — All Projects</h2>
          <div className="space-y-3">
            {[...activeSprints].sort((a, b) => a.daysRemaining - b.daysRemaining).map((s, i) => {
              const urgent = s.daysRemaining <= 2
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn('bg-white rounded-xl border shadow-sm p-5', urgent ? 'border-red-200' : 'border-gray-100')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{s.name}</h3>
                        {urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Ending Soon</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{s.projectName} · {s.goal}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn('text-xl font-bold', urgent ? 'text-red-600' : 'text-blue-600')}>{s.progress}%</p>
                      <p className="text-xs text-gray-400">{s.daysRemaining}d left</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ delay: i * 0.07 + 0.3, duration: 0.7 }}
                      className={cn('h-full rounded-full', urgent ? 'bg-gradient-to-r from-red-500 to-orange-500' : s.progress >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500')}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{s.completedTasks}/{s.totalTasks} tasks</span>
                    <span>{s.endDate}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Attention & Project Health */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Blocked Tasks</h2>
          <div className="bg-white rounded-xl border border-red-100 shadow-sm divide-y divide-gray-50">
            {blockedTasks.length === 0
              ? <p className="p-4 text-sm text-gray-400 text-center">All clear! 🎉</p>
              : blockedTasks.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.title}</p>
                      <p className="text-xs text-gray-500">{t.projectName}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>

          <h2 className="text-lg font-semibold text-gray-900">Project Health</h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {mockProjects.map((p, i) => {
              const h = getProjectHealth(p)
              return (
                <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="p-3 flex items-center gap-3">
                  <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', h.dot)} />
                  <p className="text-sm text-gray-700 flex-1 truncate">{p.name}</p>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-700">{p.progress}%</p>
                    <p className={cn('text-xs font-medium', h.color)}>{h.label}</p>
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
