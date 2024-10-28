import { MainShell } from '@canyon/ui/MainShell'
import { Metadata } from 'next'

import { Applications } from './modules/Applications'

export const metadata: Metadata = {
  title: 'Applications',
}

export default function Board() {
  return (
    <MainShell>
      <Applications />
    </MainShell>
  )
}
