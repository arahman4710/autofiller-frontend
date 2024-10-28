'use client'

import { useParams, usePathname } from 'next/navigation'

import { AdvisorsToolbar } from '@/components/toolbars/AdvisorsToolbar'
import { ApplicationToolbar } from '@/components/toolbars/ApplicationToolbar'
import { BoardToolbar } from '@/components/toolbars/BoardToolbar'
import { ClientBoardToolbar } from '@/components/toolbars/ClientBoardToolbar'
import { ClientGroupToolbar } from '@/components/toolbars/ClientGroupToolbar'
import { ClientResumeToolbar } from '@/components/toolbars/ClientResumeToolbar'
import { ClientToolbar } from '@/components/toolbars/ClientToolbar'
import { ClientsToolbar } from '@/components/toolbars/ClientsToolbar'
import { CoverLetterToolbar } from '@/components/toolbars/CoverLetterToolbar'
import { CoverLettersToolbar } from '@/components/toolbars/CoverLettersToolbar'
import { InterviewToolbar } from '@/components/toolbars/InterviewToolbar'
import { InterviewsToolbar } from '@/components/toolbars/InterviewsToolbar'
import { JobPostingsToolbar } from '@/components/toolbars/JobPostingsToolbar'
import { ResumeBuilderToolbar } from '@/components/toolbars/ResumeBuilderToolbar'
import { ResumesToolbar } from '@/components/toolbars/ResumesToolbar'

export const PageToolbar = () => {
  const pathname = usePathname()
  const params = useParams()

  switch (pathname) {
    case '/board':
      return <BoardToolbar />
    case `/board/${params?.applicationId}`:
      return <ApplicationToolbar />
    case '/interviews':
      return <InterviewsToolbar />
    case `/interviews/${params?.interviewId}`:
      return <InterviewToolbar />
    case '/job-postings':
      return <JobPostingsToolbar />
    case '/resumes':
      return <ResumesToolbar />
    case `/resumes/${params?.resumeId}`:
      return <ResumeBuilderToolbar />
    case '/cover-letters':
      return <CoverLettersToolbar />
    case `/cover-letters/${params?.coverLetterId}`:
      return <CoverLetterToolbar />
    case '/clients':
      return <ClientsToolbar />
    case '/advisors':
      return <AdvisorsToolbar />
    case `/client-groups/${params?.clientGroupId}`:
      return <ClientGroupToolbar />
    case `/clients/${params?.clientId}/board`:
      return <ClientBoardToolbar />
    case `/clients/${params?.clientId}`:
      return <ClientToolbar />
    case `/clients/${params?.clientId}/resumes/${params?.resumeId}`:
      return <ClientResumeToolbar />
  }
}
