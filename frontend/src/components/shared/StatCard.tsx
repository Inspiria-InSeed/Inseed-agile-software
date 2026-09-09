import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label:    string
  value:    number | string
  icon:     LucideIcon
  color?:   string
  bg?:      string
  trend?:   string
  trendUp?: boolean
  delay?:   number
  suffix?:  string
}

function CountUp({ to, duration = 1.5 }: { to: number; duration?: number }) {
  const ref   = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: 'easeOut' })
    return controls.stop
  }, [to, duration, count])

  useEffect(() => {
    return rounded.on('change', v => {
      if (ref.current) ref.current.textContent = String(v)
    })
  }, [rounded])

  return <span ref={ref}>0</span>
}

export default function StatCard({
  label, value, icon: Icon,
  color = 'text-blue-600', bg = 'bg-blue-100',
  trend, trendUp, delay = 0, suffix = ''
}: StatCardProps) {
  const isNumber = typeof value === 'number'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          className={cn('p-2.5 rounded-xl', bg)}
        >
          <Icon size={20} className={color} />
        </motion.div>
        {trend && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3 }}
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-full',
              trendUp ? 'text-green-700 bg-green-100' : 'text-red-600 bg-red-100'
            )}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </motion.span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.15 }}
        className="text-3xl font-black text-gray-900 tracking-tight"
      >
        {isNumber ? <CountUp to={value as number} /> : value}
        {suffix && <span className="text-lg font-semibold text-gray-500 ml-0.5">{suffix}</span>}
      </motion.div>

      <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
    </motion.div>
  )
}
