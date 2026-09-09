import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton rounded-lg', className)} />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm space-y-3">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-20" />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-12 rounded" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </div>
  )
}
