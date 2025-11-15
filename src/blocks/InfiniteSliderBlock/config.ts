import type { Block } from 'payload'

export const InfiniteSliderBlock: Block = {
  slug: 'infiniteSlider',
  interfaceName: 'InfiniteSliderBlock',
  labels: {
    singular: 'Infinite Slider',
    plural: 'Infinite Sliders',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (опционально)',
    },
    {
      name: 'mode',
      type: 'radio',
      options: [
        { label: 'Ручной ввод', value: 'manual' },
        { label: 'Из коллекции', value: 'fromCollection' },
      ],
      defaultValue: 'manual',
      admin: {
        layout: 'horizontal',
      },
    },
    // ——— Ручной режим ———
    {
      name: 'manualSlides',
      type: 'array',
      label: 'Слайды (ручной ввод)',
      maxRows: 20,
      admin: {
        condition: (_, { mode }) => mode === 'manual',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt текст',
        },
      ],
    },
    // ——— Режим из коллекции ———
    {
      name: 'collection',
      type: 'select',
      label: 'Коллекция',
      admin: {
        condition: (_, { mode }) => mode === 'fromCollection',
      },
      options: [
        // Можно расширить: brands, partners, testimonials и т.д.
        { label: 'Бренды', value: 'brands' },
        { label: 'Клиенты', value: 'clients' },
        // Добавьте другие коллекции с полем `logo`
      ],
      required: true,
    },
    // ——— Общие настройки ———
    {
      name: 'speed',
      type: 'number',
      defaultValue: 40,
      label: 'Скорость прокрутки (медленнее = больше число)',
    },
    {
      name: 'speedOnHover',
      type: 'number',
      defaultValue: 20,
      label: 'Скорость при наведении',
    },
    {
      name: 'gap',
      type: 'number',
      defaultValue: 112,
      label: 'Отступ между слайдами (px)',
    },
  ],
}
