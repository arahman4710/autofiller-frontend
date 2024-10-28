import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { ApplicationContent } from './modules/ApplicationContent'

export const metadata: Metadata = {
  title: 'Manage Application',
}
interface IApplicationProps {
  params: {
    applicationId: string
  }
}

export default async function Application({ params }: IApplicationProps) {
  const applicationId = params.applicationId

  return (
    <MainShell className="overflow-y-auto px-0">
      <ApplicationContent applicationId={applicationId} />
    </MainShell>
  )
}
