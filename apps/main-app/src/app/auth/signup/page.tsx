import { OrDivider } from '@canyon/ui/OrDivider'
import { objectToQueryString } from '@canyon/utils'
import { Metadata } from 'next'
import Link from 'next/link'

import { getCurrentUser } from '@/lib/session'

import { GoogleOAuthButton } from '../components/GoogleOAuthButton'
import { SignUpForm } from '../components/SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default async function SignUp({ searchParams }: { searchParams?: Record<string, string> }) {
  const user = await getCurrentUser()

  const signinUrl = searchParams
    ? `/auth/signin?${objectToQueryString(searchParams)}`
    : '/auth/signin'

  return (
    <div className="flex flex-col">
      {user ? (
        <p className="text-muted-foreground">You are already signed in.</p>
      ) : (
        <>
          <h1 className="mb-1 text-3xl font-semibold tracking-tight">Sign up</h1>
          <p className="text-muted-foreground mb-8">
            Already have an account?{' '}
            <Link className="underline" href={signinUrl}>
              Sign in
            </Link>
          </p>
          <GoogleOAuthButton type="signup" />
          <OrDivider className="my-6" />
          <SignUpForm />
        </>
      )}
    </div>
  )
}
