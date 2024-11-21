import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { type QueryParams, createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
})

export async function sanity<T>({
  params = {},
  query,
  tags,
}: {
  params?: QueryParams
  query: string
  tags?: string[]
}) {
  return client.fetch<T>(query, params, {
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}

export const urlForImage = (source: SanityImageSource) => {
  return imageUrlBuilder(client).image(source).auto('format').fit('max')
}
