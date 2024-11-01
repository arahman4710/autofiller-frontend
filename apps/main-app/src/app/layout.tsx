import { Suspense } from 'react'

import { Toaster } from '@rag/ui/Toaster'
import { cn } from '@rag/ui/utils/cn'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import Script from 'next/script'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/auth'
import { rollbarScript } from '@/lib/rollbar'

import { PreloadResources } from './preload-resources'
import { Providers } from './provider'
import { PostHogPageview } from './provider/Posthog'

import './globals.css'
import '@rag/ui/globals.css'

export const metadata: Metadata = {
  description: 'Canyon makes it easy to apply, track, and prepare for jobs.',
  icons: { icon: '/favicon.ico' },
  title: {
    default: 'Canyon',
    template: 'Canyon • %s',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions())
  const token = session?.token ?? ''

  return (
    <html lang="en">
      <PreloadResources />
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <Script id="rollbar-script">{rollbarScript}</Script>
      <body
        className={cn(
          'hover:scrollbar-thumb-background-transparent scrollbar-thumb-rounded-full bg-background scrollbar-track-transparent active:scrollbar-thumb-background min-h-screen',
          GeistSans.className
        )}
      >
        <Providers token={token}>
          {children}
          <SpeedInsights />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
