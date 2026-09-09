import { motion } from 'framer-motion'
import { FolderKanban, Users, CheckSquare, AlertTriangle, Zap, Activity, TrendingUp, Clock } from 'lucide-react'
import StatCard from '@/components/shared/StatCard'
import ProjectCard from '@/components/shared/ProjectCard'
import { mockProjects, mockActivities, orgStats, getRelativeTime, getInitials } from '@/lib/mockData'

const activityIcons: Record<string, string> = {
  task_completed:  '✅',
  sprint_started:  '🚀',
  task_created:    '📝',
  member_added:    '👤',
  project_created: '📁',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="col-span-2"><StatCard label="Total Projects"     value={orgStats.totalProjects}     icon={FolderKanban}  color="text-blue-600"   bg="bg-blue-100"   delay={0.0} /></div>
        <div className="col-span-2"><StatCard label="Active Projects"    value={orgStats.activeProjects}    icon={TrendingUp}    color="text-indigo-600" bg="bg-indigo-100" delay={0.1} /></div>
        <div className="col-span-2"><StatCard label="Total Members"      value={orgStats.totalMembers}      icon={Users}         color="text-purple-600" bg="bg-purple-100" delay={0.2} /></div>
        <div className="col-span-2"><StatCard label="Active Sprints"     value={orgStats.activeSprints}     icon={Zap}           color="text-yellow-600" bg="bg-yellow-100" delay={0.3} /></div>
        <div className="col-span-2"><StatCard label="Open Tasks"         value={orgStats.openTasks}         icon={Clock}         color="text-cyan-600"   bg="bg-cyan-100"   delay={0.4} /></div>
        <div className="col-span-2"><StatCard label="Completed Tasks"    value={orgStats.completedTasks}    icon={CheckSquare}   color="text-green-600"  bg="bg-green-100"  delay={0.5} /></div>
        <div className="col-span-2"><StatCard label="Blocked Tasks"      value={orgStats.blockedTasks}      icon={AlertTriangle} color="text-red-600"    bg="bg-red-100"    delay={0.6} /></div>
        <div className="col-span-2"><StatCard label="Completed Projects" value={orgStats.completedProjects} icon={Activity}      color="text-emerald-600"bg="bg-emerald-100"delay={0.7} /></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Projects</h2>
            <span className="text-sm text-gray-500">{orgStats.totalProjects} total</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {mockProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.05} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {mockActivities.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 flex-shrink-0">
                    {getInitials(a.user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 leading-snug">
                      <span className="mr-1">{activityIcons[a.type]}</span>
                      {a.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{a.user.name} · {getRelativeTime(a.timestamp)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Management Dashboard Quick Stats (from Excel) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Organisation Health</h3>
            <div className="space-y-3">
              {[
                { label: 'In Progress', count: 9, color: 'bg-blue-500' },
                { label: 'Planning',    count: 0, color: 'bg-purple-500' },
                { label: 'Completed',   count: 0, color: 'bg-green-500' },
                { label: 'Critical',    count: 5, color: 'bg-red-500' },
                { label: 'At Risk',     count: 0, color: 'bg-yellow-500' },
                { label: 'Healthy',     count: 0, color: 'bg-emerald-500' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  <span className="text-sm text-gray-600 flex-1">{s.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
