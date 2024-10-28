import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { ClientGroupClientContent } from './modules/ClientGroupClientContent'

export const metadata: Metadata = {
  title: 'Client Group',
}

export default async function Clients({ params }: { params: { clientGroupId: string } }) {
  return (
    <MainShell className="overflow-y-auto p-0">
      <ClientGroupClientContent clientGroupId={params.clientGroupId} />
    </MainShell>
  )
}
