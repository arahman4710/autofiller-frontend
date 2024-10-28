'use client'

import { useQuery } from '@apollo/client'
import { Toolbar } from '@rag/ui/Toolbar'
import { useParams } from 'next/navigation'

import { ClientResumeToolbar_ClientDocument } from '@gql/graphql'

import { ClientHeader } from '@/components/ClientHeader'

export const ClientResumeToolbar = () => {
  const params = useParams()
  const clientId = String(params?.clientId)

  const { data, loading } = useQuery(ClientResumeToolbar_ClientDocument, {
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
