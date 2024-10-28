'use client'

import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { Toolbar } from '@canyon/ui/Toolbar'
import { useParams } from 'next/navigation'

import { ClientGroupToolbar_ClientGroupDocument } from '@gql/graphql'

import { ClientGroupHeader } from '@/components/ClientGroupHeader'
import { EditClientGroupDialog } from '@/components/dialogs/EditClientGroupDialog'

export const ClientGroupToolbar = () => {
  const params = useParams()
  const clientGroupId = String(params?.clientGroupId)

  const [isEditClientGroupDialogOpen, setIsEditClientGroupDialogOpen] = useState(false)

  const { data } = useQuery(ClientGroupToolbar_ClientGroupDocument, {
    variables: {
      clientGroupId,
    },
  })

  const clientGroup = data?.clientGroups[0]

  return (
    <Toolbar justify="between">
      <ClientGroupHeader clientGroup={clientGroup} />
      <div>
        <Button onClick={() => setIsEditClientGroupDialogOpen(true)}>Edit Group</Button>
        <EditClientGroupDialog
          clientGroupId={clientGroupId}
          open={isEditClientGroupDialogOpen}
          setOpen={setIsEditClientGroupDialogOpen}
        />
      </div>
    </Toolbar>
  )
}
