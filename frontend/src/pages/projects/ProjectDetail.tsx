import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, CheckSquare, AlertTriangle, Zap } from 'lucide-react'
import { getProjectById, getTasksForProject, getMembersForProject, getSprintsForProject, getStatusColor, getPriorityColor, getInitials, getProjectHealth } from '@/lib/mockData'
import { cn } from '@/lib/utils'

const tabs = ['Overview', 'Tasks', 'Team', 'Sprints']

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Overview')

  const project = getProjectById(projectId ?? '')
  if (!project) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Project not found</p>
      <button onClick={() => navigate('/projects')} className="mt-4 text-blue-600 text-sm hover:underline">← Back to Projects</button>
    </div>
  )

  const tasks   = getTasksForProject(project.id)
  const members = getMembersForProject(project.id)
  const sprints = getSprintsForProject(project.id)
  const health  = getProjectHealth(project)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <button onClick={() => navigate('/projects')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to Projects
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', getStatusColor(project.status))}>
                {project.status.replace('_', ' ')}
              </span>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', health.bg, health.color)}>
                {health.label}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{project.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center flex-shrink-0">
            {[
              { label: 'Members',  value: project.memberCount,    icon: Users, color: 'text-blue-600' },
              { label: 'Tasks',    value: `${project.completedTasks}/${project.taskCount}`, icon: CheckSquare, color: 'text-green-600' },
              { label: 'Blocked',  value: project.blockedTasks,   icon: AlertTriangle, color: 'text-red-600' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-3">
                <s.icon size={16} className={cn('mx-auto mb-1', s.color)} />
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Overall Progress</span>
            <span className="font-semibold text-gray-700">{project.progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 border-b border-gray-100">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px',
              tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            )}>{t}</button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {tab === 'Overview' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Zap size={16} className="text-purple-500" />Current Sprint</h3>
            {project.currentSprint
              ? <>
                  <p className="text-lg font-bold text-gray-900">{project.currentSprint.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{project.currentSprint.goal}</p>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${project.currentSprint.progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{project.currentSprint.progress}% complete · {project.currentSprint.daysRemaining}d remaining</p>
                </>
              : <p className="text-gray-400 text-sm">No active sprint</p>
            }
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Users size={16} className="text-blue-500" />Team Lead</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{getInitials(project.teamLead.name)}</div>
              <div>
                <p className="font-medium text-gray-900">{project.teamLead.name}</p>
                <p className="text-xs text-gray-500">{project.teamLead.email}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Task Breakdown</h3>
            <div className="space-y-2">
              {[['TODO', tasks.filter(t=>t.status==='TODO').length],['In Progress',tasks.filter(t=>t.status==='IN_PROGRESS').length],['Review',tasks.filter(t=>t.status==='REVIEW').length],['Done',tasks.filter(t=>t.status==='DONE').length]].map(([l,v])=>(
                <div key={String(l)} className="flex justify-between text-sm">
                  <span className="text-gray-600">{l}</span>
                  <span className="font-semibold text-gray-900">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Tasks' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {tasks.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{t.title}</p>
                {t.assignee && <p className="text-xs text-gray-500 mt-0.5">→ {t.assignee.name}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {t.blocked && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">BLOCKED</span>}
                <span className={cn('text-xs px-2 py-0.5 rounded font-medium', getPriorityColor(t.priority))}>{t.priority}</span>
                <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-medium', getStatusColor(t.status))}>{t.status.replace('_',' ')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'Team' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m, i) => (
            <motion.div key={m.userId} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {getInitials(m.user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{m.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{m.user.email}</p>
              </div>
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0', m.role === 'TEAM_LEAD' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600')}>
                {m.role.replace('_', ' ')}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 'Sprints' && (
        <div className="space-y-4">
          {sprints.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{s.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{s.goal}</p>
                </div>
                <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', getStatusColor(s.status))}>{s.status}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ delay: i * 0.08 + 0.3, duration: 0.7 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{s.completedTasks}/{s.totalTasks} tasks · {s.startDate} → {s.endDate}</span>
                <span className="font-semibold text-gray-700">{s.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
