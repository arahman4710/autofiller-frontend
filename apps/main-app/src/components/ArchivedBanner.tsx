import { cn } from '@rag/ui/utils/cn'

interface IArchivedBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ArchivedBanner = ({ children, className, ...props }: IArchivedBannerProps) => {
  return (
    <div
      className={cn(
        'flex h-10 w-full w-full items-center rounded-md bg-zinc-600 p-4 text-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
