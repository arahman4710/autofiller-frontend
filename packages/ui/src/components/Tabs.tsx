'use client'

import { forwardRef } from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '../utils'
import { IconText } from './IconText'

const Tabs = TabsPrimitive.Root

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn('border-border-secondary flex gap-3 border-b pb-2', className)}
    ref={ref}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  {
    count?: number
    icon?: React.ReactNode
  } & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ children, className, count, icon, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      'data-[state=active]:border-border-secondary data-[state=active]:text-text data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:text-text/80 hover:data-[state=inactive]:bg-background-contrast/40 relative flex items-center justify-center rounded-lg border border-transparent px-2 py-1 transition-all ease-out after:absolute after:bottom-0 after:left-0 after:right-0 after:mb-[-9px] after:h-[1px] after:transition-[width] after:duration-200 after:ease-in-out after:content-[""] after:data-[state=active]:w-full data-[state=active]:after:bg-stone-200',
      className
    )}
    ref={ref}
    {...props}
  >
    <IconText className="text-sm" leftIcon={icon}>
      {children}
      {count ? (
        <span className="border-border-secondary bg-background-contrast text-muted-foreground rounded-md border px-1 text-xs">
          {count}
        </span>
      ) : null}
    </IconText>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = TabsPrimitive.Content

export { Tabs, TabsContent, TabsList, TabsTrigger }
