import React from 'react'
import type { IntegrationsBlock as Props } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { GridPattern } from '@/components/ui/grid-pattern'
import { Typography } from '@/components/ui/typography'

export const IntegrationsBlock: React.FC<Props> = async ({
  title,
  description,
  mode,
  manualItems,
  collection,
}) => {
  // 🔁 Получаем данные
  let resolvedItems: {
    id: string
    slug: string
    title: string
    description: string
    logo: any
  }[] = []

  if (mode === 'manual') {
    resolvedItems =
      manualItems?.map((item, i) => ({
        id: `manual-${i}`,
        slug: '',
        title: item.title,
        description: item.description,
        logo: item.logo,
      })) || []
  } else if (mode === 'fromCollection' && collection) {
    const payload = await getPayload({ config: configPromise })
    try {
      const result = await payload.find({
        collection,
        limit: 100,
        depth: 1,
        select: {
          slug: true,
          title: true,
          excerpt: true,
          logo: true,
        },
      })

      resolvedItems = result.docs
        .filter((doc: any) => doc.title && doc.logo)
        .map((doc: any) => ({
          id: doc.id,
          slug: doc.slug,
          title: doc.title,
          description: doc.excerpt || '',
          logo: doc.logo,
        }))
      if (resolvedItems.length === 0) return null
    } catch (error) {
      console.error('Error fetching collection items for IntegrationsBlock:', error)
    }
  }

  return (
    <section>
      <div className="container space-y-16 px-6">
        <div className="text-center">
          {title && (
            <Typography tag="h2" className="text-balance text-3xl font-semibold md:text-4xl">
              {title}
            </Typography>
          )}
          {description && (
            <Typography tag="p" className="text-muted-foreground mt-6">
              {description}
            </Typography>
          )}
        </div>

        <div className="grid grid-cols-1 divide-x divide-y border-t border-l sm:grid-cols-2 md:grid-cols-3">
          {resolvedItems.slice(0, 6).map((item) => (
            <IntegrationCard
              key={item.id}
              title={item.title}
              description={item.description}
              link={`/portfolio/${item.slug}`}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// 💡 Карточка (как в исходнике)
const IntegrationCard = ({
  title,
  description,
  link,
  logo,
}: {
  title: string
  description: string
  link: string
  logo: any
}) => {
  return (
    <Link
      href={link}
      className="relative overflow-hidden p-6 last:border-r last:border-b transition-box-shadow hover:shadow-muted-foreground duration-100 hover:shadow-md  cursor-pointer"
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
        {logo && <Media resource={logo} imgClassName="size-full object-contain" />}
      </div>
      <Typography tag="h3" className="mt-10 text-sm md:text-base">
        {title}
      </Typography>
      <Typography tag="p" className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {description}
      </Typography>
    </Link>
  )
}
