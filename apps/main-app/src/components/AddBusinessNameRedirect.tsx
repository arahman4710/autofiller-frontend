"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

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
