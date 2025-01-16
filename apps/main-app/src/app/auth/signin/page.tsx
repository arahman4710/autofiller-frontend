import { OrDivider } from '@autofiller/ui/OrDivider'
import { objectToQueryString } from '@autofiller/utils'
import { Metadata } from 'next'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/session'

import { GoogleOAuthButton } from '../components/GoogleOAuthButton'
import { SignInForm } from '../components/SignInForm'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignIn({ searchParams }: { searchParams?: Record<string, string> }) {
  const user = await getCurrentUser()

  const signupUrl = searchParams
    ? `/auth/signup?${objectToQueryString(searchParams)}`
    : '/auth/signup'

  return (
    <div className="flex flex-col">
      {user ? (
        <p className="text-muted-foreground">You are already signed in.</p>
      ) : (
        <>
          <h1 className="mb-1 text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            New to Pagetracker?{' '}
            <Link className="underline" href={signupUrl}>
              Sign up
            </Link>
          </p>
          <GoogleOAuthButton type="signin" />
          <OrDivider className="my-6" />
          <SignInForm />
        </>
      )}
    </div>
  )
}
