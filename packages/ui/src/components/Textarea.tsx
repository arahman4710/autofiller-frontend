import { forwardRef } from 'react'

import { cn } from '../utils'

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'focus-visible:ring-ring border-input placeholder:text-muted-foreground flex min-h-[60px] w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
