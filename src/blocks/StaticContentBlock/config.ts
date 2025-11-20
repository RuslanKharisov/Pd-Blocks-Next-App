// src/blocks/StaticContentBlock/config.ts
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const StaticContentBlock: Block = {
  slug: 'staticContent',
  interfaceName: 'StaticContentBlock',
  labels: {
    singular: 'Static Content',
    plural: 'Static Content Blocks',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Style',
      defaultValue: 'withImageLeft',
      options: [
        { label: 'Image Left', value: 'withImageLeft' },
        { label: 'Image Right', value: 'withImageRight' },
        { label: 'With Features', value: 'withFeatures' },
        { label: 'With Testimonial', value: 'withTestimonial' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            AlignFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            LinkFeature(),
            IndentFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main image (light version)',
    },
    {
      name: 'mediaDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Main image (dark version, optional)',
    },
    // ——— Features (для withFeatures) ———
    {
      name: 'features',
      type: 'array',
      maxRows: 4,
      admin: {
        condition: (_, { type }) => type === 'withFeatures',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Zap (⚡)', value: 'zap' },
            { label: 'CPU (💻)', value: 'cpu' },
            // можно расширить
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    // ——— Testimonial (для withTestimonial) ———
    {
      name: 'testimonial',

      type: 'group',
      admin: {
        condition: (_, { type }) => type === 'withTestimonial',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
