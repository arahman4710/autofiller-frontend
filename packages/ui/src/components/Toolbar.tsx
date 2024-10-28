import { forwardRef } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '../utils'

const toolbarVariants = cva('flex flex-row px-6 h-[49px] items-center', {
  defaultVariants: {
    align: 'center',
    justify: 'between',
  },
  variants: {
    align: {
      center: 'items-center',
      end: 'items-end',
      start: 'items-start',
    },
    justify: {
      between: 'justify-between',
      end: 'justify-end',
      start: 'justify-start',
    },
  },
})

export interface IToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'center' | 'end' | 'start'
  borderBottom?: boolean
  justify?: 'between' | 'end' | 'start'
}

export const Toolbar = forwardRef<HTMLDivElement, IToolbarProps>(
  ({ align, borderBottom = true, className, justify, ...props }, ref) => (
    <div
      className={cn(
        toolbarVariants({ align, justify }),
        borderBottom ? 'border-border border-b' : null,
        className
      )}
      ref={ref}
      {...props}
    />
  )
)

Toolbar.displayName = 'Toolbar'
