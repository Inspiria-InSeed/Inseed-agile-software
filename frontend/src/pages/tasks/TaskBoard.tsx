import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Calendar, ChevronDown } from 'lucide-react'
import { mockTasks, mockProjects, getInitials } from '@/lib/mockData'
import type { TaskStatus } from '@/types'
import { cn } from '@/lib/utils'

const columns: { status: TaskStatus; label: string; headerColor: string; bg: string; border: string }[] = [
  { status: 'TODO',        label: 'To Do',      headerColor: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900/40',   border: 'border-slate-200 dark:border-slate-700'  },
  { status: 'IN_PROGRESS', label: 'In Progress', headerColor: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20',      border: 'border-blue-200 dark:border-blue-800'    },
  { status: 'REVIEW',      label: 'In Review',   headerColor: 'text-purple-600 dark:text-purple-400',bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
  { status: 'DONE',        label: 'Done',        headerColor: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20',   border: 'border-green-200 dark:border-green-800'  },
]

const priorityDot: Record<string, string> = {
  URGENT: 'bg-red-500', HIGH: 'bg-orange-500', MEDIUM: 'bg-yellow-500', LOW: 'bg-green-500'
}

export default function TaskBoard() {
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [dropOpen, setDropOpen]               = useState(false)

  const filteredTasks = selectedProject === 'all'
    ? mockTasks
    : mockTasks.filter(t => t.projectId === selectedProject)

  const selectedProjectName = selectedProject === 'all'
    ? 'All Projects'
    : mockProjects.find(p => p.id === selectedProject)?.name ?? selectedProject

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Project picker */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(p => !p)}
            className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:border-blue-400 transition-colors"
          >
            <span className="max-w-40 truncate">{selectedProjectName}</span>
            <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
          </button>

          {dropOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 top-11 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden"
            >
              {[{ id: 'all', name: 'All Projects' }, ...mockProjects].map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProject(p.id); setDropOpen(false) }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between',
                    selectedProject === p.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  <span className="truncate">{p.name}</span>
                  {p.id !== 'all' && (
                    <span className="text-xs text-gray-400 font-mono ml-2 flex-shrink-0">{p.id}</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Summary pills */}
        <div className="flex items-center gap-2">
          {columns.map(c => (
            <span key={c.status} className={cn('text-xs px-2.5 py-1 rounded-full font-medium', c.bg, c.headerColor, 'border', c.border)}>
              {filteredTasks.filter(t => t.status === c.status).length} {c.label}
            </span>
          ))}
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.status)
          return (
            <div key={col.status} className={cn('rounded-xl p-3 border', col.bg, col.border, 'min-h-[420px]')}>
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn('w-2 h-2 rounded-full', {
                    'bg-slate-400': col.status === 'TODO',
                    'bg-blue-500':  col.status === 'IN_PROGRESS',
                    'bg-purple-500':col.status === 'REVIEW',
                    'bg-green-500': col.status === 'DONE',
                  })} />
                  <h3 className={cn('font-semibold text-sm', col.headerColor)}>{col.label}</h3>
                </div>
                <span className="text-xs font-bold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {colTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -2, shadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    className="bg-white dark:bg-gray-900 rounded-xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                  >
                    {/* Blocked badge */}
                    {task.blocked && (
                      <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md px-2 py-1 mb-2 font-semibold">
                        <AlertTriangle size={11} /> BLOCKED
                      </div>
                    )}

                    {/* Title */}
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1.5">{task.title}</p>

                    {/* Project name */}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 truncate">{task.projectName}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className={cn('w-2 h-2 rounded-full flex-shrink-0', priorityDot[task.priority])} />
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{task.priority}</span>
                      </div>
                      {task.assignee ? (
                        <div
                          title={task.assignee.name}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        >
                          {getInitials(task.assignee.name)}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-[10px] flex-shrink-0">?</div>
                      )}
                    </div>

                    {/* Due date */}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
                        <Calendar size={10} className="text-gray-400 flex-shrink-0" />
                        <span className="text-[10px] text-gray-400">{task.dueDate}</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {colTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-2">
                      <div className={cn('w-3 h-3 rounded-full opacity-40', {
                        'bg-slate-400': col.status === 'TODO',
                        'bg-blue-500':  col.status === 'IN_PROGRESS',
                        'bg-purple-500':col.status === 'REVIEW',
                        'bg-green-500': col.status === 'DONE',
                      })} />
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-600">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
