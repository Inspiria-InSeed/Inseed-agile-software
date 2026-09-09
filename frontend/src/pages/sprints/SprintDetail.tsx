import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Target } from 'lucide-react'
import { mockSprints, mockTasks, getStatusColor, getPriorityColor, getInitials } from '@/lib/mockData'
import { cn } from '@/lib/utils'

export default function SprintDetail() {
  const { sprintId } = useParams()
  const navigate = useNavigate()
  const sprint = mockSprints.find(s => s.id === sprintId)

  if (!sprint) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Sprint not found</p>
      <button onClick={() => navigate('/sprints')} className="mt-3 text-blue-600 text-sm hover:underline">← Back to Sprints</button>
    </div>
  )

  const sprintTasks = mockTasks.filter(t => t.projectId === sprint.projectId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <button onClick={() => navigate('/sprints')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4">
          <ArrowLeft size={14} /> Back to Sprints
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{sprint.name}</h1>
              <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', getStatusColor(sprint.status))}>{sprint.status}</span>
            </div>
            <p className="text-gray-500 text-sm">{sprint.projectName}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            {sprint.startDate} → {sprint.endDate}
            {sprint.daysRemaining > 0 && (
              <span className={cn('ml-2 text-xs font-semibold px-2 py-0.5 rounded-full', sprint.daysRemaining <= 2 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600')}>
                {sprint.daysRemaining}d left
              </span>
            )}
          </div>
        </div>

        {/* Goal */}
        <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3 mb-4">
          <Target size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800 font-medium">{sprint.goal}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Sprint Progress</span>
              <span className="font-semibold text-gray-700">{sprint.progress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sprint.progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-blue-600">{sprint.completedTasks}</p>
            <p className="text-xs text-gray-500">of {sprint.totalTasks} done</p>
          </div>
        </div>
      </motion.div>

      {/* Tasks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sprint Tasks ({sprint.projectName})</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {sprintTasks.length === 0
            ? <p className="p-6 text-center text-gray-400 text-sm">No tasks in this sprint</p>
            : sprintTasks.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {t.blocked && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">BLOCKED</span>}
                    <p className="font-medium text-gray-900 text-sm">{t.title}</p>
                  </div>
                  {t.assignee && <p className="text-xs text-gray-500">→ {t.assignee.name}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', getPriorityColor(t.priority))}>{t.priority}</span>
                  <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-medium', getStatusColor(t.status))}>{t.status.replace('_',' ')}</span>
                  {t.assignee && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {getInitials(t.assignee.name)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
