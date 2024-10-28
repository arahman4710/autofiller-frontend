import { cn } from '../utils'

interface IEmptySpaceProps {
  className?: string
}

export const EmptySpace = ({ className }: IEmptySpaceProps) => {
  return <div className={cn('', className)} />
}
