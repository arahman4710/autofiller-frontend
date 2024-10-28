'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverTrigger,
} from '@rag/ui/Popover'
import { Skeleton } from '@rag/ui/Skeleton'
import { cn } from '@rag/ui/utils/cn'
import { useDroppable } from '@dnd-kit/core'
import { DotsThree, Plus } from '@phosphor-icons/react'

import { UsersJobsStatusEnum } from '@gql/graphql'

import { NewApplicationDialog } from '@/components/dialogs/NewApplicationDialog'
import { statusTitles } from '@/constants/usersJobStatus'
import { useAppConfigStore } from '@/store/appConfigStore'

interface IStatusColumnProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  disableDroppable?: boolean
}

export const StatusColumn = ({
  children,
  className,
  disableDroppable,
  id,
  ...props
}: IStatusColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    disabled: disableDroppable || false,
    id: id ?? 'droppable',
  })

  const droppableStyle = isOver ? 'h-full bg-stone-900/90' : null
  return (
    <div
      className={cn(
        'flex h-full max-h-fit w-[325px] min-w-[320px] snap-center flex-col gap-4 overflow-auto rounded-md border border-stone-700 p-4 md:snap-align-none',
        droppableStyle,
        className
      )}
      ref={setNodeRef}
      {...props}
    >
      {children}
    </div>
  )
}

interface IStatusHeaderProps {
  applicationsCount: number
  isHidden?: boolean
  status: UsersJobsStatusEnum
}

export const StatusHeaderShell = ({
  children,
  className,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-row items-center justify-between', className)}>{children}</div>
)

export const StatusHeader = ({ applicationsCount, status }: IStatusHeaderProps) => {
  const hideStatusColumn = useAppConfigStore((state) => state.hideApplicationStatusColumns)
  const [openNewApplicationDialog, setOpenNewApplicationDialog] = useState<boolean>(false)

  const statusTitle = statusTitles[status]
  const statusCircleColor = statusTitle?.color ?? 'bg-stone-300'

  const handleHideStatusColumn = () => hideStatusColumn([status])

  return (
    <StatusHeaderShell>
      <div className="flex items-center gap-2">
        <div className={cn(`h-2 w-2 rounded-full`, statusCircleColor)}></div>
        <div className="select-none text-stone-200">{statusTitle?.title}</div>
        {applicationsCount > 0 ? (
          <div className="text-muted-foreground pl-1 text-sm">{applicationsCount}</div>
        ) : null}
      </div>
      <div className="flex flex-row gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="action">
              <DotsThree />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverMenu>
              <PopoverMenuItem onClick={handleHideStatusColumn}>Hide column</PopoverMenuItem>
            </PopoverMenu>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => setOpenNewApplicationDialog(!openNewApplicationDialog)}
          variant="action"
        >
          <Plus />
        </Button>
      </div>
      <NewApplicationDialog
        open={openNewApplicationDialog}
        preselectedStatus={status}
        setOpen={setOpenNewApplicationDialog}
      />
    </StatusHeaderShell>
  )
}

export const StatusHeaderSkeleton = () => (
  <StatusHeaderShell>
    <div className="flex items-center gap-4">
      <Skeleton className="h-2 w-2 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="flex flex-row gap-2">
      <Skeleton className="h-4 w-4 rounded-sm" />
      <Skeleton className="h-4 w-4 rounded-sm" />
    </div>
  </StatusHeaderShell>
)
