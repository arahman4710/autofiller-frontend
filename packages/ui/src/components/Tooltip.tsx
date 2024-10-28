'use client'

import { forwardRef } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

interface ITooltipTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
  underline?: boolean
}

const TooltipTrigger = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  ITooltipTriggerProps
>(({ className, underline, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    className={cn(underline && 'underline decoration-dashed', className)}
    ref={ref}
    {...props}
  />
))

const tooltipVariants = cva(
  'border z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm text-primary-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'border-border bg-primary',
        info: 'border-blue-500 bg-info text-foreground',
      },
    },
  }
)

export interface ITooltipContentProps
  extends VariantProps<typeof tooltipVariants>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  ITooltipContentProps
>(({ className, sideOffset = 4, variant, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(tooltipVariants({ variant }), className)}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
