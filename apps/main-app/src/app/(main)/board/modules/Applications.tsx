'use client'

import { useMemo, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@canyon/ui/ContextMenu'
import { Draggable } from '@canyon/ui/Draggable'
import { IconText } from '@canyon/ui/IconText'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { ArrowsOutCardinal, BoxArrowDown, BoxArrowUp, PlusCircle } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  Applications_UpdateUsersJobDocument,
  Applications_UpdateUsersJobStatusDocument,
  Applications_UsersJobsDocument,
  Applications_UsersJobsQuery,
  UsersJobsStatusEnum,
} from '@gql/graphql'

import { EmptyPageView } from '@/components/EmptyPageView'
import { NewApplicationDialog } from '@/components/dialogs/NewApplicationDialog'
import { statusTitles } from '@/constants/usersJobStatus'
import { useQueryParams } from '@/hooks/useQueryParams'
import { trackEvent } from '@/lib/utils/analytics'
import { useAppConfigStore } from '@/store/appConfigStore'
import { TViewQueryParam } from '@/types/navigation'

import { ApplicationCard } from '../components/ApplicationCard'
import { HiddenStatusColumn } from '../components/HiddenStatusColumn'
import { StatusColumn, StatusHeader } from '../components/StatusColumn'

export const Shell = ({ children }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div className="flex h-full flex-row gap-6">{children}</div>
)

