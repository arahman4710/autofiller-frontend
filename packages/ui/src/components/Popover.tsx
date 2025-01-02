'use client'

import { forwardRef } from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Separator } from '@rag/ui/Separator'

import { cn } from '../utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = 'center', className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        'border-border-secondary/40 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md border p-1 text-sm shadow-md outline-none',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

interface IPopoverOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
}

const PopoverOverlay = ({ className, open, ...props }: IPopoverOverlayProps) =>
  open ? (
    <div className={cn('pointer-events-auto fixed inset-0 z-10', className)} {...props} />
  ) : null
PopoverOverlay.displayName = 'PopoverOverlay'

const PopoverMenu = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2', className)} role="menu" {...props}>
    <ul>{children}</ul>
  </div>
)
PopoverMenu.displayName = 'PopoverMenu'

const PopoverMenuItem = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn(
      'hover:bg-background-contrast/80 flex cursor-pointer items-center justify-start rounded-md px-2 py-1 text-stone-100',
      className
    )}
    role="menuitem"
    {...props}
  >
    {children}
  </li>
)
PopoverMenuItem.displayName = 'PopoverMenuItem'

const PopoverMenuSeparator = ({ className }: { className?: string }) => (
  <Separator className={cn('border-border-secondary/40 my-2', className)} />
)
PopoverMenuSeparator.displayName = 'PopoverMenuSeparator'

export {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuSeparator,
  PopoverOverlay,
  PopoverTrigger,
}
