import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import PageChecksHeader from './components/PageChecksHeader'
import { PageChecksList } from './components/PageChecksList'

export const metadata: Metadata = {
  title: 'Page Checks'
}

export default function PageChecks() {
  return (
    <MainShell className="overflow-y-auto px-0">
      <PageChecksHeader />
      <PageChecksList />
    </MainShell>
  )
}
