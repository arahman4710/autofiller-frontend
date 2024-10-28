/**
 * This RSC Apollo client is ready for general use.
 */
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

import { getSessionToken } from '@/lib/session'

export const httpLink = createHttpLink({
  fetchOptions: { cache: 'no-store' },
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const sessionToken = await getSessionToken()
  const appliedHeader = {
    headers: {
      ...headers,
      authorization: `Bearer ${sessionToken}`,
    },
  }

  return appliedHeader
})

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
})
