'use client'

import { useParams, usePathname } from 'next/navigation'

import { DocumentsToolbar } from './toolbars/DocumentsToolbar'
import { PageChecksToolbar } from './toolbars/PageChecksToolbar'

export const PageToolbar = () => {
  const pathname = usePathname()
  const params = useParams()

  switch (pathname) {
    case '/documents':
      return <DocumentsToolbar />
    case '/page-checks':
      return <PageChecksToolbar />
  }
}
