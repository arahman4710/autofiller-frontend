import { cn } from '../utils'

interface IGaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  value: number
}

export const Gauge = ({ className, isLoading, value, ...props }: IGaugeProps) => {
  let color = 'text-green-400'

  if (isLoading) {
    color = 'text-muted-foreground'
  } else if (value <= 75) {
    color = 'text-yellow-400'
  } else if (value <= 50) {
    color = 'text-red-400'
  }

  return (
    <div
      className={cn(
        'relative h-10 w-10 -rotate-180 select-none stroke-current stroke-2',
        color,
        className
      )}
      {...props}
    >
      <svg className={cn(isLoading && 'animate-spin')} viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          fill="none"
          r="10"
          strokeDasharray="0, 63, 63"
          strokeDashoffset={63 * (isLoading ? 0.5 : Math.max(value / 100, 0.05))}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" fill="none" opacity="0.25" r="10" />
      </svg>
      <div className="absolute left-0 top-0 flex h-full w-full rotate-180 items-center justify-center text-xs text-white">
        <span>{!isLoading && value}</span>
      </div>
    </div>
  )
}
