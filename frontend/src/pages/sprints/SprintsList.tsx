import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Calendar, CheckSquare } from 'lucide-react'
import { mockSprints, getStatusColor } from '@/lib/mockData'
import type { SprintStatus } from '@/types'
import { cn } from '@/lib/utils'

const tabs: { label: string; value: SprintStatus | 'all' }[] = [
  { label: 'All',       value: 'all'       },
  { label: 'Active',    value: 'active'    },
  { label: 'Planning',  value: 'planning'  },
  { label: 'Completed', value: 'completed' },
]

export default function SprintsList() {
  const [filter, setFilter] = useState<SprintStatus | 'all'>('all')
  const navigate = useNavigate()

  const filtered = filter === 'all' ? mockSprints : mockSprints.filter(s => s.status === filter)

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 w-fit shadow-sm">
        {tabs.map(t => (
          <button key={t.value} onClick={() => setFilter(t.value)} className={cn('px-4 py-1.5 rounded-md text-sm font-medium transition-all', filter === t.value ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800')}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Sprints Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
            onClick={() => navigate(`/sprints/${s.id}`)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-lg"><Zap size={14} className="text-purple-600" /></div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.projectName}</p>
                </div>
              </div>
              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', getStatusColor(s.status))}>{s.status}</span>
            </div>

            <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">🎯 {s.goal}</p>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span className="flex items-center gap-1"><CheckSquare size={11} />{s.completedTasks}/{s.totalTasks} tasks</span>
                <span className="font-semibold text-gray-700">{s.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.progress}%` }}
                  transition={{ delay: i * 0.06 + 0.3, duration: 0.7 }}
                  className={cn('h-full rounded-full', s.status === 'completed' ? 'bg-green-500' : s.progress >= 70 ? 'bg-blue-500' : 'bg-indigo-500')}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1"><Calendar size={10} />{s.startDate}</span>
              <span>→</span>
              <span className="flex items-center gap-1">{s.endDate}<Calendar size={10} /></span>
            </div>
            {s.status === 'active' && s.daysRemaining > 0 && (
              <p className={cn('text-xs font-medium mt-2 text-center', s.daysRemaining <= 2 ? 'text-red-500' : 'text-gray-500')}>
                {s.daysRemaining} day{s.daysRemaining !== 1 ? 's' : ''} remaining
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
