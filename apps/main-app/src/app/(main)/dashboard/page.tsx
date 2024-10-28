import { MainShell } from '@rag/ui/MainShell'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

import { DashboardContent } from './modules/DashboardContent'

export default function Dashboard() {
  return (
    <MainShell>
      <DashboardContent />
    </MainShell>
  )
}
