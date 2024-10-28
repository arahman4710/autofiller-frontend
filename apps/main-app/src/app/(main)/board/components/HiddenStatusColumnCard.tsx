import { Button } from '@rag/ui/Button'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverTrigger,
} from '@rag/ui/Popover'
import { cn } from '@rag/ui/utils/cn'
import { useDroppable } from '@dnd-kit/core'
import { DotsThree } from '@phosphor-icons/react'

import { UsersJobsStatusEnum } from '@gql/graphql'

import { statusTitles } from '@/constants/usersJobStatus'
import { trackEvent } from '@/lib/utils/analytics'
import { useAppConfigStore } from '@/store/appConfigStore'

import { Shell as ApplicationCardShell } from './ApplicationCard'

interface IHiddenStatusColumnCardProps {
  applicationsCount: number
  id?: string
  status: UsersJobsStatusEnum
}

export const HiddenStatusColumnCard = ({
  applicationsCount,
  id,
  status,
}: IHiddenStatusColumnCardProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id ?? 'droppable',
  })

  const showApplicationStatusColumns = useAppConfigStore(
    (state) => state.showApplicationStatusColumns
  )

  const statusTitle = statusTitles[status]
  const statusCircleColor = statusTitle?.color ?? 'bg-stone-300'

  const handleShowColumn = () => {
    showApplicationStatusColumns([status])
    trackEvent('User un-hid a status column')
  }

  const droppableStyle = isOver ? 'border-accent bg-background-contrast/90' : null

  return (
    <ApplicationCardShell
      className={cn('max-w-[270px] select-none', droppableStyle)}
      id={id}
      ref={setNodeRef}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className={cn(`h-2 w-2 rounded-full`, statusCircleColor)} />
          <div className="text-muted-foreground">{statusTitle.title}</div>
          {applicationsCount > 0 ? (
            <div className="text-muted-foreground pl-1 text-sm">{applicationsCount}</div>
          ) : null}
        </div>
        <Popover>
          <PopoverTrigger>
            <Button variant="action">
              <DotsThree />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <PopoverMenu>
              <PopoverMenuItem onClick={handleShowColumn}>Show column</PopoverMenuItem>
            </PopoverMenu>
          </PopoverContent>
        </Popover>
      </div>
    </ApplicationCardShell>
  )
}
