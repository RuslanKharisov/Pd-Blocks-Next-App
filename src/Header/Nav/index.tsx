'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface Props {
  data: HeaderType
  className?: string
}

export const HeaderNav: React.FC<Props> = ({ data, className }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn("flex gap-3 items-center", className)}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
