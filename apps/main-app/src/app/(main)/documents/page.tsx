import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import DocumentsHeader from './components/DocumentsHeader'
import { DocumentsList } from './components/DocumentsList'

// import { ResumesHeader } from './components/ResumesHeader'
// import { ResumesList } from './modules/ResumesList'

export const metadata: Metadata = {
  title: 'Documents',
}

export default function Documents() {
  return (
    <MainShell className="overflow-y-auto px-0">
      <DocumentsHeader />
      <DocumentsList />
      {/* <ResumesHeader />
      <ResumesList /> */}
    </MainShell>
  )
}
