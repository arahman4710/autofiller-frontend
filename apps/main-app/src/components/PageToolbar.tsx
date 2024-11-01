'use client'

import { useParams, usePathname } from 'next/navigation'
import { DocumentsToolbar } from './toolbars/DocumentsToolbar'

export const PageToolbar = () => {
  const pathname = usePathname()
  const params = useParams()

  switch (pathname) {
    case '/documents':
      return <DocumentsToolbar />
  }
}
