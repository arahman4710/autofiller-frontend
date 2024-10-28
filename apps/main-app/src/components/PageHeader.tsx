import { IconText } from '@canyon/ui/IconText'
import { cn } from '@canyon/ui/utils/cn'

interface IPageHeaderProps {
  className?: string
  subtitle?: string
  title: string
  titleIcon?: React.ReactNode
}

export const PageHeader = ({ className, subtitle, title, titleIcon }: IPageHeaderProps) => {
  return (
    <div className={cn('mb-6 mt-3 flex flex-col gap-1', className)}>
      <IconText iconProps={{ className: 'text-2xl text-zinc-400' }} leftIcon={titleIcon}>
        <h1>{title}</h1>
      </IconText>
      <h2 className="text-zinc-400">{subtitle}</h2>
    </div>
  )
}
