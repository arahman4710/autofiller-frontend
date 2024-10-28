import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const loaderVariants = cva('flex items-center justify-center', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'h-32 w-32',
      lg: 'h-48 w-48 text-xl',
    },
  },
})

const circleVariants = cva('bg-amber-500 rounded-full animate-pulse mr-2', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'h-2 w-2',
      lg: 'h-4 w-4',
    },
  },
})

export interface ILoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  string?: string
}

export const Loader = ({ className, size, string = 'Loading' }: ILoaderProps) => {
  return (
    <div className={cn(loaderVariants({ className, size }))}>
      <div className={cn(circleVariants({ size }))} />
      <span className="font-mono">{string}</span>
    </div>
  )
}
