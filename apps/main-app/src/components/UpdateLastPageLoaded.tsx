'use client'

import { useEffect } from 'react'

import { useMutation } from '@apollo/client'

import { UpdateLastPageLoaded_UpdateLastPageLoadedAtDocument } from '@gql/graphql'

export default function UpdateLastPageLoadedAt() {
  const [updateLastPageLoadedAt] = useMutation(UpdateLastPageLoaded_UpdateLastPageLoadedAtDocument, {})
  useEffect(()=>{
    updateLastPageLoadedAt()
  }, [])

  return null
}
