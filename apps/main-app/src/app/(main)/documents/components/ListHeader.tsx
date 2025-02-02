import { Dot, IDotProps } from '@autofiller/ui/Dot'
import { Skeleton } from '@autofiller/ui/Skeleton'
import { cn } from '@autofiller/ui/utils/cn'

import { ListRow } from './ListRow'

type TListHeaderTitle = 'Active' | 'Archived' | 'Drafts'

interface IListHeaderProps {
  isFirst?: boolean
  title: TListHeaderTitle
}

const Shell = ({
  children,
  isFirst,
}: { isFirst?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <ListRow className={cn('bg-background gap-2', isFirst ? 'rounded-tl-md rounded-tr-md' : '')}>
    {children}
  </ListRow>
)

export const ListHeader = ({ isFirst, title }: IListHeaderProps) => {
  const dotProps: Record<
    TListHeaderTitle,
    { borderColor: string; dotColor: string; variant: IDotProps['variant'] }
  > = {
    Active: {
      borderColor: 'border-green-500',
      dotColor: 'bg-green-500',
      variant: 'full',
    },
    Archived: {
      borderColor: 'border-gray-500',
      dotColor: 'bg-gray-500',
      variant: 'half',
    },
    Drafts: {
      borderColor: 'border-yellow-500',
      dotColor: 'bg-yellow-500',
      variant: 'half',
    },
  }

  const dot = dotProps[title]

  return (
    <ListRow className={cn('bg-background gap-3', isFirst ? 'rounded-tl-md rounded-tr-md' : '')}>
      <Dot borderColor={dot.borderColor} dotColor={dot.dotColor} variant={dot.variant} />
      {title}
    </ListRow>
  )
}