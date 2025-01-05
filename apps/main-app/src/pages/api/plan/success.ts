import type { NextApiRequest, NextApiResponse } from 'next'

import { Plan_SubscriptionSessionFetchDocument } from '@gql/graphql'

import { makeApolloClient } from '@/lib/apolloWrapper'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apolloClient = makeApolloClient()
  const sessionId = req.query.session_id

  await apolloClient.mutate({
    mutation: Plan_SubscriptionSessionFetchDocument,
    variables: {
      sessionId: sessionId,
    },
  })

  res.redirect('/')
}
