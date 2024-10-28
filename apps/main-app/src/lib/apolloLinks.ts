'use client'

import { ApolloLink, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { Session } from 'next-auth'

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

export const apolloLinks = () => {
  // We only want to create the consumer once, so cache it after its created
  let consumer
  const getActionCableConsumer = async ({ token }: { token: Session['token'] }) => {
    if (consumer) {
      return consumer
    }

    const { createConsumer } = await import('@rails/actioncable')
    consumer = createConsumer(`${process.env.NEXT_PUBLIC_ACTION_CABLE_API_URL}?token=${token}`)

    return consumer
  }

  // We can use `setContext` to create the cable async and pass it to the terminating link
  const setCableLink = setContext(async (_, { token }) => ({
    cable: await getActionCableConsumer({ token }),
  }))

  // Similarly, we only want to create the action cable link once
  let actionCableLink
  const getActionCableLink = ({ cable }) => {
    actionCableLink ||= new ActionCableLink({ cable })

    return actionCableLink
  }

  // Since we can't create the `ActionCableLink` until we have the cable, we wrap it
  // with a custom `ApolloLink` and execute it here. This is our terminating link
  const apolloActionCableLink = new ApolloLink((operation) => {
    // Pull the cable off of context which you set in the `setCableLink`
    const { cable } = operation.getContext()
    return ApolloLink.execute(getActionCableLink({ cable }), operation)
  })

  // Ensure your subscription link is a combination of `setCableLink` and `actionCableLink`
  const subscriptionLink = setCableLink.concat(apolloActionCableLink)

  const hasSubscriptionOperation = ({ query: { definitions } }) => {
    return definitions.some(
      ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
    )
  }

  // Redirect subscriptions to the action cable link, while using the HTTP link for other queries
  const splitLink = split(hasSubscriptionOperation, subscriptionLink, httpLink)

  const authLink = setContext(async (_, { headers, token }) => {
    const appliedHeader = {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }

    return appliedHeader
  })

  const removeTypenameLink = removeTypenameFromVariables()

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ locations, message, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  return removeTypenameLink.concat(errorLink).concat(authLink).concat(splitLink)
}
