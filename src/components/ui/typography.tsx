import { cn } from '@/utilities/ui'

export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag?: TypographyTag
  className?: string
  children: React.ReactNode
}

export const Typography = ({
  tag: Tag = 'div',
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <div
      className={cn(
        'payload-richtext',
        'max-w-none mx-auto prose md:prose-md dark:prose-invert',
        className,
      )}
    >
      <Tag {...props}>{children}</Tag>
    </div>
  )
}
