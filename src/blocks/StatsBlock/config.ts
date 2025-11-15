import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: {
    singular: 'Stats',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Статистика',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Значение (например, "+1200", "22M")',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Подпись (например, "Stars on GitHub")',
          required: true,
        },
      ],
    },
  ],
}
