'use client'

import { ChatSidebar } from './modules/ChatSidebar'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-row">
      <ChatSidebar />
      {children}
    </div>
  )
}
