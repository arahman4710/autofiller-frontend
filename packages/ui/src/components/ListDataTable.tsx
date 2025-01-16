import { EmptyState } from '@autofiller/ui/EmptyState'
import { LoaderBar } from '@autofiller/ui/LoaderBar'
import { ScrollArea } from '@autofiller/ui/ScrollArea'

interface IItem {
  [key: string]: unknown
  id: string
}

type TKeysOfIItemExceptId<T extends IItem> = Exclude<keyof T, 'id'>

interface IListDataTableProps<T extends IItem> {
  emptyRow?: React.ReactNode
  emptyState?: {
    children?: React.ReactNode
    description?: string
    title?: string
  }
  groupBy: TKeysOfIItemExceptId<T>
  groupOrder?: string[]
  groupTitles?: Partial<Record<string, { count?: number; icon?: React.ReactNode; title: string }>>
  isLoading?: boolean
  itemRow: (item: T, isLast: boolean) => React.ReactNode
  items: T[]
}

const groupItems = <T extends IItem>(items: T[], groupBy: keyof T): Record<string, T[]> => {
  return items.reduce(
    (acc, item) => {
      const key = String(item[groupBy])
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}

export const ListDataTable = <T extends IItem>({
  emptyRow,
  emptyState,
  groupBy,
  groupOrder,
  groupTitles,
  isLoading = false,
  itemRow,
  items,
}: IListDataTableProps<T>) => {
  const groupedItems = groupItems(items, groupBy)
  const emptyStateTitle = emptyState?.title ?? 'No items'
  const emptyStateDescription = emptyState?.description ?? 'No items to display'
  const emptyStateChildren = emptyState?.children ?? null

  const sortedGroupedItems: [string, T[]][] = groupOrder
    ? groupOrder.map((group) => [group, groupedItems[group]])
    : Object.keys(groupedItems).map((group) => [group, groupedItems[group]])

  if (isLoading) {
    return <LoaderBar className="w-[400px]" />
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] w-full">
      {!Object.keys(groupedItems).length && (
        <EmptyState
          children={emptyStateChildren}
          description={emptyStateDescription}
          title={emptyStateTitle}
        />
      )}
      {Object.keys(groupedItems)?.length
        ? sortedGroupedItems.map(([groupValue, groupItems]) => {
            const groupHeader = groupTitles && groupTitles[groupValue as keyof typeof groupTitles]
            const groupTitle = groupHeader?.title ?? String(groupValue)
            const groupIcon = groupHeader?.icon ?? null
            const groupCount = groupHeader?.count ?? groupItems?.length

            return (
              <div key={String(groupValue)}>
                <div className="bg-background flex w-full items-center gap-3 px-6 py-3">
                  {groupIcon} {groupTitle}{' '}
                  {groupCount && <span className="text-muted-foreground">{groupCount}</span>}
                </div>
                <div className="flex flex-col">
                  {groupItems?.map((item, index) => (
                    <div key={item.id}>{itemRow(item, index === groupItems.length - 1)}</div>
                  ))}
                  {!groupItems?.length && emptyRow ? emptyRow : null}
                </div>
              </div>
            )
          })
        : null}
    </ScrollArea>
  )
}
