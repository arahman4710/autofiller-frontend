import { cn } from '@autofiller/ui/utils/cn'

interface IProBadgeProps {
  className?: string
}

export const ProBadge = ({ className }: IProBadgeProps) => {
  return (
    <div
      className={cn(
        'w-fit bg-gradient-to-r from-[#FFDF3D] to-[#FF7100] bg-clip-text text-[12px] font-bold uppercase text-transparent',
        className
      )}
    >
      Pro
    </div>
  )
}
