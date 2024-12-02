import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

import { StartChat } from './components/StartChat'

export const metadata: Metadata = {
  title: 'Dashboard',
}


export default function Chat() {
  return (
    <MainShell>
        <StartChat />
    </MainShell>
  )
}
