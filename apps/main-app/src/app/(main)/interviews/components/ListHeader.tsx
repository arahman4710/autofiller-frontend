import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'

import { ListRow } from './ListRow'

const Shell = ({
  children,
  isFirst,
}: { isFirst?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <ListRow className={cn('bg-background gap-2', isFirst ? 'rounded-tl-md rounded-tr-md' : '')}>
    {children}
  </ListRow>
)

export const ListHeader = () => {
  return <ListRow className={cn('bg-background gap-3', 'rounded-tl-md rounded-tr-md')}></ListRow>
}

export const ListHeaderSkeleton = () => {
  return (
    <Shell>
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-4" />
    </Shell>
  )
}
