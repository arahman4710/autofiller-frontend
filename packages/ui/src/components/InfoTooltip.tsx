import { Info } from '@phosphor-icons/react'
import { cn } from '@rag/ui/utils'

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

export const InfoTooltip = ({ className, message }: { className?: string; message?: string }) => {
  if (!message) return null

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className={cn('text-stone-304 pl-1', className)} size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
