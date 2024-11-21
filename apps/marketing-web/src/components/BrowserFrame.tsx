import { cn } from '@canyon/ui/utils/cn'

export const BrowserFrame = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div>
      <div
        className={cn(
          'flex h-6 items-center rounded-t-lg border border-gray-400 bg-transparent px-2',
          className
        )}
        {...props}
      >
        <div className="flex space-x-2">
          <div className="h-1 w-1 rounded-full bg-slate-400"></div>
          <div className="h-1 w-1 rounded-full bg-slate-400"></div>
          <div className="h-1 w-1 rounded-full bg-slate-400"></div>
        </div>
      </div>
      <div className="relative border-l border-r border-gray-400 p-4">{children}</div>
    </div>
  )
}
