import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CollectionGrid } from '@/components/CollectionGrid'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PorfolioCard } from '@/components/FeatureСard.tsx'
import { Typography } from '@/components/ui/typography'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PortfolioList() {
  const payload = await getPayload({ config: configPromise })

  const portfolios = await payload.find({
    collection: 'portfolio',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      logo: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={portfolios.page}
          limit={12}
          totalDocs={portfolios.totalDocs}
        />
      </div>
      <div className="container mb-16">
        <div className="max-w-none">
          <Typography tag="h1">Портфолио</Typography>
        </div>
      </div>

      <div className="container">
        <CollectionGrid>
          {portfolios.docs.map((portfolio) => (
            <PorfolioCard
              key={portfolio.id}
              feature={portfolio}
              className="last:border-r last:border-b transition-box-shadow hover:shadow-muted-foreground duration-100 hover:shadow-md  cursor-pointer"
            />
          ))}
        </CollectionGrid>

        {portfolios?.page && portfolios?.totalPages > 1 && (
          <Pagination page={portfolios.page} totalPages={portfolios.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Portfolio',
  }
}
