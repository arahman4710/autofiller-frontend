import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'
import { Badge } from './Badge'

export const ChipsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="line-clamp-1 flex flex-row flex-wrap gap-x-1.5 gap-y-2.5 overflow-visible text-left font-normal">
      {children}
    </div>
  )
}

const chipVariants = cva('flex select-none flex-row items-center gap-1.5 font-normal', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      ai: 'bg-violet-300 text-violet-950 hover:bg-violet-300/90',
      default: '',
    },
  },
})

interface IChipProps extends VariantProps<typeof chipVariants> {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Chip = ({ children, className, onClick, variant, ...props }: IChipProps) => {
  return (
    <Badge
      className={cn(chipVariants({ variant }), onClick && 'cursor-pointer', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Badge>
  )
}
