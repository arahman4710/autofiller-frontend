import type { Active, UniqueIdentifier } from '@dnd-kit/core'
import type { ReactNode } from 'react'

import { useMemo, useState } from 'react'

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'
import { SortableOverlay } from './SortableOverlay'

export interface IBaseItem {
  id: UniqueIdentifier
}

interface ISortableListProps<T extends IBaseItem> {
  items: T[]
  onChange(items: T[]): void
  renderItem(item: T, isActive: boolean, index: number): ReactNode
}

export const SortableList = <T extends IBaseItem>({
  items,
  onChange,
  renderItem,
}: ISortableListProps<T>) => {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items])
  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === active?.id),
    [active, items]
  )
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      onDragCancel={() => {
        setActive(null)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)

          onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      sensors={sensors}
    >
      <SortableContext items={items}>
        {items.map((item, index) => (
          <div key={item.id}>{renderItem(item, item === activeItem, index)}</div>
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem, true, activeIndex) : null}
      </SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
// SortableList.DragHandle = DragHandle
