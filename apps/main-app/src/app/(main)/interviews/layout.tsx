'use client'

import { InterviewsSidebar } from './modules/InterviewsSidebar'

export default function InterviewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row">
      <InterviewsSidebar />
      {children}
    </div>
  )
}
