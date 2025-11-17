'use client'
import type React from 'react'

// https://magicui.design/docs/components/grid-pattern
import { GridPattern } from '@/components/ui/grid-pattern'
import { cn } from '@/utilities/ui'
import { Portfolio } from '@/payload-types'
import { Media } from '@/components/Media'
import { useRouter } from 'next/navigation'

type FeatureType = Pick<Portfolio, 'id' | 'title' | 'slug' | 'excerpt' | 'logo'>

type PorfolioCardPorps = React.ComponentProps<'div'> & {
  feature: FeatureType
}

export function PorfolioCard({ feature, className, ...props }: PorfolioCardPorps) {
  const router = useRouter()
  return (
    <div
      onClick={() => feature.slug && router.push(`/portfolio/${feature.slug}`)}
      className={cn('relative overflow-hidden p-6', className)}
      {...props}
    >
      <div className="-mt-2 -ml-20 pointer-events-none absolute top-0 left-1/2 size-full mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={5}
        />
      </div>
      <div className="flex size-10 items-center justify-center">
        {feature.logo && <Media resource={feature.logo} imgClassName="size-full object-contain" />}
      </div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.excerpt}
      </p>
    </div>
  )
}
