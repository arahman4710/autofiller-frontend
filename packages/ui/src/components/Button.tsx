import { forwardRef } from 'react'
import { useState } from 'react'

import { SpinnerGap } from '@phosphor-icons/react'
import { CaretDown } from '@phosphor-icons/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './DropdownMenu'

const buttonVariants = cva(
  'shadow-highlight-hard flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-8 px-2.5 py-1.5',
        icon: 'h-8 w-8',
        lg: 'h-10 px-8 text-base',
        sm: 'py-1.5 px-2.5 text-sm',
      },
      variant: {
        action:
          'text-stone-400 hover:bg-stone-400/20 hover:text-stone-100 p-1 rounded-md shadow-none',
        ai: 'border-violet-500 bg-violet-600 text-white hover:bg-violet-700',
        cta: 'bg-amber-500 text-black shadow hover:bg-amber-500/90',
        ctaBlue: 'bg-blue-500 text-white shadow hover:bg-blue-500/90',
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground shadow-none',
        link: 'text-amber-500 w-fit p-0 underline-offset-4 hover:underline shadow-none',
        mutedLink: 'text-muted-foreground w-fit p-0 underline-offset-4 hover:underline',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      },
    },
  }
)

const spinnerVariant = cva('animate-spin', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'w-4',
      icon: 'w-4',
      lg: 'w-5',
      sm: 'w-3',
    },
  },
})

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  containerClassName?: string
  dropdownMenu?: React.ReactNode
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  loading?: boolean
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      containerClassName,
      disabled,
      dropdownMenu,
      fullWidth,
      leftIcon,
      loading,
      rightIcon,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false)

    return (
      <div className={cn('flex flex-row', containerClassName)}>
        <button
          className={cn(
            buttonVariants({ className, size, variant }),
            Boolean(dropdownMenu) ? 'rounded-r-none' : 'null',
            fullWidth && 'w-full'
          )}
          ref={ref}
          type="button"
          {...props}
          disabled={disabled || loading}
        >
          {leftIcon && !loading ? <span className="mr-1.5">{leftIcon}</span> : null}
          {loading ? (
            <SpinnerGap className={cn(spinnerVariant({ size }), props.children ? 'mr-1' : null)} />
          ) : null}
          {props.children}
          {rightIcon && !loading ? <span className="ml-1.5">{rightIcon}</span> : null}
        </button>
        {dropdownMenu && (
          <DropdownMenu onOpenChange={setIsDropdownMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  buttonVariants({ className, size, variant }),
                  Boolean(dropdownMenu) ? 'rounded-l-none' : null
                )}
              >
                <CaretDown
                  className={cn('transition-all', isDropdownMenuOpen ? 'rotate-180' : 'rotate-0')}
                  weight="bold"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10}>
              {dropdownMenu}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
