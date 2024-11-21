'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    person_profiles: 'identified_only',
    ui_host: 'https://us.posthog.com',
  })
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
