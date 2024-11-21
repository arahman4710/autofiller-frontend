import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'

// import SectionImage from './section-image'
import { SanityImage } from '@/lib/sanity/SanityImage'

type TProps = {
  sanity?: EncodeDataAttributeCallback
  value: PortableTextBlock[]
}

export const Blocks = ({ value }: TProps) => {
  let div: PortableTextBlock[] = []

  if (!value) {
    return null
  }

  return value.map((block, i, blocks) => {
    if (block._type === 'block') {
      div.push(block)

      if (blocks[i + 1]?._type === 'block') return null

      const value = div
      div = []

      return (
        <div
          className="prose prose-h2:max-w-[32ch] prose-h2:text-5xl prose-stone prose-invert prose-a:text-emerald-200"
          key={block._key}
        >
          <PortableText
            components={{
              marks: {
                // ...
              },
            }}
            value={value}
          />
        </div>
      )
    } else {
      return (
        <PortableText
          components={{
            types: {
              image: ({ value }) => (
                <SanityImage alt={value.alt} height={655} src={value.asset} width={655} />
              ),
            },
          }}
          key={block._key}
          value={block}
        />
      )
    }
  })
}
