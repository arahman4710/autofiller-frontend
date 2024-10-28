import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface IDraggable {
  children: React.ReactNode
  element?: React.ElementType
  enableTransform?: boolean
  id: string
  touchAction?: 'auto' | 'none'
}

export const Draggable = ({
  children,
  element,
  enableTransform = false,
  id,
  touchAction,
}: IDraggable) => {
  const Element = element || 'div'
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = {
    ...(enableTransform ? { transform: CSS.Translate.toString(transform) } : {}),
    ...(touchAction ? { touchAction } : { touchAction: 'none' }),
  }

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </Element>
  )
}
