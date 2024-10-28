import { Dot, IDotProps } from '@canyon/ui/Dot'
import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'

import { ListRow } from './ListRow'

interface IListHeaderProps {
  complete?: boolean
  isFirst?: boolean
  title: string
}

const Shell = ({
  children,
  isFirst,
}: { isFirst?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <ListRow className={cn('bg-background gap-2', isFirst ? 'rounded-tl-md rounded-tr-md' : '')}>
    {children}
  </ListRow>
)

export const ListHeader = ({ complete, isFirst, title }: IListHeaderProps) => {
  const dotProps: Record<
    'complete' | 'in-progress',
    { borderColor: string; dotColor: string; variant: IDotProps['variant'] }
  > = {
    complete: {
      borderColor: 'border-green-500',
      dotColor: 'bg-green-500',
      variant: 'full',
    },
    'in-progress': {
      borderColor: 'border-yellow-500',
      dotColor: 'bg-yellow-500',
      variant: 'half',
    },
  }

  const dot = dotProps[complete ? 'complete' : 'in-progress']
  return (
    <ListRow className={cn('bg-background gap-3', isFirst ? 'rounded-tl-md rounded-tr-md' : '')}>
      <Dot borderColor={dot.borderColor} dotColor={dot.dotColor} variant={dot.variant} />
      {title}
    </ListRow>
  )
}

export const ListHeaderSkeleton = () => {
  return (
    <Shell>
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-4" />
    </Shell>
  )
}
