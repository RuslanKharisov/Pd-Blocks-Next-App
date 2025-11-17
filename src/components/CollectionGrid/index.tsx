import { cn } from '@/utilities/ui'
import React from 'react'

export type CollectionGridProps = {
  children: React.ReactNode
  className?: string
}

export const CollectionGrid = ({ children, className }: CollectionGridProps) => {
  return (
    <div className={cn('container', className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  )
}
