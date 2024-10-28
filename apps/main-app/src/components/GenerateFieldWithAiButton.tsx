import { EnhanceAIButton, IEnhanceAIButtonProps } from '@rag/ui/EnhanceAIButton'

import { SubscriptionPlanEnum } from '@gql/graphql'

import { TTokenTypes, useCurrentUser } from '@/hooks/useCurrentUser'

interface IGenerateFieldWithAiButtonProps extends IEnhanceAIButtonProps {
  field: TTokenTypes
  isPublic: boolean
  setShowUpgradePlanDialog: (boolean) => void
  tooltipMessage?: string
}

export const GenerateFieldWithAiButton = ({
  disabled = false,
  field,
  isPublic,
  loading,
  onClick,
  setShowUpgradePlanDialog,
  tooltipMessage = '',
}: IGenerateFieldWithAiButtonProps) => {
  const { plan, tokens } = useCurrentUser()
  const isSubscriptionPlanFree = plan === SubscriptionPlanEnum.Free

  const tokenCount = tokens?.[field] ?? 0
  const onButtonClick = async (e) => {
    if (tokenCount <= 0 && isSubscriptionPlanFree) {
      setShowUpgradePlanDialog(true)
    } else {
      await onClick?.(e)
    }
  }

  const tooltipMsg = isPublic ? 'Sign up to enhance your resume with AI' : tooltipMessage

  return (
    <EnhanceAIButton
      disabled={isPublic || disabled}
      loading={loading}
      onClick={onButtonClick}
      showTokenCount={isSubscriptionPlanFree}
      size="sm"
      tokenCount={tokenCount}
      tooltipMessage={tooltipMsg}
    />
  )
}
