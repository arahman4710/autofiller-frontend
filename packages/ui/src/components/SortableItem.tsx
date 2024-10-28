import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import type { CSSProperties, PropsWithChildren } from 'react'

import { createContext, useContext, useMemo } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical } from '@phosphor-icons/react'

interface ISortableItemProps {
  id: UniqueIdentifier
  isDraggableNode?: boolean
}

interface IContext {
  attributes: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  isDragging: boolean
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<IContext>({
  attributes: {},
  isDragging: false,
  listeners: undefined,
  ref() {},
})

export function SortableItem({
  children,
  id,
  isDraggableNode = true,
}: PropsWithChildren<ISortableItemProps>) {
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      isDragging,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef, isDragging]
  )

  const style: CSSProperties = {
    cursor: isDraggableNode ? (isDragging ? 'grabbing' : 'grab') : undefined,
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <div
        ref={setNodeRef}
        style={style}
        {...(isDraggableNode ? { ...attributes, ...listeners } : {})}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  )
}

interface IDragHandleProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: number
}
// set isDraggableNode in SortableItem to false to make the main node not draggable
export const DragHandle = ({ size = 16, ...props }: IDragHandleProps) => {
  const { attributes, isDragging, listeners, ref } = useContext(SortableItemContext)

  return (
    <button
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // 'grabbing' cursor doesn't work
      type="button"
      {...props}
    >
      <DotsSixVertical size={size} />
    </button>
  )
}
