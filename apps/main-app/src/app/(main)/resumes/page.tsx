import { MainShell } from '@canyon/ui/MainShell'
import { Metadata } from 'next'

import { ResumesHeader } from './components/ResumesHeader'
import { ResumesList } from './modules/ResumesList'

export const metadata: Metadata = {
  title: 'Resumes',
}

export default function Resumes() {
  return (
    <MainShell className="overflow-y-auto px-0">
      <ResumesHeader />
      <ResumesList />
    </MainShell>
  )
}
