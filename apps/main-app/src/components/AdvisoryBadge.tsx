import { cn } from '@canyon/ui/utils/cn'

interface IAdvisoryBadgeProps {
  className?: string
}

export const AdvisoryBadge = ({ className }: IAdvisoryBadgeProps) => {
  return (
    <div
      className={cn(
        'w-fit bg-gradient-to-r from-[#86EFAC] to-[#86EFAC] bg-clip-text text-[12px] font-bold uppercase text-transparent',
        className
      )}
    >
      Advisory
    </div>
  )
}
