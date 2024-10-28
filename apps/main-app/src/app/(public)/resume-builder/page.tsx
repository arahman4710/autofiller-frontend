'use client'

import { MainShell } from '@rag/ui/MainShell'

import { ResumeBuilder as ResumeBuilderModule } from '@/modules/resume-builder/ResumeBuilder'

export default function ResumeBuilder() {
  return (
    <MainShell className="mx-auto mt-3 flex h-full w-full max-w-screen-xl flex-col">
      <ResumeBuilderModule isPublic={true} />
    </MainShell>
  )
}
