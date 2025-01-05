import { useMutation } from '@apollo/client'
import { useToast } from '@rag/ui/useToast'
import { useRouter } from 'next/navigation'

import {
  SubscriptionPlanEnum,
  UseBillingPlan_BillingPortalUrlDocument,
  UseBillingPlan_SubscriptionSessionCreateDocument,
} from '@gql/graphql'

import { TBillingPlanFrequency } from '@/types/pricing'

export const useBillingPlan = () => {
  const router = useRouter()
  const { errorToast } = useToast()

  const [createSubscriptionSession] = useMutation(UseBillingPlan_SubscriptionSessionCreateDocument)

  const handleCreateSubscription = async ({ plan }: { plan: SubscriptionPlanEnum }) => {
    const { data, errors } = await createSubscriptionSession({
      variables: {
        plan,
      },
    })

    const url = data?.subscriptionsSessionCreate

    if (!url || errors?.length) {
      errorToast()
      return
    }

    router.push(url)
  }

  const [billingPortalUrl] = useMutation(UseBillingPlan_BillingPortalUrlDocument, {})

  const handleManageSubscription = async () => {
    const { data } = await billingPortalUrl()

    const url = data?.billingPortalUrl
    window.open(url, '_blank')?.focus()
  }

  return {
    createSubscription: ({ plan }: { plan: SubscriptionPlanEnum }) =>
      handleCreateSubscription({ plan }),
    manageSubscription: handleManageSubscription,
  }
}
