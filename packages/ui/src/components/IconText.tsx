'use client'

import { cva } from 'class-variance-authority'

import { cn } from '../utils'

interface IIconTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  gap?: 'lg' | 'md' | 'sm' | 'xl'
  iconProps?: React.HTMLAttributes<HTMLSpanElement>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const iconTextVariants = cva('flex items-center', {
  defaultVariants: {
    gap: 'md',
  },
  variants: {
    gap: {
      lg: 'gap-3',
      md: 'gap-2',
      sm: 'gap-1',
      xl: 'gap-4',
    },
  },
})

export const IconText = ({
  children,
  className,
  gap,
  iconProps,
  leftIcon,
  rightIcon,
  ...props
}: IIconTextProps) => (
  <span className={cn(iconTextVariants({ gap }), className)} {...props}>
    {leftIcon && (
      <i className={cn('not-italic', iconProps?.className)} {...iconProps}>
        {leftIcon}
      </i>
    )}
    {children}
    {rightIcon && (
      <i className={cn('not-italic', iconProps?.className)} {...iconProps}>
        {rightIcon}
      </i>
    )}
  </span>
)
