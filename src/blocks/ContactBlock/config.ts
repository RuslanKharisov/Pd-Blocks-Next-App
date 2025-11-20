import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Contact Us',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Get in touch with our team.',
    },
  ],
}
