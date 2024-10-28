import { redirect } from 'next/navigation'

import { RootDocument, UsersRoleEnum } from '@gql/graphql'

import { advisoryOrgRoles } from '@/constants/usersRole'
import { getClient } from '@/lib/apolloClient'
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

  const { data } = await getClient().query({ query: RootDocument })

  const role = data?.user?.role

  if (advisoryOrgRoles.includes(role)) {
    if (role === UsersRoleEnum.Admin) {
      redirect('/advisors')
    }

    redirect('/clients')
  }

  if (data?.resumes?.length === 0) {
    redirect('/resumes')
  }

  if (data?.user.completedAllChecklistItems) {
    redirect('/board')
  }

  redirect('/dashboard')
}
