'use client'

import { useQuery } from '@apollo/client'
import { Dot } from '@canyon/ui/Dot'
import { ListDataTable } from '@canyon/ui/ListDataTable'
import { TagPill } from '@canyon/ui/TagPill'
import { cn } from '@canyon/ui/utils'
import { formatDate } from '@canyon/utils'

import { ClientBoard_ClientUsersJobsDocument, UsersJobsStatusEnum } from '@gql/graphql'

import { statusTitles } from '@/constants/usersJobStatus'
import { getApplicationTags } from '@/utils/getApplicationTags'

interface IClientBoardProps {
  clientId: string
}

export const ClientBoard = ({ clientId }: IClientBoardProps) => {
  const { data, loading } = useQuery(ClientBoard_ClientUsersJobsDocument, {
    variables: {
      archived: false,
      clientId,
    },
  })

  const jobs = data?.clientUsersJobs || []

  const statusGroupTitles: Record<UsersJobsStatusEnum, { icon: React.ReactNode; title: string }> = {
    [UsersJobsStatusEnum.Applied]: {
      icon: (
        <Dot
          borderColor={statusTitles[UsersJobsStatusEnum.Applied].borderColor}
          dotColor={statusTitles[UsersJobsStatusEnum.Applied].color}
          variant="full"
        />
      ),
      title: statusTitles[UsersJobsStatusEnum.Applied].title,
    },
    [UsersJobsStatusEnum.Interview]: {
      icon: (
        <Dot
          borderColor={statusTitles[UsersJobsStatusEnum.Interview].borderColor}
          dotColor={statusTitles[UsersJobsStatusEnum.Interview].color}
          variant="full"
        />
      ),
      title: statusTitles[UsersJobsStatusEnum.Interview].title,
    },
    [UsersJobsStatusEnum.Offer]: {
      icon: (
        <Dot
          borderColor={statusTitles[UsersJobsStatusEnum.Offer].borderColor}
          dotColor={statusTitles[UsersJobsStatusEnum.Offer].color}
          variant="full"
        />
      ),
      title: statusTitles[UsersJobsStatusEnum.Offer].title,
    },
    [UsersJobsStatusEnum.Rejected]: {
      icon: (
        <Dot
          borderColor={statusTitles[UsersJobsStatusEnum.Rejected].borderColor}
          dotColor={statusTitles[UsersJobsStatusEnum.Rejected].color}
          variant="full"
        />
      ),
      title: statusTitles[UsersJobsStatusEnum.Rejected].title,
    },
    [UsersJobsStatusEnum.Wishlist]: {
      icon: (
        <Dot
          borderColor={statusTitles[UsersJobsStatusEnum.Wishlist].borderColor}
          dotColor={statusTitles[UsersJobsStatusEnum.Wishlist].color}
          variant="full"
        />
      ),
      title: statusTitles[UsersJobsStatusEnum.Wishlist].title,
    },
  }

  const statusSectionOrder = [
    UsersJobsStatusEnum.Applied,
    UsersJobsStatusEnum.Interview,
    UsersJobsStatusEnum.Offer,
    UsersJobsStatusEnum.Rejected,
    UsersJobsStatusEnum.Wishlist,
  ]

  return (
    <ListDataTable
      emptyRow={
        <BoardRow isLastItem>
          <span className="text-muted-foreground ml-8 italic">Empty</span>
        </BoardRow>
      }
      emptyState={{
        description: `Any applications will appear here.`,
        title: 'No applications',
      }}
      groupBy="status"
      groupOrder={statusSectionOrder}
      groupTitles={statusGroupTitles}
      isLoading={loading}
      itemRow={(item, isLastItem) => (
        <BoardRow isLastItem={isLastItem}>
          <div className="flex items-center gap-3">
            <Dot borderColor="border-transparent" dotColor="bg-background-contrast" />
            <div className="flex items-center gap-3">
              <div>{item.companyName}</div>
              <div className="text-muted-foreground">{item.position}</div>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-5 text-sm">
            <div className="flex gap-3">
              {getApplicationTags(item).map((tag, index) => (
                <TagPill key={index} {...tag} />
              ))}
            </div>
            <div>{formatDate(item.createdAt, 'MM/dd/yy')}</div>
          </div>
        </BoardRow>
      )}
      items={jobs}
    />
  )
}

const BoardRow = ({
  children,
  isLastItem,
}: {
  children: React.ReactNode
  isLastItem?: boolean
}) => {
  return (
    <div
      className={cn(
        'bg-background/50 flex w-full items-center justify-between px-6 py-3',
        !isLastItem ? 'border-border-muted border-b' : ''
      )}
    >
      {children}
    </div>
  )
}
