import { forwardRef } from 'react'

import { Sparkle } from '@phosphor-icons/react'

import { Button, IButtonProps } from './Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

export interface IEnhanceAIButtonProps extends IButtonProps {
  showTokenCount?: boolean
  tokenCount?: number
  tooltipMessage?: string
}

export const EnhanceAIButton = forwardRef<HTMLButtonElement, IEnhanceAIButtonProps>(
  ({ disabled, loading, onClick, showTokenCount, tokenCount, tooltipMessage, ...props }, ref) => {
    const defaultTooltipMessage = `Enhance selection with AI ${
      showTokenCount ? `– ${tokenCount} free tokens left` : ''
    } `

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="gap-2"
            disabled={disabled}
            leftIcon={<Sparkle className="text-yellow-400" weight="fill" />}
            loading={loading}
            onClick={onClick}
            ref={ref}
            rightIcon={
              showTokenCount && (
                <span className="rounded-md bg-violet-700 px-1.5 py-0.5 text-sm">{tokenCount}</span>
              )
            }
            variant="ai"
            {...props}
          >
            Enhance with AI
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-1">{tooltipMessage || defaultTooltipMessage}</div>
        </TooltipContent>
      </Tooltip>
    )
  }
)
