'use client'

import { useEffect, useState } from 'react'
import { createContext } from 'react'

import { Alert } from '@rag/ui/Alert'
import { Badge } from '@rag/ui/Badge'
import { Button } from '@rag/ui/Button'
import { Card, CardContent } from '@rag/ui/Card'
import { Dialog, DialogContent } from '@rag/ui/Dialog'
import { Loader } from '@rag/ui/Loader'
import {
  SwitchTabs,
  SwitchTabsContent,
  SwitchTabsList,
  SwitchTabsTrigger,
} from '@rag/ui/SwitchTabs'
import { cn } from '@rag/ui/utils/cn'
import { ArrowCircleUp, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import { PricingTable } from '@/components/PricingTable'
import { ProBadge } from '@/components/ProBadge'
// import { useBillingPlan } from '@/hooks/useBillingPlan'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { trackEvent } from '@/lib/utils/analytics'
import { TBillingPlanFrequency } from '@/types/pricing'

const MONTHLY_PRICING = '19.00'
const QUARTERLY_PRICING = '16.33'

interface IUpgradePlanDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EVENT_PREFIX = 'Pricing Plan Dialog'

const UpgradePlanDialogContext = createContext<
  { open: boolean; setOpen: (open: boolean) => void } | undefined
>(undefined)

export const UpgradePlanDialog = ({ open, setOpen }: IUpgradePlanDialogProps) => {
  const [pricingPlanTab, setPricingPlanTab] = useState<string>('quarterly')

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
        <DialogContent
          className="h-full max-h-[940px] max-w-3xl"
          title="Upgrade Plan"
          titleIcon={<ArrowCircleUp />}
        >
          {currentUserIsLoading ? (
            <Loader />
          ) : (
            <SwitchTabs
              className="flex w-full flex-col items-center justify-center self-center"
              defaultValue="quarterly"
              onValueChange={handleBillingFrequencySwitch}
              value={pricingPlanTab}
            >
              <SwitchTabsList>
                <SwitchTabsTrigger className="flex flex-row gap-2" value="quarterly">
                  Quarterly <Badge variant="discount">-14%</Badge>
                </SwitchTabsTrigger>
                <SwitchTabsTrigger value="monthly">Monthly</SwitchTabsTrigger>
              </SwitchTabsList>
              <div className="mt-1 flex flex-col gap-2">
                <Alert className="text-center">
                  <span className="text-md mr-2.5">💫</span>
                  Supercharge your job search - join over 2,500+ Canyon Pro users in landing more
                  offers.
                </Alert>
                <SwitchTabsContent value="quarterly">
                  <PricingContent
                    pricePerMonth={QUARTERLY_PRICING}
                    selectedPricing={pricingPlanTab}
                  />
                </SwitchTabsContent>
                <SwitchTabsContent value="monthly">
                  <PricingContent
                    pricePerMonth={MONTHLY_PRICING}
                    selectedPricing={pricingPlanTab}
                  />
                </SwitchTabsContent>
              </div>
            </SwitchTabs>
          )}
        </DialogContent>
      </Dialog>
    </UpgradePlanDialogContext.Provider>
  )
}

const PricingContent = ({
  pricePerMonth,
  selectedPricing,
}: {
  pricePerMonth: string
  selectedPricing: string
}) => {
  return (
    <div className="space-y-6">
      <PricingPlanCards pricePerMonth={pricePerMonth} selectedPricing={selectedPricing} />
      <div className="space-y-3">
        <div className="text-center font-semibold">Feature Comparison</div>
        <PricingTable className="max-h-[400px] overflow-y-auto" pricePerMonth={pricePerMonth} />
      </div>
    </div>
  )
}

const PricingPlanCards = ({
  pricePerMonth,
  selectedPricing,
}: {
  pricePerMonth: string
  selectedPricing: string
}) => {
  const [isCreateSubscriptionLoading, setIsCreateSubscriptionLoading] = useState<boolean>(false)
  const { createSubscription } = useBillingPlan()
  const { isPaidPlan } = useCurrentUser()

  const handleUpgradePlan = () => {
    setIsCreateSubscriptionLoading(true)

    trackEvent(`${EVENT_PREFIX} - clicked Upgraded to Pro`, { frequency: selectedPricing })

    createSubscription({
      selectedBillingFrequency: selectedPricing as TBillingPlanFrequency,
    })
  }

  const limitedFeatures = [
    'Limited Resumes',
    'Limited Cover Letters',
    'Limited Job Applications Tracking',
    'Limited Mock Interviews',
    'Limited Canyon AI',
  ]

  const unlimitedFeatures = [
    'Unlimited Resumes',
    'Unlimite Resume Optimizations',
    'Unlimited Cover Letters',
    'Unlimited Job Applications Tracking',
    'Unlimited Mock Interviews',
    'Unlimited Canyon AI',
  ]

  return (
    <div className="flex w-full flex-row justify-center gap-3">
      <PricingPlanCard featuresList={limitedFeatures} title="Starter" />
      <PricingPlanCard
        button={
          isPaidPlan ? (
            <Button
              disabled={true}
              fullWidth={true}
              loading={isCreateSubscriptionLoading}
              size="lg"
              variant="ctaBlue"
            >
              Already on Pro Plan
            </Button>
          ) : (
            <Button
              fullWidth={true}
              loading={isCreateSubscriptionLoading}
              onClick={handleUpgradePlan}
              size="lg"
              variant="ctaBlue"
            >
              Upgrade to Pro
            </Button>
          )
        }
        featuresList={unlimitedFeatures}
        isHighlighted={true}
        isPro={true}
        pricePerMonth={pricePerMonth}
        selectedPricing={selectedPricing}
        title={<ProBadge className="text-md" />}
      />
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
      <CardContent className="relative flex h-full flex-col gap-3 px-3 py-4">
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
                <CheckCircle size={14} /> {feature}
              </div>
            ))}
          </div>
        )}
        {button}
        {isPro && hasSelectedQuarterlyPricing && (
          <Badge className="absolute right-[16px] top-[16px]" variant="discount">
            Save 14%
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
