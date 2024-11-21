'use client'

import { Badge } from '@rag/ui/Badge'
import { Button } from '@rag/ui/Button'
import { Card, CardContent } from '@rag/ui/Card'
import { cn } from '@rag/ui/utils/cn'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

interface IPlanProps {
  features: string[]
  isHighlighted?: boolean
  isQuarterly?: boolean
  planDescription: string
  planName: string
  pricePerMonth: string
}

export const Plan = ({
  features,
  isHighlighted,
  isQuarterly,
  planDescription,
  planName,
  pricePerMonth,
}: IPlanProps) => {
  return (
    <Card className={cn('w-full', isHighlighted && 'border border-blue-500 shadow-lg')}>
      <CardContent className="relative flex h-full flex-col gap-3 p-6">
        <div className="text-lg font-semibold">{planName}</div>
        <div className={cn('text-2xl font-semibold', isHighlighted && 'text-white')}>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="inline"
            exit={{ opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: -20 }}
            key={pricePerMonth}
            transition={{ duration: 0.5 }}
          >
            {pricePerMonth ? `$${pricePerMonth}` : '$0'}
          </motion.div>
          <span className="text-muted-foreground">/month</span>
        </div>
        {features && (
          <div
            className={cn(
              'text-muted-foreground my-4 flex flex-col gap-3 text-sm',
              isHighlighted && 'text-white'
            )}
          >
            {features.map((feature) => (
              <div className="flex flex-row items-center gap-2" key={feature}>
                <CheckCircledIcon className={cn('h-4 w-4', isHighlighted && 'text-emerald-300')} />{' '}
                {feature}
              </div>
            ))}
          </div>
        )}
        <Button
          fullWidth={true}
          onClick={() => {
            window.open('https://app.skugrep.xyz/auth/signup')
          }}
          size="lg"
          variant={isHighlighted ? 'ctaBlue' : 'default'}
        >
          Get Started
        </Button>
        {isHighlighted && isQuarterly && (
          <Badge className="absolute right-[16px] top-[16px]" variant="discount">
            Save 14%
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
