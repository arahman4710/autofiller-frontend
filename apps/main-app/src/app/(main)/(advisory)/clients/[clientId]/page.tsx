import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { ClientContent } from './modules/ClientContent'

export const metadata: Metadata = {
  title: 'Client',
}

export default function ClientPage({ params: { clientId } }: { params: { clientId: string } }) {
  return (
    <MainShell className="p-0">
      <ClientContent clientId={clientId} />
    </MainShell>
  )
}
