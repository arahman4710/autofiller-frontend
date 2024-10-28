import { cn } from '@rag/ui/utils/cn'

import { LogoSmall } from '@/components/assets/LogoIcon'

export const AppIcon = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-background-secondary flex h-[36px] w-[36px] items-center justify-center rounded-xl p-2',
        className
      )}
      {...props}
    >
      <LogoSmall className="h-[24px] w-[24px]" />
    </div>
  )
}
