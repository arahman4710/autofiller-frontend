import { CoinVertical } from '@phosphor-icons/react'
import { Button } from '@autofiller/ui/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@autofiller/ui/Tooltip'

import { SubscriptionPlanEnum } from '@/gql/__generated__/graphql'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'

interface IUpsellProps {
  buttonText: string
  disabled?: boolean
  loading: boolean
  onClick: () => Promise<void>
  plan?: SubscriptionPlanEnum
  token?: number
}

export const Upsell = ({
  buttonText,
  disabled = false,
  loading,
  onClick,
  plan,
  token = 0,
}: IUpsellProps) => {
  const upgradePlanDialog = useUpgradePlanDialog()

  const onButtonClick = async () => {
    if (token == undefined || (token <= 0 && plan == SubscriptionPlanEnum.Free)) {
      upgradePlanDialog.setOpen(true)
    } else {
      await onClick()
    }
  }

  return (
    <div className="flex">
      <Button
        className="mr-1"
        disabled={disabled}
        loading={loading}
        onClick={onButtonClick}
        variant="cta"
      >
        {loading ? 'Generating...' : buttonText}
      </Button>
      {plan == SubscriptionPlanEnum.Free && (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="border-secondary text-muted-foreground flex h-8 w-12 items-center justify-between rounded-full border pl-[9px] pr-[9px] leading-8">
              <CoinVertical />
              <span className="pointer-events-none"> {token} </span>
            </p>
          </TooltipTrigger>
          <TooltipContent>
            You have {token} uses left. Upgrade to Pro plan for unlimited usage.
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
