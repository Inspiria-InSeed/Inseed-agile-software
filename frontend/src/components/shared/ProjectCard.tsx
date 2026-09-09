import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Users, CheckSquare, AlertTriangle, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getInitials, getProjectHealth, getStatusColor } from '@/lib/mockData'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  delay?: number
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const navigate = useNavigate()
  const health = getProjectHealth(project)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{project.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', getStatusColor(project.status))}>
            {project.status.replace('_', ' ')}
          </span>
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', health.bg, health.color)}>
            {health.label}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-gray-700">{project.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', project.progress >= 70 ? 'bg-green-500' : project.progress >= 40 ? 'bg-blue-500' : 'bg-orange-500')}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
            {getInitials(project.teamLead.name)}
          </div>
          <span className="truncate max-w-20">{project.teamLead.name.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Users size={12} />{project.memberCount}</span>
          <span className="flex items-center gap-1"><CheckSquare size={12} />{project.completedTasks}/{project.taskCount}</span>
          {project.blockedTasks > 0 && (
            <span className="flex items-center gap-1 text-red-500"><AlertTriangle size={12} />{project.blockedTasks}</span>
          )}
          {project.currentSprint && (
            <span className="flex items-center gap-1 text-purple-500"><Zap size={12} />{project.currentSprint.name}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
