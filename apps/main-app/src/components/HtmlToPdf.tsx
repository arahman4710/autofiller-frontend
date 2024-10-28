'use client'

import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser'
import merge from 'lodash/merge'

const styles = StyleSheet.create({
  bulletPoint: { marginRight: 4, textAlign: 'left' },
  em: { fontStyle: 'italic' },
  li: { display: 'flex', flexDirection: 'row', marginBottom: 5 },
  p: { lineHeight: 1.75, marginBottom: 8 },
  strong: { fontWeight: 700 },
  u: { textDecoration: 'underline' },
})

interface IHtmlToPdfProps {
  htmlString: string
  stylesheet?: { [key: string]: Style }
}

export const HtmlToPdf = ({ htmlString, stylesheet }: IHtmlToPdfProps) => {
  const combinedStyles = merge({}, styles, stylesheet)

  const options: HTMLReactParserOptions = {
    replace: ({ children, name, type }) => {
      if (!name || type !== 'tag') return

      switch (name) {
        case 'p':
          return <Text style={combinedStyles.p}>{domToReact(children, options)}</Text>

        case 'strong':
          return <Text style={combinedStyles.strong}>{domToReact(children, options)}</Text>

        case 'em':
          return <Text style={combinedStyles.em}>{domToReact(children, options)}</Text>

        case 'u':
          return <Text style={combinedStyles.u}>{domToReact(children, options)}</Text>

        case 'ul':
          return <View>{domToReact(children, options)}</View>

        case 'li':
          return (
            <View style={combinedStyles.li}>
              <Text style={combinedStyles.bulletPoint}>•</Text>
              <Text>{domToReact(children, options)}</Text>
            </View>
          )
      }
    },
  } as any //eslint-disable-line

  const parsed = parse(htmlString, options)
  return parsed
}
