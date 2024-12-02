import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'

export default async function Home({ searchParams }) {
  const user = await getCurrentUser()
  const fromSearchParam = searchParams?.from

  if (!user) {
    redirect(authOptions()?.pages?.signIn || '/auth/signin')
  }

  if (fromSearchParam) {
    redirect(fromSearchParam)
  }

  redirect('/page-checks')
}
