import type { DropAnimation } from '@dnd-kit/core'
import type { PropsWithChildren } from 'react'

import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
}

interface ISortableOverProps {}

export function SortableOverlay({ children }: PropsWithChildren<ISortableOverProps>) {
  return <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
}
