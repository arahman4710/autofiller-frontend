import { Sparkle } from '@phosphor-icons/react'
import { cn } from '@autofiller/ui/utils/cn'

export const InterviewerIcon = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-600 to-orange-500',
        className
      )}
      {...props}
    >
      <Sparkle weight="fill" />
    </div>
  )
}
