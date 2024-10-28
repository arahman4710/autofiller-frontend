import { cn } from '../utils'

interface IVerticalGroupProps {
  children: React.ReactNode
  className?: string
}

export const VerticalGroup = ({ children, className }: IVerticalGroupProps) => {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>
}

interface IVerticalGroupRowProps {
  children: React.ReactNode
  className?: string
}
export const VerticalGroupRow = ({ children, className }: IVerticalGroupRowProps) => {
  return (
    <div className={cn('flex flex-row items-center justify-between gap-4', className)}>
      {children}
    </div>
  )
}

interface IVerticalGroupColumnProps {
  children: React.ReactNode
  className?: string
}
export const VerticalGroupColumn = ({ children, className }: IVerticalGroupColumnProps) => {
  return <div className={cn('flex flex-1 flex-col gap-2', className)}>{children}</div>
}

interface IVerticalGroupTitleProps {
  children: React.ReactNode
  className?: string
}

export const VerticalGroupTitle = ({ children, className }: IVerticalGroupTitleProps) => {
  return <span className={cn(className)}>{children}</span>
}

interface IVerticalGroupDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const VerticalGroupDescription = ({
  children,
  className,
}: IVerticalGroupDescriptionProps) => {
  return <p className={cn('text-muted-foreground', className)}>{children}</p>
}
