import { cn } from '../utils'

interface IOrDividerProps {
  className?: string
}

export const OrDivider = ({ className }: IOrDividerProps) => {
  return (
    <div className={cn('my-2 flex items-center justify-center gap-2', className)}>
      <hr className="border-muted mx-2 flex-grow" />
      <span className="text-muted text-sm uppercase">or</span>
      <hr className="border-muted mx-2 flex-grow" />
    </div>
  )
}
