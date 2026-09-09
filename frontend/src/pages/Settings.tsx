import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Palette, Shield, Save, Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getInitials } from '@/lib/mockData'
import { useDarkMode } from '@/hooks/useDarkMode'
import { cn } from '@/lib/utils'

const roleColors: Record<string, string> = {
  ADMIN:             'from-purple-500 to-indigo-600',
  AGILE_COORDINATOR: 'from-blue-500 to-cyan-600',
  TEAM_LEAD:         'from-indigo-500 to-blue-600',
  MEMBER:            'from-emerald-500 to-teal-600',
}

const roleLabel: Record<string, string> = {
  ADMIN: 'Admin', AGILE_COORDINATOR: 'Agile Coordinator', TEAM_LEAD: 'Team Lead', MEMBER: 'Member'
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Icon size={16} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  )
}

function Toggle({ checked, onChange, label, desc }: { checked: boolean; onChange: () => void; label: string; desc: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          'relative w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0',
          checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
        )}
        role="switch"
        aria-checked={checked}
      >
        <span className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
          checked ? 'translate-x-4' : 'translate-x-0'
        )} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { user, updateUser } = useAuth()
  const { dark, toggle } = useDarkMode()

  const [notifs, setNotifs] = useState({ tasks: true, sprints: true, projects: true, mentions: false })
  const [saved, setSaved]   = useState(false)
  const [name, setName]     = useState(user?.name ?? '')

  const handleSave = () => {
    const trimmed = name.trim()
    if (trimmed && trimmed !== user?.name) {
      updateUser({ name: trimmed })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!user) return null

  return (
    <div className="max-w-2xl space-y-5">
      {/* Profile */}
      <Section title="Profile" icon={User}>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className={cn(
            'w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xl font-black shadow-lg flex-shrink-0',
            roleColors[user.role]
          )}>
            {getInitials(user.name)}
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-base">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2.5 py-1 rounded-full mt-2 inline-block">
              {roleLabel[user.role]}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Email Address</label>
            <input
              value={user.email}
              disabled
              className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-500 dark:text-gray-500 rounded-xl px-4 py-2.5 text-sm cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email is managed through Supabase Auth</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
              saved
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
            )}
          >
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </motion.button>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={Bell}>
        <Toggle checked={notifs.tasks}    onChange={() => setNotifs(n => ({ ...n, tasks:    !n.tasks    }))} label="Task assignments"  desc="When you are assigned to a task"           />
        <Toggle checked={notifs.sprints}  onChange={() => setNotifs(n => ({ ...n, sprints:  !n.sprints  }))} label="Sprint updates"    desc="Sprint start, end, and reminders"          />
        <Toggle checked={notifs.projects} onChange={() => setNotifs(n => ({ ...n, projects: !n.projects }))} label="Project updates"   desc="Changes to projects you belong to"         />
        <Toggle checked={notifs.mentions} onChange={() => setNotifs(n => ({ ...n, mentions: !n.mentions }))} label="Mention alerts"    desc="When someone mentions you in a comment"    />
      </Section>

      {/* Appearance */}
      <Section title="Appearance" icon={Palette}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Choose how INSEED looks on this device.</p>
        <div className="flex gap-3">
          {[
            { label: 'Light',  active: !dark, action: () => { if (dark)  toggle() } },
            { label: 'Dark',   active: dark,  action: () => { if (!dark) toggle() } },
          ].map(t => (
            <button
              key={t.label}
              onClick={t.action}
              className={cn(
                'flex-1 py-3 rounded-xl border text-sm font-semibold transition-all',
                t.active
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Security info */}
      <Section title="Security" icon={Shield}>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Managed by Supabase Auth</p>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold px-2.5 py-1 rounded-full">Active</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Role</p>
              <p className="text-xs text-gray-500 mt-0.5">Your organisation role</p>
            </div>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold px-2.5 py-1 rounded-full">
              {roleLabel[user.role]}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Account Status</p>
              <p className="text-xs text-gray-500 mt-0.5">Current account state</p>
            </div>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold px-2.5 py-1 rounded-full capitalize">
              {user.accountStatus}
            </span>
          </div>
        </div>
      </Section>
    </div>
  )
}
