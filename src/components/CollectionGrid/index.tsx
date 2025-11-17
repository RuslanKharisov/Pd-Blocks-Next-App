import { cn } from '@/utilities/ui'
import React from 'react'

export type CollectionGridProps = {
  children: React.ReactNode
  className?: string
}

export const CollectionGrid = ({ children, className }: CollectionGridProps) => {
  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-1 divide-x divide-y border-t border-l sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </div>
  )
}
