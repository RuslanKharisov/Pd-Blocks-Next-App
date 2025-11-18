import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Socials: CollectionConfig = {
  slug: 'socials',
  labels: { singular: 'Соцсеть', plural: 'Соцсети' },
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true,
    create: authenticated,
    delete: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название (для админки)',
    },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Например: github, x, linkedin' },
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: true,
    },
    {
      name: 'urlPattern',
      type: 'text',
      required: true,
      admin: {
        description: 'Шаблон URL: https://github.com/{username}',
      },
    },
  ],
}
