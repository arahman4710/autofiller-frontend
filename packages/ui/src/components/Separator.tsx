'use client'

import { forwardRef } from 'react'

import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '../utils'

const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, decorative = true, orientation = 'horizontal', ...props }, ref) => (
  <SeparatorPrimitive.Root
    className={cn(
      'bg-border shrink-0',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    decorative={decorative}
    orientation={orientation}
    ref={ref}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
