import React from 'react'

interface SkeletonProps {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  )
}

export const CardSkeleton: React.FC = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <Skeleton className="h-4 w-24 mb-4" />
    <Skeleton className="h-8 w-32" />
  </div>
)

export const PostSkeleton: React.FC = () => (
  <div className="p-4 border-b border-gray-50 last:border-0">
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-4 w-full mb-1" />
    <Skeleton className="h-4 w-2/3" />
  </div>
)
