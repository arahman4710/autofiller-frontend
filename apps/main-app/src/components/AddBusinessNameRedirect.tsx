"use client"

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

export const AddBusinessNameRedirect = () => {
  const { user } = useCurrentUser()
  const router = useRouter()

  console.log("WHAT")
  console.log(user?.business)
  if (user?.business?.name == "") {
    router.replace('/add-business-name')
  }

  return (
    <>
    </>
  )
}
