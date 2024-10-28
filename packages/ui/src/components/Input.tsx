import { forwardRef } from 'react'

import { cn } from '@rag/ui/utils/cn'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endSlot?: React.ReactElement
  startSlot?: React.ReactElement
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, endSlot, startSlot, type, ...props }, ref) => {
    const StartSlot = startSlot
    const EndSlot = endSlot

    return (
      <div className="relative flex w-full items-center justify-center">
        <input
          className={cn(
            'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring peer flex h-10 w-full rounded-md border bg-transparent px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            startSlot ? 'pl-8' : '',
            endSlot ? 'pr-8' : '',
            className
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {StartSlot && <div className="pointer-events-none absolute left-2.5">{StartSlot}</div>}
        {endSlot && <div className="absolute right-2.5">{EndSlot}</div>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
