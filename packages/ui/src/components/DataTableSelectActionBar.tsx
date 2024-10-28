import { cloneElement } from 'react'

import { X } from 'lucide-react'

import { cn } from '../utils/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { IconText } from './IconText'

export type TSelectedRow = Partial<{ archived?: boolean; id?: string }>
export type TSelectionAction = {
  component: React.ReactNode
  enabled?: boolean
  handler: (selectedRows: TSelectedRow[], setSelectedRows: (rows: TSelectedRow[]) => void) => void
}

interface IDataTableSelectActionBarProps {
  actions: TSelectionAction[]
  clearSelectedRows: () => void
  open?: boolean
  selectedRowCount: number
  selectedRows: TSelectedRow[]
  setSelectedRows: (rows: TSelectedRow[]) => void
}

const OPEN_STATE = 'open'
const CLOSED_STATE = 'closed'

export const DataTableSelectActionBar = ({
  actions,
  clearSelectedRows,
  open,
  selectedRowCount,
  selectedRows,
  setSelectedRows,
}: IDataTableSelectActionBarProps) => {
  return (
    <div
      className="flex w-full items-center justify-center data-[state=open]:absolute data-[state=closed]:hidden"
      data-state={open ? OPEN_STATE : CLOSED_STATE}
    >
      <div
        className={cn(
          'border-border-muted bg-background bottom-[28px] left-0 right-0 z-10 flex min-h-[35px] w-fit items-center justify-between gap-4 rounded-lg border bg-opacity-70 px-4 py-2 backdrop-blur-xl backdrop-filter'
        )}
      >
        <IconText leftIcon={<Badge variant="notification">{selectedRowCount}</Badge>}>
          selected
        </IconText>

        {actions?.map((action) =>
          action.enabled ?? true
            ? cloneElement(action.component as React.ReactElement, {
                onClick: () => action.handler(selectedRows, setSelectedRows),
              })
            : null
        )}

        <Button onClick={clearSelectedRows} size="sm" variant="ghost">
          <X className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
