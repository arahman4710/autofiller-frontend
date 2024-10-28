import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { InterviewsEmpty } from './components/InterviewsEmpty'

export const metadata: Metadata = {
  title: 'Interviews',
}

export default function Interviews() {
  return (
    <MainShell>
      <InterviewsEmpty />
    </MainShell>
  )
}
