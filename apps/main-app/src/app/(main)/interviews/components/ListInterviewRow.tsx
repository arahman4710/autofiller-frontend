import { Gauge } from '@canyon/ui/Gauge'
import { IconText } from '@canyon/ui/IconText'
import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'
import { formatDate } from '@canyon/utils'
import { ChatText } from '@phosphor-icons/react'
import Link from 'next/link'

import { IListRowProps, ListRow } from './ListRow'

interface IListResumeRowProps {
  createdAt: Date
  interviewId: string
  interviewScore?: Maybe<number>
  interviewTitle: string
  interviewType: string
  isLast?: boolean
}

export const ListInterviewRow = ({
  createdAt,
  interviewId,
  interviewScore,
  interviewTitle,
  interviewType,
  isLast,
}: IListResumeRowProps) => {
  return (
    <Link href={`/interviews/${interviewId}`}>
      <Shell isLast={isLast}>
        <IconText
          className="gap-3 font-mono"
          leftIcon={<ChatText className="text-muted-foreground text-lg" />}
        >
          <div>
            {interviewTitle || <span className="text-muted-foreground">(empty title)</span>}
            <p className="text-muted-foreground mt-1 text-sm">{interviewType}</p>
          </div>
        </IconText>
        <div className="flex items-center">
          <div className="text-text-muted mr-4 text-right text-sm">
            {interviewScore && <Gauge value={interviewScore} />}
          </div>
        </div>
      </Shell>
    </Link>
  )
}

const Shell = ({ children, isLast }: { isLast?: boolean } & IListRowProps) => {
  return (
    <ListRow
      className={cn(
        'hover:bg-background/50 flex flex-row items-center justify-between px-6  text-sm',
        !isLast ? 'border-b border-stone-800' : null
      )}
    >
      {children}
    </ListRow>
  )
}

export const ListInterviewRowSkeleton = () => {
  return (
    <Shell>
      <IconText className="gap-3" leftIcon={<Skeleton className="h-4 w-4" />}>
        <Skeleton className="h-5 w-[200px]" />
      </IconText>
    </Shell>
  )
}
