'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import { useToast } from '@rag/ui/useToast'
import { objectToQueryString } from '@rag/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { EMAIL_SIGN_IN_FORM_ID, EmailSignInForm } from '@/forms/EmailSignInForm'
import { useEmailAuthSignInForm } from '@/forms/hooks/useEmailAuthSignInForm'

export const SignInForm = () => {
  const [isSignInLoading, setIsSignInLoading] = useState(false)
  const { form } = useEmailAuthSignInForm()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { errorToast } = useToast()

  const origin = (typeof window !== 'undefined' && window.location?.origin) || '/'

  const callbackUrl = searchParams ? `${origin}?${objectToQueryString(searchParams)}` : origin

  const handleSubmit = async () => {
    setIsSignInLoading(true)

    const formValues = form.getValues()

    const result = await signIn('signin', {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    })

    if (!result?.error) {
      if (typeof window !== 'undefined') {
        window.location.replace(callbackUrl)
      } else {
        router.replace(callbackUrl)
      }
    } else {
      errorToast({ description: '', title: 'Invalid email or password' })
      setIsSignInLoading(false)
    }
  }

  const isValid = form.formState.isValid

  return (
    <div className="space-y-5">
      <EmailSignInForm form={form} onSubmit={handleSubmit} />
      <p>
        <Link className="text-muted-foreground text-sm underline" href="/auth/forgot-password">
          Forgot Password
        </Link>
      </p>
      <Button
        disabled={!isValid}
        form={EMAIL_SIGN_IN_FORM_ID}
        fullWidth
        loading={isSignInLoading}
        size="lg"
        type="submit"
        variant="cta"
      >
        Continue
      </Button>
    </div>
  )
}
