import { cn } from '@rag/ui/utils/cn'
import { getInitials } from '@rag/utils'

export const IntervieweeIcon = ({
  className,
  name,
  ...props
}: { name: string } & React.HTMLAttributes<HTMLDivElement>) => {
  const initials = getInitials(name)

  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-slate-600 to-slate-500 text-xs',
        className
      )}
      {...props}
    >
      {initials}
    </div>
  )
}
