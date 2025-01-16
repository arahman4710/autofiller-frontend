import { EmptySpace } from '@autofiller/ui/EmptySpace'
import { cn } from '@autofiller/ui/utils/cn'
import { Check, X } from '@phosphor-icons/react'

type TCheck = 'check' | 'cross'
type TSubscriptionPlanValue = React.ReactNode | TCheck | string
type TPricingPlans = 'Free' | 'Pro'

interface IFeatureRow {
  planValues: {
    [key in TPricingPlans]: TSubscriptionPlanValue
  }
  title: string
  tooltip?: string
}

interface IFeatureObject {
  rows: IFeatureRow[]
  sectionTitle: string
  sectionValueHeader?: {
    [key in TPricingPlans]: React.ReactNode | string
  }
}

const featuresMap = ({ pricePerMonth }: { pricePerMonth }): IFeatureObject[] => [
  {
    rows: [
      {
        planValues: {
          Free: '$0/month',
          Pro: `$${pricePerMonth}/month`,
        },
        title: 'Pricing',
      },
    ],
    sectionTitle: 'Plans',
    sectionValueHeader: {
      Free: 'Free',
      Pro: 'Pro',
    },
  },
  {
    rows: [
      {
        planValues: {
          Free: '3',
          Pro: 'Unlimited',
        },
        title: 'Resumes Limit',
      },
      {
        planValues: {
          Free: '1 Template',
          Pro: 'All Templates',
        },
        title: 'Resume Templates',
      },
      {
        planValues: {
          Free: '0 Tokens',
          Pro: 'Unlimited',
        },
        title: 'AI Resume Optimizations',
      },
      {
        planValues: {
          Free: '2 Tokens',
          Pro: 'Unlimited',
        },
        title: 'AI Summary Generations',
      },
      {
        planValues: {
          Free: '2 Tokens',
          Pro: 'Unlimited',
        },
        title: 'AI Achievement Generations',
      },
    ],
    sectionTitle: 'Resumes',
  },
  {
    rows: [
      {
        planValues: {
          Free: '2',
          Pro: 'Unlimited',
        },
        title: 'Cover Letter Generations',
      },
    ],
    sectionTitle: 'Cover Letters',
  },
  {
    rows: [
      {
        planValues: {
          Free: 'Unlimited (limited time)',
          Pro: 'Unlimited',
        },
        title: 'Tracked Applications',
      },
    ],
    sectionTitle: 'Job Applications',
  },
  {
    rows: [
      {
        planValues: {
          Free: '0 Tokens',
          Pro: 'Unlimited',
        },
        title: 'AI Answer Generations',
      },
      {
        planValues: {
          Free: 'Unlimited',
          Pro: 'Unlimited',
        },
        title: 'Application Autofill',
      },
    ],
    sectionTitle: 'Browser Extension',
  },
  {
    rows: [
      {
        planValues: {
          Free: '1 Token',
          Pro: 'Unlimited',
        },
        title: 'AI Mock Interviews',
      },
    ],
    sectionTitle: 'Interview Preparation',
  },
  {
    rows: [
      {
        planValues: {
          Free: '2 Tokens',
          Pro: 'Unlimited',
        },
        title: 'Learn Related Skills',
      },
    ],
    sectionTitle: 'Enrichment',
  },
]

interface IPricingTableProps {
  className?: string
  pricePerMonth: string
}

export const PricingTable = ({ className, pricePerMonth }: IPricingTableProps) => {
  const features = featuresMap({
    pricePerMonth,
  })

  return (
    <div
      className={cn(
        'border-border-muted flex grid auto-rows-max items-stretch rounded-lg border',
        className
      )}
    >
      {features.map((feature, index) => {
        const isFirstRow = index === 0
        const isLastRow = index === features.length - 1

        return (
          <div
            className={cn(
              'border-border-muted grid auto-cols-max grid-cols-3',
              !isLastRow && 'border-b'
            )}
          >
            <PricingHeaderColumn {...feature} />
            <PricingValueColumn
              headerValue={feature.sectionValueHeader?.['Free']}
              planValues={feature.rows.map((row) => row.planValues['Free'])}
              planValuesContrast={feature.sectionTitle === 'Plans'}
            />
            <PricingValueColumn
              className={`${isFirstRow ? 'rounded-tr-md' : ''} ${isLastRow ? 'rounded-br-md' : ''}`}
              headerValue={feature.sectionValueHeader?.['Pro']}
              planValues={feature.rows.map((row) => row.planValues['Pro'])}
              planValuesContrast={feature.sectionTitle === 'Plans'}
            />
          </div>
        )
      })}
    </div>
  )
}

interface IPricingColumnProps {
  children: React.ReactNode
  className?: string
}

const PricingColumn = ({ children, className }: IPricingColumnProps) => {
  return (
    <div className={cn('flex flex-col justify-between gap-3 px-3 py-4', className)}>{children}</div>
  )
}

interface IPricingHeaderColumnProps extends IFeatureObject {}
const PricingHeaderColumn = ({ rows, sectionTitle }: IPricingHeaderColumnProps) => {
  return (
    <PricingColumn>
      <div className="text-muted-foreground font-semibold">{sectionTitle}</div>
      <div className="flex flex-col">
        {rows.map((row) => (
          <div className="h-10">{row.title}</div>
        ))}
      </div>
    </PricingColumn>
  )
}

interface IPricingValueColumnProps {
  className?: string
  headerValue?: React.ReactNode | string
  planValues: TSubscriptionPlanValue[]
  planValuesContrast?: boolean
}

const PricingValueColumn = ({
  className,
  headerValue,
  planValues,
  planValuesContrast,
}: IPricingValueColumnProps) => {
  const renderValue = (value: TSubscriptionPlanValue) => {
    if (value === 'check') {
      return <Check />
    }

    if (value === 'cross') {
      return <X />
    }

    return value
  }

  return (
    <PricingColumn className={cn('border-border-muted border-l bg-stone-950/40', className)}>
      {headerValue ? <div>{headerValue}</div> : <EmptySpace />}
      <div className="flex flex-col">
        {planValues.map((value) => (
          <div
            className={cn(
              'text-muted-foreground h-10 text-sm',
              planValuesContrast && 'text-md font-semibold text-white'
            )}
          >
            {renderValue(value)}
          </div>
        ))}
      </div>
    </PricingColumn>
  )
}
