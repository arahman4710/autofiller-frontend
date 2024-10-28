import { MainShell } from '@rag/ui/MainShell'

import { CoverLettersHeader } from './components/CoverLettersHeader'
import { CoverLettersListSkeleton } from './modules/CoverLettersList'

export default function CoverLettersLoading() {
  return (
    <MainShell>
      <CoverLettersHeader />
      <CoverLettersListSkeleton />
    </MainShell>
  )
}
