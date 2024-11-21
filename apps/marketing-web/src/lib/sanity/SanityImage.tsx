'use client'

import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image, { ImageProps } from 'next/image'

import { urlForImage } from '@/lib/sanity'

type TSanityImageProps = {
  src: SanityImageSource
} & Omit<ImageProps, 'src'>

export const SanityImage = ({ alt, src, ...props }: TSanityImageProps) => {
  return (
    <Image
      alt={alt}
      loader={({ quality = 100, width }) => urlForImage(src).width(width).quality(quality).url()}
      src="dynamic"
      {...props}
    />
  )
}
