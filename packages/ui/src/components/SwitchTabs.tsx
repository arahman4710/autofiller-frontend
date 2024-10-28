'use client'

import { forwardRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '../utils'

const SwitchTabs = TabsPrimitive.Root

const SwitchTabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      'bg-background-secondary text-muted-foreground mb-2 inline-flex h-9 items-center justify-center rounded-lg p-1 shadow-sm',
      className
    )}
    ref={ref}
    {...props}
  />
))
SwitchTabsList.displayName = TabsPrimitive.List.displayName

const SwitchTabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      'focus-visible:ring-ring ring-offset-background data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow',
      className
    )}
    ref={ref}
    {...props}
  />
))
SwitchTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const SwitchTabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      'focus-visible:ring-ring ring-offset-background mt-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className
    )}
    ref={ref}
    {...props}
  />
))
SwitchTabsContent.displayName = TabsPrimitive.Content.displayName

export { SwitchTabs, SwitchTabsContent, SwitchTabsList, SwitchTabsTrigger }
