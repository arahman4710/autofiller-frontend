'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'

import { SubscriptionPlanEnum } from '@gql/graphql'

import { TailorResumeDialog } from '@/components/dialogs/TailorResumeDialog'
import { ATSInfoTooltip } from '@/components/info-tooltips/ATSInfoTooltip'

interface IOptimizeResumeProps {
  applicationId: string
  plan?: SubscriptionPlanEnum
}

export const OptimizeResume = ({ applicationId }: IOptimizeResumeProps) => {
  const [optimizeResumeDialogOpen, setOptimizeResumeDialogOpen] = useState(false)

  return (
    <div>
      <h2 className="mb-[8px] text-[16px] font-medium"> Optimize resume for this application </h2>
      <div className="mb-[16px] text-sm">
        Our resume optimizer optimizes your resume so that you have the highest chance of passing{' '}
        <ATSInfoTooltip /> filters.
      </div>
      <Button onClick={() => setOptimizeResumeDialogOpen(true)} variant="cta">
        Optimize Resume
      </Button>
      <TailorResumeDialog
        applicationId={applicationId}
        open={optimizeResumeDialogOpen}
        setOpen={setOptimizeResumeDialogOpen}
        showResumeSelection
      />
    </div>
  )
}
