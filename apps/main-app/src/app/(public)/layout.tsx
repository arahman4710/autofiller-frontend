import { redirect } from 'next/navigation'

import { UnauthorizedNavBar } from '@/components/UnauthorizedNavBar'
import { getCurrentUser } from '@/lib/session'

export default async function UnauthorizedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col">
      <UnauthorizedNavBar />
      <div className="border-border bg-background-secondary w-full overflow-hidden rounded-tl-xl border-l border-t">
        <main className="h-full px-6 py-3">{children}</main>
      </div>
    </div>
  )
}
