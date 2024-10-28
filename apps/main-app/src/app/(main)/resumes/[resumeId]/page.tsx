import { MainShell } from '@canyon/ui/MainShell'
import { Metadata } from 'next'

import { ResumeBuilder } from '@/modules/resume-builder/ResumeBuilder'

export const metadata: Metadata = {
  title: 'Edit Resume',
}

interface IResumeProps {
  params: {
    resumeId: string
  }
}

export default function Resume({ params: { resumeId } }: IResumeProps) {
  return (
    <MainShell className="mx-auto mt-3 flex h-full max-w-screen-xl flex-col">
      <ResumeBuilder resumeId={resumeId} />
    </MainShell>
  )
}
