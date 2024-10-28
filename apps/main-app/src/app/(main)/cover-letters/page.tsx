import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { CoverLettersHeader } from './components/CoverLettersHeader'
import { CoverLettersList } from './modules/CoverLettersList'

export const metadata: Metadata = {
  title: 'Cover Letters',
}

export default function CoverLetters() {
  return (
    <MainShell className="overflow-y-auto">
      <CoverLettersHeader />
      <CoverLettersList />
    </MainShell>
  )
}
