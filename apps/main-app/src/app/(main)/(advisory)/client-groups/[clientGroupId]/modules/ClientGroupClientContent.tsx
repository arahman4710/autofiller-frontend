'use client'

import { ClientGroupClientList } from './ClientGroupClientList'

export const ClientGroupClientContent = ({ clientGroupId }: { clientGroupId: string }) => {
  return <ClientGroupClientList clientGroupId={clientGroupId} />
}