export const Applications = ({}) => {
  const router = useRouter()
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const hiddenStatusColumns = useAppConfigStore((state) => state.hiddenApplicationStatusColumns)

  const [openNewApplicationDialog, setOpenNewApplicationDialog] = useState<boolean>(false)
  const [activeApplicationDraggable, setActiveApplicationDraggable] = useState<null | string>(null)

  // Enables preservation of the onClick behavior by only activating dragging when dragged a certain distance
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    })
  )

  const viewQueryParam = queryParams?.get('view')
  const { data } = useSuspenseQuery(Applications_UsersJobsDocument, {
    variables: {
      archived: viewQueryParam === 'archived',
    },
  })
  const [updateUsersJobStatus] = useMutation(Applications_UpdateUsersJobStatusDocument)
  const [updateUsersJob] = useMutation(Applications_UpdateUsersJobDocument)

  const archiveApplication = async (applicationId: string, archived = true) => {
    await updateUsersJob({
      optimisticResponse: {
        //  @ts-ignore - only updating partial fields
        updateUsersJob: {
          __typename: 'UsersJobs',
          archived,
          id: applicationId,
        },
      },
      variables: {
        archived,
        id: applicationId,
      },
    })
  }

  const updateApplicationStatus = async (applicationId: string, status: UsersJobsStatusEnum) => {
    await updateUsersJobStatus({
      optimisticResponse: {
        //  @ts-ignore - only updating partial fields
        updateUsersJob: {
          __typename: 'UsersJobs',
          id: applicationId,
          status,
        },
      },
      variables: {
        id: applicationId,
        status,
      },
    })
  }

  const archiveFilter = (applications: Array<Applications_UsersJobsQuery['usersJobs'][0]>) =>
    applications.filter((app) => {
      return (
        (viewQueryParam === 'archived' && app.archived) ||
        (viewQueryParam !== 'archived' && !app.archived)
      )
    })

  const statusColumns = useMemo(() => {
    const onApplicationCardClick = (applicationId: string) => {
      trackEvent('User clicked on an application')
      router.push(`/board/${applicationId}`)
    }

    const statusColumnOrder: Array<
      [UsersJobsStatusEnum, Array<Applications_UsersJobsQuery['usersJobs'][0]>]
    > = [
      [UsersJobsStatusEnum.Wishlist, []],
      [UsersJobsStatusEnum.Applied, []],
      [UsersJobsStatusEnum.Interview, []],
      [UsersJobsStatusEnum.Offer, []],
      [UsersJobsStatusEnum.Rejected, []],
    ]

    archiveFilter(data.usersJobs).forEach((job) => {
      const status = job.status
      const applications = statusColumnOrder.find(([s]) => s === status)?.[1]

      if (applications) {
        applications.push(job)
      }
    })

    return statusColumnOrder.map(([status, applications]) =>
      !hiddenStatusColumns.includes(status) ? (
        <StatusColumn id={status} key={status}>
          <StatusHeader applicationsCount={applications.length} status={status} />
          {applications.map((app) => {
            if (activeApplicationDraggable === app.id) return null

            return (
              <Draggable id={app.id} key={app.id}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <ApplicationCard
                      {...app}
                      className="cursor-pointer"
                      key={app.id}
                      onClick={() => onApplicationCardClick(app.id)}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>
                        <IconText leftIcon={<ArrowsOutCardinal />}>Status</IconText>
                      </ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuRadioGroup value={app.status}>
                          {Object.entries(statusTitles).map(([key, value]) => (
                            <ContextMenuRadioItem
                              key={key}
                              onClick={() =>
                                updateApplicationStatus(app.id, key as UsersJobsStatusEnum)
                              }
                              value={key as UsersJobsStatusEnum}
                            >
                              <IconText
                                leftIcon={<div className={`h-2 w-2 rounded-full ${value.color}`} />}
                              >
                                {value.title}
                              </IconText>
                            </ContextMenuRadioItem>
                          ))}
                        </ContextMenuRadioGroup>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => archiveApplication(app.id, !app.archived)}>
                      {app.archived ? (
                        <IconText leftIcon={<BoxArrowUp />}>Restore Application</IconText>
                      ) : (
                        <IconText leftIcon={<BoxArrowDown />}>Archive Application</IconText>
                      )}
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </Draggable>
            )
          })}
        </StatusColumn>
      ) : null
    )
  }, [data, activeApplicationDraggable, hiddenStatusColumns])

  const hiddenStatusColumn = useMemo(() => {
    const hiddenStatusColumnOrder: Array<
      [UsersJobsStatusEnum, Array<Applications_UsersJobsQuery['usersJobs'][0]>]
    > = [
      [UsersJobsStatusEnum.Rejected, []],
      [UsersJobsStatusEnum.Offer, []],
      [UsersJobsStatusEnum.Interview, []],
      [UsersJobsStatusEnum.Applied, []],
      [UsersJobsStatusEnum.Wishlist, []],
    ]

    if (!hiddenStatusColumns.length) return null

    archiveFilter(data.usersJobs).forEach((job) => {
      const status = job.status
      const applications = hiddenStatusColumnOrder.find(([s]) => s === status)?.[1]

      if (applications) {
        applications.push(job)
      }
    })

    const columns = hiddenStatusColumnOrder.map(([status, applications]) =>
      hiddenStatusColumns.includes(status)
        ? {
            applicationsCount: applications.length,
            status,
          }
        : null
    )

    return <HiddenStatusColumn columns={columns} hiddenColumnsCount={hiddenStatusColumns.length} />
  }, [data, hiddenStatusColumns])

  const onDragStart = ({ active }) => {
    const activeId = active.id
    setActiveApplicationDraggable(activeId)
  }

  const onDragEnd = async ({ active, over }) => {
    const activeId = active?.id
    const overId = over?.id

    const application = data?.usersJobs.find((job) => job.id === activeId)

    setActiveApplicationDraggable(null)

    if (!overId || application?.status === overId) return

    await updateApplicationStatus(activeId, overId)
  }

  const renderDraggableApplicationCard = () => {
    if (!activeApplicationDraggable) return null

    const application = data?.usersJobs.find(
      (application) => application.id === activeApplicationDraggable
    )

    return application ? <ApplicationCard className="cursor-grabbing" {...application} /> : null
  }

  return (
    <Shell>
      <DndContext
        autoScroll={{ acceleration: 2, layoutShiftCompensation: false }}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        sensors={sensors}
      >
        {data?.usersJobs?.length ? (
          <div className="flex snap-x flex-row gap-4">
            {statusColumns}
            {hiddenStatusColumn}
          </div>
        ) : (
          <EmptyPageView
            button={{
              children: 'New Job Application',
              leftIcon: <PlusCircle size={16} weight="bold" />,
              onClick: () => setOpenNewApplicationDialog(!openNewApplicationDialog),
            }}
            subtitle="Track job applications and use our AI features to help optimize applications and prepare for interviews"
            title="Add a new job application to get started"
          />
        )}
        <DragOverlay>{renderDraggableApplicationCard()}</DragOverlay>
      </DndContext>
      <NewApplicationDialog open={openNewApplicationDialog} setOpen={setOpenNewApplicationDialog} />
    </Shell>
  )
}
