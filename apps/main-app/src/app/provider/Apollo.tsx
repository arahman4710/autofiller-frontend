import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'
import { Session } from 'next-auth'

import { makeApolloClient } from '@/lib/apolloWrapper'

import { UpdateAuth } from './UpdateAuth'

interface IApolloProvider {
  children: React.ReactNode
  token: Session['token']
}

export const ApolloProvider = ({ children, token }: IApolloProvider) => {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      <UpdateAuth token={token}>{children}</UpdateAuth>
    </ApolloNextAppProvider>
  )
}
