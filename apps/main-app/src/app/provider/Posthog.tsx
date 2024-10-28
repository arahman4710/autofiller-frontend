'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: `${process.env.NEXT_PUBLIC_APP_URL}/ingest`,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  })
}

export function PostHogPageview(): JSX.Element {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return <></>
}

export const PostHogProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  if (session) {
    posthog?.identify(session?.user?.id, {
      email: session?.user?.email,
      userId: session?.user?.id,
    })

    posthog.setPersonPropertiesForFlags({
      email: session?.user?.email,
    })
  }
  return <PHProvider client={posthog}>{children}</PHProvider>
}
