import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Contact, ContactBlock as Props } from '@/payload-types'
import { Typography } from '@/components/ui/typography'

export const ContactBlock: React.FC<Props> = async ({ title, description }) => {
  const contactsData: Contact = (await getCachedGlobal('contacts', 1)()) as Contact

  const { email, emailDescription, phone, phone2, phoneDescription, address, addressDescription } =
    contactsData

  return (
    <div className="container">
      <div className=" flex grow flex-col justify-center px-4 md:items-center">
        <Typography tag="h2">{title}</Typography>
        {description && (
          <Typography tag="p" className="mb-5 text-base text-muted-foreground">
            {description}
          </Typography>
        )}
      </div>

      <BorderSeparator />
      <div className="grid md:grid-cols-3">
        <Box description={emailDescription || ''} icon={Mail} title="Email">
          <a
            className="font-medium font-mono text-sm tracking-wide hover:underline"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </Box>

        <Box description={addressDescription || ''} icon={MapPin} title="Офис">
          <span className="font-medium font-mono text-sm tracking-wide">{address}</span>
        </Box>

        <Box
          className="border-b-0 md:border-r-0"
          description={phoneDescription || ''}
          icon={Phone}
          title="Телефон"
        >
          <div>
            <a
              className="block font-medium font-mono text-sm tracking-wide hover:underline"
              href={`tel:${phone}`}
            >
              {phone}
            </a>
            {phone2 && (
              <a
                className="block font-medium font-mono text-sm tracking-wide hover:underline"
                href={`tel:${phone2}`}
              >
                {phone2}
              </a>
            )}
          </div>
        </Box>
      </div>
    </div>
  )
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />
}

type ContactBox = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

function Box({ title, description, children, icon: Icon, className }: ContactBox) {
  return (
    <div
      className={cn('flex flex-col justify-between border-b md:border-r md:border-b-0', className)}
    >
      <div className="flex items-center gap-x-3 border-b bg-secondary/50 p-4 dark:bg-secondary/20">
        <Icon className="size-5 text-muted-foreground" strokeWidth={1} />
        <Typography tag="h2">{title}</Typography>
      </div>
      <div className="flex items-center gap-x-2 p-4 ">{children}</div>
      <div className="border-t p-4">
        <Typography tag="p" className="text-muted-foreground text-sm min-h-10">
          {description}
        </Typography>
      </div>
    </div>
  )
}
