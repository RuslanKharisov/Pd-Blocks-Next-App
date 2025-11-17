import React from 'react'
import type { Portfolio } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

type PortfolioCardData = Pick<Portfolio, 'id' | 'title' | 'slug' | 'excerpt' | 'logo'>

export const PortfolioCard: React.FC<{ portfolio: PortfolioCardData }> = ({ portfolio }) => {
  const { title, slug, excerpt, logo } = portfolio
  const url = `/portfolio/${slug}`

  return (
    <Card className="p-6">
      <div className="relative">
        <div className="flex size-10 items-center justify-center">
          {logo && <Media resource={logo} imgClassName="size-full object-contain" />}
        </div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{excerpt}</p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="outline-solid" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={url}>
              Learn More
              <ChevronRight className="ml-0 size-3.5! opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
