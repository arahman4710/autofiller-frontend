"use client"

import { useRouter } from 'next/navigation'

import { useCurrentUser } from '@/hooks/useCurrentUser'

export const AddBusinessNameRedirect = () => {
  const { user } = useCurrentUser()
  const router = useRouter()

  if (user?.business?.name == "") {
    router.replace('/add-business-name')
  }

  return (
    <>

    </>
  )
}
