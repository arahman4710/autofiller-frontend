'use client'

import { useEffect, useState } from 'react'

import { type QueryParams } from 'next-sanity'

import { sanity } from './index'

/**
 * @description A hook for client side Sanity queries
 */
export const useSanityQuery = <T>({
  params = {},
  query,
  tags,
}: {
  params?: QueryParams
  query: string
  tags?: string[]
}) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const data = await sanity<T>({ params, query, tags })

      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return { data, isLoading }
}
