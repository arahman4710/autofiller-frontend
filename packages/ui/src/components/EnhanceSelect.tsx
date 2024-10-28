import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const enhanceSelectVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'bg-background-secondary',
      selected: 'bg-background-contrast border-border-accent',
      success: 'bg-green-700/60 border-green-700',
    },
  },
})

const enhanceSelectHeaderVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'text-muted-foreground',
      selected: 'text-muted-foreground',
      success: 'text-green-400',
    },
  },
})

interface IEnhanceSelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhanceSelectVariants> {
  className?: string
  disabled?: boolean
  headerText?: string
  rightIcon?: React.ReactNode
  text: React.ReactNode | string
}

export const EnhanceSelect = ({
  className,
  disabled,
  headerText,
  rightIcon,
  text,
  variant,
  ...props
}: IEnhanceSelectProps) => {
  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-col gap-1 rounded-md border border-transparent px-6 py-3.5 text-sm',
        enhanceSelectVariants({ className, variant }),
        disabled && 'cursor-auto'
      )}
      {...props}
    >
      {headerText && (
        <span className={cn(enhanceSelectHeaderVariants({ variant: variant }))}>{headerText}</span>
      )}
      <p className="list-none leading-relaxed">{text}</p>
      {rightIcon && <div>{rightIcon}</div>}
    </div>
  )
}
