import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { Interview } from './modules/Interview'

export const metadata: Metadata = {
  title: 'Interview in Progress',
}

export default function InterviewPage({
  params: { interviewId },
}: {
  params: { interviewId: string }
}) {
  return (
    <MainShell className="p-6 pr-0">
      <Interview interviewId={interviewId} />
    </MainShell>
  )
}
