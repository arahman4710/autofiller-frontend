import { Document, StyleSheet } from '@react-pdf/renderer'

import { HarvardCoverLetterTemplate } from '@/components/templates/cover-letter/HarvardCoverLetterTemplate'

export const CoverLetterDocument = () => {
  return (
    <Document style={DocumentStyles.document}>
      <HarvardCoverLetterTemplate />
    </Document>
  )
}

const DocumentStyles = StyleSheet.create({
  document: {
    width: '100%',
  },
})
