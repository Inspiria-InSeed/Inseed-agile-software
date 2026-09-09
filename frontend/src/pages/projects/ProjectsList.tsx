import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import ProjectCard from '@/components/shared/ProjectCard'
import { mockProjects } from '@/lib/mockData'
import type { ProjectStatus } from '@/types'

const filters: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All',       value: 'all'      },
  { label: 'Active',    value: 'active'   },
  { label: 'On Hold',   value: 'on_hold'  },
  { label: 'Completed', value: 'completed'},
]

export default function ProjectsList() {
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState<ProjectStatus | 'all'>('all')

  const filtered = mockProjects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'all' || p.status === status
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-md shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2 shadow-sm">
          <Filter size={14} className="text-gray-400 ml-1" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all my-1 ${
                status === f.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length === 0
        ? <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects match your search</p>
          </div>
        : <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 0.04} />)}
          </motion.div>
      }
    </div>
  )
}
