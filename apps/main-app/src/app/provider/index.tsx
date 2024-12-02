'use client'

import { TooltipProvider } from '@rag/ui/Tooltip'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ErrorBoundary, Provider } from '@rollbar/react'
import { Session } from 'next-auth'

import { ApolloProvider } from '@/app/provider/Apollo'
import { AuthProvider } from '@/app/provider/Auth'
import { GlobalDialogsProvider } from '@/app/provider/GlobalDialogsProvider'
import { PostHogProvider } from '@/app/provider/Posthog'
import { rollbarConfig } from '@/lib/rollbar'


// MSW is not properly supported for TurboPack (or NextJS v14+ in general)
if (!process.env.NEXT_PUBLIC_TURBO_ENABLED && process.env.NODE_ENV === 'development') {
  import('@/__dev__/mocks').then(({ initMocks }) => {
    initMocks()
  })
}

interface IProviders {
  children: React.ReactNode
  token: Session['token']
}

export const Providers = ({ children, token }: IProviders) => {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_DRIVE_CLIENT_ID || '996936391552-48m5evvm2obhvmf5f6bala937jrtaaht.apps.googleusercontent.com'}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <PostHogProvider>
              <TooltipProvider delayDuration={400}>
                <ApolloProvider token={token}>
                  <GlobalDialogsProvider>{children}</GlobalDialogsProvider>
                </ApolloProvider>
              </TooltipProvider>
            </PostHogProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Provider>
    </GoogleOAuthProvider>
  )
}
