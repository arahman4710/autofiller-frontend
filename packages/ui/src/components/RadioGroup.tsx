'use client'

import { forwardRef } from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '../utils'

const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('flex flex-col gap-[10px]', className)}
    ref={ref}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    className={cn('h-[16px] w-[16px] rounded-full bg-white', className)}
    ref={ref}
    {...props}
  >
    <RadioGroupIndicator />
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupIndicator = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Indicator
    className={cn(
      'flex h-full w-full items-center justify-center after:block after:h-[6px] after:w-[6px] after:rounded-lg after:bg-black',
      className
    )}
    ref={ref}
    {...props}
  />
))
RadioGroupIndicator.displayName = RadioGroupPrimitive.Indicator.displayName

const RadioGroupRow = forwardRef<
  React.HTMLAttributes<HTMLDivElement>,
  React.HtmlHTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }) => (
  <div className={cn('flex cursor-pointer flex-row items-center gap-2', className)} {...props}>
    {children}
  </div>
))

RadioGroupRow.displayName = 'RadioGroupRow'

export { RadioGroup, RadioGroupIndicator, RadioGroupItem, RadioGroupRow }
