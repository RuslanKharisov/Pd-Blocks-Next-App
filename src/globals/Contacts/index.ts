import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'emailDescription',
      type: 'text',
      defaultValue: 'Мы отвечаем на все письма в течение 24 часов.',
      label: 'Описание для Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'phone2',
      type: 'text',
    },
    {
      name: 'phoneDescription',
      type: 'text',
      defaultValue: 'Мы работаем с понедельника по пятницу с 9:00 до 17:00.',
      label: 'Описание для Телефона',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'addressDescription',
      type: 'text',
      defaultValue: 'Загляните в наш офис для беседы.',
      label: 'Описание для Адреса',
    },
  ],
}
