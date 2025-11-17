import React from 'react'
import type { IntegrationsBlock as Props } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Media } from '@/components/Media'

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
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          {title && <h2 className="text-balance text-3xl font-semibold md:text-4xl">{title}</h2>}
          {description && <p className="text-muted-foreground mt-6">{description}</p>}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resolvedItems.map((item) => (
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
    <Card className="p-6">
      <div className="relative">
        <div className="flex size-10 items-center justify-center">
          {logo && <Media resource={logo} imgClassName="size-full object-contain" />}
        </div>

        <div className="space-y-2 py-6">
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
        </div>

        <div className="flex gap-3 border-t border-dashed pt-6">
          <Button asChild variant="outline-solid" size="sm" className="gap-1 pr-2 shadow-none">
            <Link href={link}>
              Learn More
              <ChevronRight className="ml-0 size-3.5! opacity-50" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
