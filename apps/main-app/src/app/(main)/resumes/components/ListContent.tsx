import { cn } from '@rag/ui/utils/cn'

interface IListContentProps {
  center?: boolean
  children: React.ReactNode
}

export const ListContent = ({ center, children }: IListContentProps) => {
  return (
    <div
      className={cn(
        'bg-background/40 flex h-full w-full w-full flex-col',
        center ? 'items-center justify-center' : null
      )}
    >
      {children}
    </div>
  )
}
