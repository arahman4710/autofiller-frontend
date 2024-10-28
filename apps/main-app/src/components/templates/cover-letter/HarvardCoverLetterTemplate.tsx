import { Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import { HtmlToPdf } from '@/components/HtmlToPdf'
import { useFormValues } from '@/hooks/useFormValues'
import { mergePdfStyles as merge } from '@/lib/utils'

import { common as cs, spacing } from '../common'
import { CoverLetterPage } from './CoverLetterPage'

export const HarvardCoverLetterTemplate = () => {
  const formValues = useFormValues()

  if (!formValues) {
    return null
  }

  const displayBody = formValues?.body
  const displayFooter = formValues?.footer

  return (
    <CoverLetterPage style={merge([cs._PTSerifFontFamily])}>
      <Text style={styles.name}>
        {formValues?.firstName} {formValues.lastName}
      </Text>
      <View
        style={merge([
          cs.flexRow,
          cs.flexWrap,
          cs.columnGapXs,
          cs.marginYSm,
          cs.paddingXSm,
          cs.justifyCenter,
        ])}
      >
        {formValues?.email ? <Text>{formValues.email}</Text> : null}
        {formValues?.email && formValues?.phoneNumber ? <Text>•</Text> : null}

        {formValues?.phoneNumber ? <Text>{formValues.phoneNumber}</Text> : null}
        {(formValues?.email || formValues?.phoneNumber) && formValues?.address ? (
          <Text>•</Text>
        ) : null}
      </View>
      <View style={merge([cs.marginYMd, cs.flexColumn, cs.gapXs])}>
        <Text style={merge([cs.paddingXLg])}>{formValues?.date}</Text>
        <Text style={merge([cs.paddingXLg])}>{formValues?.companyName}</Text>
        <Text style={merge([cs.paddingXLg])}>{formValues?.companyLocation}</Text>
      </View>
      {displayBody ? (
        <View style={merge([cs.paddingXLg, cs.marginYMd])}>
          <View style={merge([cs.flexColumn])}>
            <View style={merge([cs.flexColumn])}>
              <HtmlToPdf htmlString={formValues.body ?? ''} />
            </View>
          </View>
        </View>
      ) : null}
      {displayFooter ? (
        <View style={merge([cs.paddingXLg])}>
          <View style={merge([cs.flexColumn])}>
            <View style={merge([cs.flexColumn])}>
              <HtmlToPdf htmlString={formValues.footer ?? ''} stylesheet={footerStyles} />
            </View>
          </View>
        </View>
      ) : null}
    </CoverLetterPage>
  )
}

const footerStyles = StyleSheet.create({
  ['p']: {
    marginBottom: 0,
  },
})

const styles = StyleSheet.create({
  name: {
    borderBottom: '0.5px solid #000',
    fontSize: 16,
    paddingBottom: 14,
    textAlign: 'center',
  },
})
