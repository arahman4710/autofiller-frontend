'use client'

import { MainShell } from '@rag/ui/MainShell'

import { ResumesHeader } from './components/ResumesHeader'
import { ResumesListSkeleton } from './modules/ResumesList'

export default function ResumesLoading() {
  return (
    <MainShell className="px-0">
      <ResumesHeader />
      <ResumesListSkeleton />
    </MainShell>
  )
}
