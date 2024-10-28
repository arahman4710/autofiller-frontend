'use client'

import { forwardRef, useMemo } from 'react'

import { generateColors } from '@rag/utils'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '../utils'

const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    ref={ref}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square h-full w-full', className)}
    ref={ref}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  {
    gradientHashSource?: string
  } & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, gradientHashSource, ...props }, ref) => {
  const colors = useMemo(
    () => generateColors(gradientHashSource ?? ''),
    [gradientHashSource, props.children]
  )

  return (
    <AvatarPrimitive.Fallback
      className={cn('flex h-full w-full items-center justify-center rounded-full', className)}
      ref={ref}
      style={{
        background: gradientHashSource ? `linear-gradient(135deg, ${colors.join(',')})` : undefined,
      }}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
