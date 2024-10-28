'use client'
import { Suspense } from 'react'

import { Sheet, SheetContent, SheetHeader } from '@canyon/ui/Sheet'

import { ResumeBuilder } from '@/modules/resume-builder/ResumeBuilder'

interface IClientResumeSheetProps {
  clientId: string
  onOpenChange: (open: boolean) => void
  open: boolean
  resumeId: string
}

export const ClientResumeSheet = ({
  clientId,
  onOpenChange,
  open,
  resumeId,
}: IClientResumeSheetProps) => {
  if (!resumeId || !clientId) return null

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="min-w-[800px]">
        <SheetHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <ResumeBuilder clientId={clientId} resumeId={resumeId} viewMode={true} />
        </Suspense>
      </SheetContent>
    </Sheet>
  )
}
