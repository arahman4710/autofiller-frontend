import { WarningCircle } from '@phosphor-icons/react'

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

export const WarningTooltip = ({ warningMessage }: { warningMessage?: string }) => {
  if (!warningMessage) return null

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <WarningCircle className="pl-1 text-amber-500" size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{warningMessage}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
