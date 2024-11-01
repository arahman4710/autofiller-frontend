import { Button } from '@rag/ui/Button'
import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'
import { StartChat } from './components/StartChat'
import { UploadFile } from './components/UploadFile'

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
