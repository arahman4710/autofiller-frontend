import { cn } from '@canyon/ui/utils/cn'

export interface IListRowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ListRow = ({ children, className, ...props }: IListRowProps) => {
  return (
    <div
      className={cn('flex min-h-9 w-full flex-row items-center px-6 py-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}
