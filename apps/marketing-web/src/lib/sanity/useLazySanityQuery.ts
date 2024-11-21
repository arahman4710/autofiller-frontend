'use client'

import { useState } from 'react'

import { type QueryParams } from 'next-sanity'

import { sanity } from './index'

/**
 * @description A lazy hook for client side Sanity queries
 */
export const useLazySanityQuery = <T>({
  params = {},
  query,
  tags,
}: {
  params?: QueryParams
  query: string
  tags?: string[]
}): [() => Promise<T>, { data: T | null; isLoading: boolean }] => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)

    const fetchedData = await sanity<T>({ params, query, tags })

    setData(fetchedData)
    setIsLoading(false)

    return fetchedData
  }

  return [fetchData, { data, isLoading }]
}
