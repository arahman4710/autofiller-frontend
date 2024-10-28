import { forwardRef, useEffect, useState } from 'react'

import { Separator } from '@canyon/ui/Separator'
import { Skeleton } from '@canyon/ui/Skeleton'
import { TagPill } from '@canyon/ui/TagPill'
import { cn } from '@canyon/ui/utils/cn'
import { formatDate } from '@canyon/utils'

import { Applications_UsersJobsQuery } from '@gql/graphql'

import { getApplicationTags } from '@/utils/getApplicationTags'

export const Shell = forwardRef<HTMLDivElement, React.HtmlHTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'border-border-secondary bg-background-contrast hover:bg-background-contrast/90 flex min-w-[270px] flex-col rounded-md border px-4 py-2',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

type TApplicationUserJob = Applications_UsersJobsQuery['usersJobs'][0]

interface IApplicationCard extends TApplicationUserJob {
  className?: string
  id: string
  onClick?: () => void
}

export const ApplicationCard = ({
  className,
  companyName,
  id,
  interviewStep,
  isRemote,
  location,
  onClick,
  partnerArchived,
  partnerCreatedByUser,
  position,
  rejectedStage,
  salaryMax,
  salaryMin,
  status,
  updatedAt,
}: IApplicationCard) => {
  const [parsedUpdatedAt, setParsedUpdatedAt] = useState<Date | null>(null)
  const formattedUpdatedAt = parsedUpdatedAt ? formatDate(parsedUpdatedAt, 'MM/dd/yy') : null

  useEffect(() => {
    setParsedUpdatedAt(new Date(updatedAt))
  }, [updatedAt])

  const applicationTags = getApplicationTags({
    interviewStep,
    isRemote,
    location,
    partnerArchived,
    partnerCreatedByUser,
    rejectedStage,
    salaryMax,
    salaryMin,
    status,
  })

  return (
    <Shell className={cn('touch-none select-none', className)} id={id} onClick={onClick}>
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row items-start gap-2.5">
          <div className="flex flex-col">
            <span>{companyName}</span>
            <span className="text-text-muted text-sm">{position}</span>
          </div>
        </div>
        <div className="text-text-muted mt-[4px] text-sm">
          <span>{formattedUpdatedAt}</span>
        </div>
      </div>
      {applicationTags.length ? (
        <div className="mb-2 flex flex-row flex-wrap gap-2">
          <Separator className="bg-border-secondary mb-1 mt-2.5" />
          {applicationTags.map((tag) => (
            <TagPill {...tag} />
          ))}
        </div>
      ) : null}
    </Shell>
  )
}

export const ApplicationCardSkeleton = () => (
  <Shell className="bg-transparent">
    <div className="flex flex-row items-center gap-2.5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </Shell>
)
