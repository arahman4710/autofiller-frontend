import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { PageCheck } from './modules/PageCheck'

export const metadata: Metadata = {
  title: 'Page Check',
}

export default function PageCheckPage({
  params: { pageCheckId },
}: {
  params: { pageCheckId: string }
}) {
  return (
    <MainShell className="p-6 pr-0">
      <PageCheck pageCheckId={pageCheckId} />
    </MainShell>
  )
}
