import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { JobPostingsList } from './modules/JobPostingsList'

export const metadata: Metadata = {
  title: 'Job Postings',
}

export default function Resumes() {
  return (
    <MainShell className="p-0">
      <JobPostingsList />
    </MainShell>
  )
}
