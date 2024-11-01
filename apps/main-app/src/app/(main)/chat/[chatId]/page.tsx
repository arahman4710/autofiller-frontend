import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { Chat } from './modules/Chat'

export const metadata: Metadata = {
  title: 'Interview in Progress',
}

export default function InterviewPage({
  params: { chatId },
}: {
  params: { chatId: string }
}) {
  return (
    <MainShell className="p-6 pr-0">
      <Chat chatId={chatId}/>
    </MainShell>
  )
}
