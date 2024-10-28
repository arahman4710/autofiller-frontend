import { cn } from '@canyon/ui/utils'

interface ILoaderBarProps {
  className?: string
  containerClassName?: string
}

export const LoaderBar = ({ className, containerClassName }: ILoaderBarProps) => {
  return (
    <LoaderBarContainer className={containerClassName}>
      <div
        className={cn(
          'translate-3d-0 relative flex h-[4px] w-full transform items-center justify-center overflow-hidden rounded-[2.5px]',
          className
        )}
      >
        <div className="duration-600 absolute inset-0 bg-white opacity-10 transition-colors"></div>
        <div className="animate-loader-drag duration-600 absolute inset-0 rounded-[2.5px] bg-white transition-colors"></div>
      </div>
    </LoaderBarContainer>
  )
}

const LoaderBarContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex w-full items-center justify-center px-6 py-8', className)}>
      {children}
    </div>
  )
}
