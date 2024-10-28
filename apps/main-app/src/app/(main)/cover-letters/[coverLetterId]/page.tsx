import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { CoverLetterContent } from './modules/CoverLetterContent'

export const metadata: Metadata = {
  title: 'Generate Cover Letter',
}

export default function CoverLetterPage({
  params: { coverLetterId },
}: {
  params: { coverLetterId: string }
}) {
  return (
    <MainShell className="mx-auto max-w-screen-xl">
      <CoverLetterContent coverLetterId={coverLetterId} />
    </MainShell>
  )
}
