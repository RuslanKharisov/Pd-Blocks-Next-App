'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const HeroWithLogosGrid: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="-mt-[10.4rem]">
      <div
        aria-hidden
        className=" z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <section className=" overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-6 pt-28 lg:pt-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            {richText && (
              <RichText className="mb-6 text-balance" data={richText} enableGutter={false} />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="mx-auto 2xl:max-w-7xl">
          <div className="perspective-distant pl-8 lg:pl-44">
            <div className="lg:h-176 rotate-x-20 mask-b-from-55% mask-b-to-100% mask-r-from-75% skew-x-12 pl-6 pt-6">
              {media && typeof media === 'object' && (
                <Media imgClassName=" rounded-(--radius) shadow-xl" priority resource={media} />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-16">
        <div className="m-auto max-w-5xl px-6">
          <h2 className="text-center text-lg font-medium">
            Программный стек которым мы владеем на профессиональном уровне.
          </h2>
          <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="ProsoftLogo"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/atomik_soft_atomik_soft.webp"
              alt="atomik_soft"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="Nvidia Logo"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="ProsoftLogo"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/atomik_soft_atomik_soft.webp"
              alt="atomik_soft"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="Nvidia Logo"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="ProsoftLogo"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/atomik_soft_atomik_soft.webp"
              alt="atomik_soft"
              height="20"
              width="auto"
            />
            <img
              className="h-5 w-fit dark:invert"
              src="/media/ProsoftLogo.webp"
              alt="Nvidia Logo"
              height="20"
              width="auto"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
