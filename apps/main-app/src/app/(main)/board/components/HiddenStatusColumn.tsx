import { UsersJobsStatusEnum } from '@gql/graphql'

import { HiddenStatusColumnCard } from './HiddenStatusColumnCard'
import { StatusColumn, StatusHeaderShell } from './StatusColumn'

interface IHiddenStatusColumnProps {
  columns: ({ applicationsCount: number; status: UsersJobsStatusEnum } | null)[]
  hiddenColumnsCount: number
}

export const HiddenStatusColumn = ({ columns, hiddenColumnsCount }: IHiddenStatusColumnProps) => {
  return (
    <StatusColumn className="border-transparent px-0" disableDroppable={true}>
      <StatusHeaderShell className="h-8">
        <div className="flex h-full flex-row items-center gap-2">
          <div className="text-muted-foreground select-none">Hidden columns</div>
          {hiddenColumnsCount > 0 ? (
            <div className="text-muted-foreground pl-1 text-sm">{hiddenColumnsCount}</div>
          ) : null}
        </div>
      </StatusHeaderShell>
      {columns.map(
        (column) =>
          column && (
            <HiddenStatusColumnCard
              applicationsCount={column.applicationsCount}
              id={column.status}
              status={column.status}
            />
          )
      )}
    </StatusColumn>
  )
}
