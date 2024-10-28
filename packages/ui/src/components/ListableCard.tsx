import { formatDate } from '@rag/utils'

import { cn } from '../utils'
import { Card } from './Card'
import { Skeleton } from './Skeleton'

interface IListableCardProps {
  className?: string
  content: React.ReactNode | string
  date?: string
  label?: React.ReactNode | string
  onClick?: () => void
  title: React.ReactNode | string
}

export const ListableCard = ({
  className,
  content,
  date,
  label,
  onClick,
  title,
}: IListableCardProps) => {
  return (
    <Card
      className={cn(
        'border-border-secondary bg-background-contrast hover:bg-background-contrast/90 flex h-full cursor-pointer flex-col overflow-y-hidden border px-3 py-3.5',
        className
      )}
      onClick={onClick}
    >
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{label}</div>
      <div className="mt-1.5">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
        <div
          className={cn(
            'scrollbar-thumb-background-transparent text-muted-foreground hover:scrollbar-thumb-background-secondary my-1 h-[140px] overflow-y-auto pt-1 text-sm transition-all'
          )}
        >
          {content}
        </div>
      </div>
      <hr className="border-border-secondary my-3 border-t" />
      <div className="text-muted-foreground text-right text-xs">
        {formatDate(date, 'MMMM dd, yyyy')}
      </div>
    </Card>
  )
}

const ListableCardSkeleton = () => (
  <ListableCard
    className="h-[300px] w-[320px]"
    content={<Skeleton className="h-[140px] w-20" />}
    label={<Skeleton className="h-4 w-20" />}
    title={<Skeleton className="h-4 w-20" />}
  />
)

ListableCard.Skeleton = ListableCardSkeleton
