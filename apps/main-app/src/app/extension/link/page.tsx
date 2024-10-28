'use client'

import { useEffect } from 'react'

import { SpinnerGap } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ExtensionPage() {
  const router = useRouter()
  const session = useSession()
  const sessionToken = session?.data?.token

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/extension/success')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (sessionToken) {
      // ⚠️ WARNING: modifying this postMessage payload will break extension authentication
      window.postMessage(
        {
          sessionToken,
          type: 'rag:extension:link',
        },
        '*'
      )
    }
  }, [sessionToken])

  return (
    <div className="flex gap-3">
      <SpinnerGap className="h-8 w-8 animate-spin text-amber-500" />
      <h1>Linking account...</h1>
    </div>
  )
}
