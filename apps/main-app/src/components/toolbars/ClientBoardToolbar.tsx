'use client'

import { useQuery } from '@apollo/client'
import { Toolbar } from '@canyon/ui/Toolbar'
import { useParams } from 'next/navigation'

import { ClientBoardToolbar_ClientDocument } from '@gql/graphql'

import { ClientHeader } from '@/components/ClientHeader'

export const ClientBoardToolbar = () => {
  const params = useParams()
  const clientId = String(params?.clientId)

  const { data, loading } = useQuery(ClientBoardToolbar_ClientDocument, {
    variables: {
      clientId,
    },
  })

  const client = data?.client

  return (
    <Toolbar>
      <ClientHeader client={client} />
    </Toolbar>
  )
}
