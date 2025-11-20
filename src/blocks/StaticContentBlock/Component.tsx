'use client'

import { Cpu, Zap } from 'lucide-react'
import { StaticContentBlock as Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { Typography } from '@/components/ui/typography'
import RichText from '@/components/RichText'

const renderIcon = (icon: string) => {
  switch (icon) {
    case 'cpu':
      return <Cpu className="size-4" />
    case 'zap':
      return <Zap className="size-4" />
    default:
      return null
  }
}

export const StaticContentBlock: React.FC<Props> = ({
  type,
  title,
  content,
  media,
  mediaDark,
  features,
  testimonial,
}) => {
  return (
    <section className=" overflow-hidden">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
        {title && (
          <Typography tag="h2" className="mx-0 text-balance max-w-4xl">
            {title}
          </Typography>
        )}

        {type === 'withImageLeft' && (
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <ImageSlot media={media} mediaDark={mediaDark} />
            </div>
            <Content description={content} testimonial={null} />
          </div>
        )}

        {type === 'withImageRight' && (
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0 order-2 md:order-1">
              <Content description={content} testimonial={null} />
            </div>
            <div className="relative mb-6 sm:mb-0 order-1 md:order-2">
              <ImageSlot media={media} mediaDark={mediaDark} />
            </div>
          </div>
        )}

        {type === 'withFeatures' && (
          <div className="relative">
            <div className="relative z-10 space-y-4 md:w-1/2">
              {content && <RichText className="mb-0" data={content} enableGutter={false} />}
              <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
                {features?.map((feat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {renderIcon(feat.icon)}
                      <h3 className="text-sm font-medium">{feat.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:mask-l-from-35% md:mask-l-to-55% mt-12 h-fit md:absolute md:-inset-y-12 md:inset-x-0 md:mt-0">
              <ImageSlot media={media} mediaDark={mediaDark} />
            </div>
          </div>
        )}

        {type === 'withTestimonial' && (
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <ImageSlot media={media} mediaDark={mediaDark} />
            </div>
            <Content description={content} testimonial={testimonial} />
          </div>
        )}
      </div>
    </section>
  )
}

// ——— Вспомогательные компоненты ———

const ImageSlot = ({ media, mediaDark }: { media?: any; mediaDark?: any }) => {
  return (
    <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
      {mediaDark && <Media resource={mediaDark} imgClassName="hidden rounded-[15px] dark:block" />}
      <Media resource={media} imgClassName="rounded-[15px] shadow dark:hidden" />
    </div>
  )
}

const Content = ({
  description,
  testimonial,
}: {
  description?: {
    root: {
      type: string
      children: {
        type: any
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  testimonial?: { quote?: string; author?: string; companyLogo?: any } | null
}) => {
  return (
    <div className="relative space-y-4">
      {description && <RichText data={description} enableGutter={false} />}
      {testimonial && (
        <div className="pt-6">
          <blockquote className="border-l-4 pl-4">
            <p>{testimonial.quote}</p>
            <div className="mt-6 space-y-3">
              <cite className="block font-medium">{testimonial.author}</cite>
              {testimonial.companyLogo && (
                <Media resource={testimonial.companyLogo} imgClassName="h-5 w-fit dark:invert" />
              )}
            </div>
          </blockquote>
        </div>
      )}
    </div>
  )
}
