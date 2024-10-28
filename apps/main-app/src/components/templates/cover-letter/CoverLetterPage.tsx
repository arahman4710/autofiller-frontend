import { Page, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

interface ICoverLetterPageProps {
  children: React.ReactNode
  pageNumber?: number
  scale?: number
  style?: Style
}

export const CoverLetterPage = ({ children, style }: ICoverLetterPageProps) => {
  return (
    <Page size="A4" style={{ ...CoverLetterPageStyles.page, ...style }}>
      {children}
    </Page>
  )
}

const CoverLetterPageStyles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 11,
    height: '880px',
    paddingBottom: 65,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 35,
    width: '100%',
  },
})
