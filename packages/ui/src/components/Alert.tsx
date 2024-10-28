import { forwardRef } from 'react'

import { Info } from '@phosphor-icons/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-background-contrast/40 text-foreground border-border-secondary/50 ',
        destructive:
          'border-destructive/50 bg-destructive/40 text-destructive dark:border-destructive [&>svg]:text-destructive',
        information: 'border-info/50 text-info-foreground bg-info/40 [&>svg]:text-muted-info',
      },
    },
  }
)

export type TAlertVariant = VariantProps<typeof alertVariants>

const variantIcons: Partial<Record<NonNullable<TAlertVariant['variant']>, React.ElementType>> = {
  default: undefined,
  destructive: undefined,
  information: Info,
}

const Alert = forwardRef<
  HTMLDivElement,
  {
    icon?: React.ElementType
  } & React.HTMLAttributes<HTMLDivElement> &
    TAlertVariant
>(({ children, className, icon, variant, ...props }, ref) => {
  const Icon = icon ?? variantIcons[variant || 'default']

  return (
    <div className={cn(alertVariants({ variant }), className)} ref={ref} role="alert" {...props}>
      <div className="flex flex-row items-center gap-2 has-[.alert-description]:items-start">
        {Icon && <Icon className="h-4 w-4" />}
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  )
})
Alert.displayName = 'Alert'

const AlertTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      className={cn('alert-title mb-1 font-medium leading-none tracking-tight', className)}
      ref={ref}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('alert-description text-sm [&_p]:leading-relaxed', className)}
    ref={ref}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
