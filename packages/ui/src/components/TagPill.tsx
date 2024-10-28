import { cn } from '@rag/ui/utils'
import { VariantProps, cva } from 'class-variance-authority'

const tagPillVariants = cva('rounded-full text-sm text-white', {
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
  variants: {
    size: {
      md: 'min-w-10 py-1 pl-2 pr-3',
      sm: 'min-w-6 py-0.5 pl-1 pr-2',
    },
    variant: {
      default: '',
    },
  },
})

export const TagPill = ({
  children,
  className,
  size,
  variant,
}: {
  children: React.ReactNode
  className?: string
  size?: VariantProps<typeof tagPillVariants>['size']
  variant?: VariantProps<typeof tagPillVariants>['variant']
}) => {
  return <div className={cn(tagPillVariants({ size, variant }), className)}>{children}</div>
}
