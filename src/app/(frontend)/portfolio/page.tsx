import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { PortfolioCard } from '@/components/PortfolioCard'
import { CollectionGrid } from '@/components/CollectionGrid'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PortfolioList() {
  const payload = await getPayload({ config: configPromise })

  const portfolios = await payload.find({
    collection: 'portfolio',
    depth: 1,
    limit: 100,
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
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Portfolio</h1>
        </div>
      </div>

      <div className="container">
        <CollectionGrid>
          {portfolios.docs.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </CollectionGrid>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Portfolio',
  }
}
