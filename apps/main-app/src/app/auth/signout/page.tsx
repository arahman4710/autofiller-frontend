'use client'

import { useEffect } from 'react'

import { signOut } from 'next-auth/react'
import posthog from 'posthog-js'

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: `${window.location.origin}/auth/signin` })
    posthog.reset()
    localStorage.clear()
  }, [])

  return null
}
