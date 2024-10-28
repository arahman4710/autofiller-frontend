'use client'

import { useApolloClient } from '@apollo/client'
import { Session } from 'next-auth'

export const UpdateAuth = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: Session['token']
}) => {
  const apolloClient = useApolloClient()

  apolloClient.defaultContext.token = token

  return children
}
