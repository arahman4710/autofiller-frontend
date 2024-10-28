import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { ClientsList } from './modules/ClientsList'

export const metadata: Metadata = {
  title: 'Clients',
}

export default function Clients() {
  return (
    <MainShell className="overflow-y-auto p-0">
      <ClientsList />
    </MainShell>
  )
}
