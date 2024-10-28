import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        discount:
          'border-transparent bg-emerald-600/80 border border-emerald-600/60 text-notification-foreground hover:bg-emerald-400/70 px-1.5 py-0.5 font-medium text-xs text-white',
        notification:
          'border-transparent bg-notification text-notification-foreground hover:bg-notification/80 px-1.5 py-0.5 font-medium text-xs',
        outline: 'text-foreground',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  }
)

export interface IBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: IBadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
