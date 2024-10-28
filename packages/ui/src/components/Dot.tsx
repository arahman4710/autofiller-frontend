import { forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const dotVariants = cva('w-4 h-4 rounded-full border-2 flex items-center justify-center', {
  defaultVariants: {
    variant: 'full',
  },
  variants: {
    variant: {
      empty: 'border-primary',
      full: 'border-primary',
      half: 'border-primary justify-end pr-0.5',
    },
  },
})

const innerDotVariants = cva('w-2 h-2', {
  defaultVariants: {
    variant: 'full',
  },
  variants: {
    variant: {
      empty: 'hidden',
      full: 'bg-primary rounded-full',
      half: 'bg-primary rounded-br-full rounded-tr-full w-1',
    },
  },
})

export interface IDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotVariants> {
  borderColor?: string
  dotColor?: string
}

export const Dot = forwardRef<HTMLDivElement, IDotProps>(
  ({ borderColor, className, dotColor, variant, ...props }, ref) => {
    return (
      <div className={cn(dotVariants({ className, variant }), borderColor)} ref={ref} {...props}>
        <div className={cn(innerDotVariants({ variant }), dotColor)} />
      </div>
    )
  }
)

Dot.displayName = 'Dot'
