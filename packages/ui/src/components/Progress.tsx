'use client'

import { forwardRef } from 'react'

import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '../utils'

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Root
    className={cn(
      'bg-background-contrast relative h-[14px] w-[300px] overflow-hidden rounded-full',
      className
    )}
    ref={ref}
    {...props}
  />
))
Progress.displayName = ProgressPrimitive.Root.displayName

const ProgressIndicator = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Indicator
    className={cn(
      `h-full w-full bg-gradient-to-r from-[#FFDF3D] to-[#FF7100] transition-transform`,
      className
    )}
    ref={ref}
    {...props}
  />
))
ProgressIndicator.displayName = ProgressPrimitive.Indicator.displayName

export { Progress, ProgressIndicator }
