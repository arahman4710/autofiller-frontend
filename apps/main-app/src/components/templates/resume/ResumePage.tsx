import { Page, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

interface IResumePageProps {
  children: React.ReactNode
  pageNumber?: number
  scale?: number
  style?: Style
}

export const ResumePage = ({ children, style }: IResumePageProps) => {
  return (
    <Page size="A4" style={{ ...ResumePageStyles.page, ...style }}>
      {children}
    </Page>
  )
}

const ResumePageStyles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 11,
    height: '100%',
    // @ts-ignore
    overflowY: 'auto',
    paddingBottom: 65,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 35,
    width: '100%',
  },
})
