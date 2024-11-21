'use client'

import { Plan } from './Plan'

const MONTHLY_PRICING = '19.00'
const QUARTERLY_PRICING = '16.33'

export const Plans = ({ isQuarterly }: { isQuarterly: boolean }) => {
  const starterFeatures = [
    'Limited Resumes',
    'Limited Cover Letters',
    'Limited Job Application Tracking',
    'Limited Mock Interviews',
    'Limited Canyon AI',
  ]

  const proFeatures = [
    'Unlimited Resumes',
    'Unlimited Resume Optimizations',
    'Unlimited Cover Letters',
    'Unlimited Job Application Tracking',
    'Unlimited Mock Interviews',
    'Unlimited Canyon AI',
    'Insights and Analytics (coming soon)',
    'Priority Support',
  ]
  return (
    <div className="mx-auto mt-8 flex max-w-[800px] flex-col items-start justify-center gap-4 md:flex-row">
      <Plan
        features={starterFeatures}
        planDescription="Simple and powerful"
        planName="Starter"
        pricePerMonth="0"
      />
      <Plan
        features={proFeatures}
        isHighlighted
        isQuarterly={isQuarterly}
        planDescription="Unlimited everything"
        planName="Pro"
        pricePerMonth={isQuarterly ? QUARTERLY_PRICING : MONTHLY_PRICING}
      />
    </div>
  )
}
