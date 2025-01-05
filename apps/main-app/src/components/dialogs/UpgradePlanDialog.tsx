'use client'

import { useEffect, useState } from 'react'
import { createContext } from 'react'

import { ArrowCircleUp, CheckCircle } from '@phosphor-icons/react'
import { Badge } from '@rag/ui/Badge'
import { Button } from '@rag/ui/Button'
import { Card, CardContent } from '@rag/ui/Card'
import { Dialog, DialogContent } from '@rag/ui/Dialog'
import { Loader } from '@rag/ui/Loader'
import { SwitchTabs, SwitchTabsContent } from '@rag/ui/SwitchTabs'
import { cn } from '@rag/ui/utils/cn'
import { motion } from 'framer-motion'

import { SubscriptionPlanEnum } from '@gql/graphql'

import { useBillingPlan } from '@/hooks/useBillingPlan'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { trackEvent } from '@/lib/utils/analytics'

interface IUpgradePlanDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EVENT_PREFIX = 'Pricing Plan Dialog'

const UpgradePlanDialogContext = createContext<
  { open: boolean; setOpen: (open: boolean) => void } | undefined
>(undefined)

export const UpgradePlanDialog = ({ open, setOpen }: IUpgradePlanDialogProps) => {
  const [pricingPlanTab, setPricingPlanTab] = useState<string>('monthly')

  const { loading: currentUserIsLoading } = useCurrentUser()

  const handleBillingFrequencySwitch = (value: string) => {
    trackEvent(`${EVENT_PREFIX} - Toggled Billing Frequency`, { frequencyTo: value })
    setPricingPlanTab(value)
  }

  useEffect(() => {
    if (open) {
      trackEvent(`${EVENT_PREFIX} - Opened`)
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      trackEvent(`${EVENT_PREFIX} - Closed`)
    }

    setOpen(open)
  }

  return (
    <UpgradePlanDialogContext.Provider value={{ open, setOpen }}>
      <Dialog onOpenChange={handleOpenChange} open={open}>
        <DialogContent className="max-h-[940px]" title="Upgrade Plan" titleIcon={<ArrowCircleUp />}>
          {currentUserIsLoading ? (
            <Loader />
          ) : (
            <SwitchTabs
              className="flex flex-col items-center justify-center self-center"
              defaultValue="quarterly"
              onValueChange={handleBillingFrequencySwitch}
              value={pricingPlanTab}
            >
              {/* <SwitchTabsList>
                <SwitchTabsTrigger className="flex flex-row gap-2" value="quarterly">
                  Quarterly <Badge variant="discount">-14%</Badge>
                </SwitchTabsTrigger>
                <SwitchTabsTrigger value="monthly">Monthly</SwitchTabsTrigger>
              </SwitchTabsList> */}
              <div className="mt-1 flex flex-col gap-2">
                {/* <Alert className="text-center">
                  <span className="text-md mr-2.5">💫</span>
                  Supercharge your job search - join over 2,500+ Canyon Pro users in landing more
                  offers.
                </Alert> */}
                <SwitchTabsContent value="quarterly">
                  <PricingContent selectedPricing={pricingPlanTab} />
                </SwitchTabsContent>
                <SwitchTabsContent value="monthly">
                  <PricingContent selectedPricing={pricingPlanTab} />
                </SwitchTabsContent>
              </div>
            </SwitchTabs>
          )}
        </DialogContent>
      </Dialog>
    </UpgradePlanDialogContext.Provider>
  )
}

const PricingContent = ({ selectedPricing }: { selectedPricing: string }) => {
  return (
    <div className="space-y-6">
      <PricingPlanCards selectedPricing={selectedPricing} />
      {/* <div className="space-y-3">
        <div className="text-center font-semibold">Feature Comparison</div>
        <PricingTable className="max-h-[400px] overflow-y-auto" pricePerMonth={pricePerMonth} />
      </div> */}
    </div>
  )
}

const PricingPlanCards = ({ selectedPricing }: { selectedPricing: string }) => {
  const [isFreeCreateSubscriptionLoading, setIsFreeCreateSubscriptionLoading] =
    useState<boolean>(false)
  const [isHobbyCreateSubscriptionLoading, setIsHobbyCreateSubscriptionLoading] =
    useState<boolean>(false)
  const [isBasicCreateSubscriptionLoading, setIsBasicCreateSubscriptionLoading] =
    useState<boolean>(false)
  const [isProCreateSubscriptionLoading, setIsProCreateSubscriptionLoading] =
    useState<boolean>(false)

  const planToLoading = {
    [SubscriptionPlanEnum.Basic]: [
      isBasicCreateSubscriptionLoading,
      setIsBasicCreateSubscriptionLoading,
    ],
    [SubscriptionPlanEnum.Free]: [
      isFreeCreateSubscriptionLoading,
      setIsFreeCreateSubscriptionLoading,
    ],
    [SubscriptionPlanEnum.Hobby]: [
      isHobbyCreateSubscriptionLoading,
      setIsHobbyCreateSubscriptionLoading,
    ],
    [SubscriptionPlanEnum.Pro]: [isProCreateSubscriptionLoading, setIsProCreateSubscriptionLoading],
  }

  const { createSubscription } = useBillingPlan()
  const { plan: currentPlan } = useCurrentUser()

  const handleUpgradePlan = (plan) => {
    planToLoading[plan][1](true)

    trackEvent(`${EVENT_PREFIX} - clicked Upgraded to Pro`, { frequency: selectedPricing })

    createSubscription({
      plan,
    })
  }

  const freeFeatures = [
    '1 User',
    'Max of either 2 page check creations or 10 page check runs',
    'Email notifications',
  ]

  const hobbyFeatures = [
    'All Free features + ',
    '1 User',
    '60 Page Check Runs/month',
    'Unlimited Manual Page Check Runs',
    'Email + SMS notifications',
  ]

  const basicFeatures = [
    'All Hobby features + ',
    'Unlimited Team Members',
    '250 Page Check Runs/month',
    'Notifications to over 50+ destinations (email, SMS, Slack, etc.)',
  ]

  const proFeatures = ['All Basic features + ', '1000 Page Check Runs/month']

  const planToFeatures = [
    {
      features: freeFeatures,
      plan: SubscriptionPlanEnum.Free,
      pricePerMonth: '0',
      title: 'Free',
    },
    {
      features: hobbyFeatures,
      plan: SubscriptionPlanEnum.Hobby,
      pricePerMonth: '10',
      title: 'Hobby',
    },
    {
      features: basicFeatures,
      plan: SubscriptionPlanEnum.Basic,
      pricePerMonth: '25',
      title: 'Basic',
    },
    {
      features: proFeatures,
      plan: SubscriptionPlanEnum.Pro,
      pricePerMonth: '75',
      title: 'Pro',
    },
  ]

  return (
    <div className="flex flex-row justify-center gap-3">
      {planToFeatures.map(({ features, plan, pricePerMonth, title }) => (
        <PricingPlanCard
          button={
            plan !== SubscriptionPlanEnum.Free &&
            (plan === currentPlan ? (
              <Button
                disabled={true}
                fullWidth={true}
                loading={
                  typeof planToLoading[plan][0] === 'boolean' ? planToLoading[plan][0] : false
                }
                size="lg"
                variant="ctaBlue"
              >
                Already on {title} Plan
              </Button>
            ) : (
              <Button
                fullWidth={true}
                loading={
                  typeof planToLoading[plan][0] === 'boolean' ? planToLoading[plan][0] : false
                }
                onClick={() => handleUpgradePlan(plan)}
                size="lg"
                variant="ctaBlue"
              >
                Upgrade to {title}
              </Button>
            ))
          }
          featuresList={features}
          isHighlighted={true}
          isPro={true}
          pricePerMonth={pricePerMonth}
          selectedPricing={selectedPricing}
          title={title}
        />
      ))}
    </div>
  )
}

interface IPricingPlanCardProps {
  button?: React.ReactNode
  featuresList?: string[]
  isHighlighted?: boolean
  isPro?: boolean
  pricePerMonth?: string
  selectedPricing?: string
  title: React.ReactNode | string
}

const PricingPlanCard = ({
  button,
  featuresList,
  isHighlighted,
  isPro,
  pricePerMonth,
  selectedPricing,
  title,
}: IPricingPlanCardProps) => {
  const hasSelectedQuarterlyPricing = selectedPricing === 'quarterly'

  return (
    <Card className={cn('w-full', isHighlighted && 'border border-blue-500')}>
      <CardContent className="relative flex h-full flex-col justify-between gap-6 px-3 py-4">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold">{title}</div>
          <div className={cn('text-2xl font-semibold', isPro && 'text-white')}>
            <motion.span
              animate={{ opacity: 1, x: 0 }}
              className="inline"
              exit={{ opacity: 0, x: 20 }}
              initial={{ opacity: 0, x: -20 }}
              key={pricePerMonth}
              transition={{ duration: 0.5 }}
            >
              {pricePerMonth ? `$${pricePerMonth}` : '$0'}
            </motion.span>
            <span className="text-muted-foreground">{`/month${hasSelectedQuarterlyPricing ? '*' : ''}`}</span>
          </div>
          {featuresList && (
            <div className="text-muted-foreground flex flex-col gap-2 text-sm">
              {featuresList?.map((feature) => (
                <div className="flex flex-row items-center gap-2">
                  <span>
                    <CheckCircle className="text-green-500" size={14} />
                  </span>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>{button}</div>
        {isPro && hasSelectedQuarterlyPricing && (
          <Badge className="absolute right-[16px] top-[16px]" variant="discount">
            Save 14%
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
