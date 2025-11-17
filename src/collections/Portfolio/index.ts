import { type CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { hero } from '@/heros/config'

// ⚠️ Хуки переиспользуем/адаптируем

// SEO поля
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Content } from '@/blocks/Content/config'
import { slugField } from '@/fields/slug'
import { revalidatePortfolio, revalidatePortfolioDelete } from './hooks/revalidatePortfolio'

export const Portfolio: CollectionConfig<'portfolio'> = {
  slug: 'portfolio',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return `/portfolio/${data?.slug}`
      },
    },
    preview: (data) => {
      return `/portfolio/${data?.slug}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название проекта',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание (для карточек, слайдеров)',
      admin: {
        description: 'Используется в блоках типа «Интеграции», «Архив проектов» и др.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Логотип / Превью',
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          label: 'Контент',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Content],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePortfolio],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidatePortfolioDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 5,
  },
}
