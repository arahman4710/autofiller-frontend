import { MainShell } from '@canyon/ui/MainShell'
import { Metadata } from 'next'

import { AdvisorsList } from './modules/AdvisorsList'

export const metadata: Metadata = {
  title: 'Advisors',
}

export default function Resumes() {
  return (
    <MainShell className="overflow-y-auto px-0">
      <AdvisorsList />
    </MainShell>
  )
}
