import React from 'react'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { Media } from '@/components/Media'
import { InfiniteSliderBlock as Props } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Typography } from '@/components/ui/typography'

// Это серверный компонент → можно использовать async
export const InfiniteSliderBlock: React.FC<Props> = async ({
  title,
  mode,
  manualSlides,
  collection,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
}) => {
  let resolvedSlides: { id: string; logo: any; alt?: string }[] = []

  if (mode === 'manual') {
    resolvedSlides =
      manualSlides?.map((slide, i) => ({
        id: `manual-${i}`,
        logo: slide.logo,
        alt: slide.alt || 'Logo',
      })) || []
  } else if (mode === 'fromCollection' && collection) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection,
      limit: 100,
      depth: 1,
      select: {
        logo: true,
        alt: true,
        id: true,
        name: true, // fallback для alt
      },
    })

    resolvedSlides = result.docs
      .filter((doc: any) => doc.logo)
      .map((doc: any) => ({
        id: doc.id,
        logo: doc.logo,
        alt: doc.alt || doc.name || 'Logo',
      }))
  }

  if (resolvedSlides.length === 0) return null

  return (
    <section className="bg-background">
      <div className="group relative container px-6">
        <div className="flex flex-col items-center md:flex-row overflow-x-hidden">
          {title && (
            <div className="md:max-w-44 md:border-r md:pr-6">
              <Typography tag="p" className="text-end text-lg">
                {title}
              </Typography>
            </div>
          )}
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={speedOnHover ?? 20} speed={speed ?? 40} gap={gap ?? 112}>
              {resolvedSlides.map((slide) => (
                <div key={slide.id} className="flex">
                  {slide.logo && (
                    <Media
                      resource={slide.logo}
                      imgClassName="mx-auto h-5 w-fit h-6"
                      priority={false}
                    />
                  )}
                </div>
              ))}
            </InfiniteSlider>

            {/* Градиенты для затухания */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
