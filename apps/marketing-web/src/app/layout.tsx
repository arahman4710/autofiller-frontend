import type { Metadata } from 'next'

import { Suspense } from 'react'

import { cn } from '@autofiller/ui/utils/cn'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'

import Provider from '@/app/provider'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import PostHogPageView from '@/lib/posthog/PostHogPageView'

import './globals.css'
import '@autofiller/ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Autofiller.',
  icons: { icon: '/favicon.ico' },
  title: 'Autofiller',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Provider>
        <Suspense>
          <PostHogPageView />
        </Suspense>
        <SpeedInsights />
        <body
          className={cn(
            'active:scrollbar-thumb-background bg-background scrollbar-thumb-rounded-full scrollbar-track-transparent min-h-screen overflow-x-hidden font-sans antialiased',
            inter.className
          )}
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </Provider>
    </html>
  )
}
