'use client'

import { useState } from 'react'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@autofiller/ui/Button'
import { useToast } from '@autofiller/ui/useToast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { PageHeader } from '@/components/PageHeader'
import { EMAIL_VERIFY_FORM_ID, EmailVerifyForm } from '@/forms/EmailVerifyForm'
import { useEmailVerifyForm } from '@/forms/hooks/useEmailVerifyForm'
import { useEmailVerifyFormReset } from '@/forms/hooks/useEmailVerifyFormReset'
import { EmailVerify_EmailVerifyAllowedDocument } from '@/gql/__generated__/graphql'

export const EmailVerify = () => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const { errorToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''

  const { data } = useSuspenseQuery(EmailVerify_EmailVerifyAllowedDocument, {
    variables: { emailVerificationCode: token },
  })

  const emailVerifyAllowed = data?.emailVerifyAllowed
  const firstName = data?.emailVerifyAllowed?.firstName || ''
  const lastName = data?.emailVerifyAllowed?.lastName || ''
  const email = data?.emailVerifyAllowed?.email || ''
  const { form } = useEmailVerifyForm()
  useEmailVerifyFormReset({ email, firstName, form, lastName })

  const handleOnSubmit = async () => {
    const formValues = form.getValues()

    try {
      setIsSignUpLoading(true)
      const result = await signIn('signup', {
        emailVerificationCode: token,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password,
        redirect: false,
      })

      if (!result?.error) {
        if (typeof window !== 'undefined') {
          window.location.replace('/')
        } else {
          router.replace('/')
        }
      } else {
        errorToast()
      }
    } catch (e) {
      console.error(e)

      errorToast()
    } finally {
      setIsSignUpLoading(false)
    }
  }

  const isValid = form.formState.isValid

  return emailVerifyAllowed ? (
    <>
      <PageHeader
        subtitle="Strong passwords include numbers, letters, and symbols."
        title="Add your profile details to get started"
      />
      <EmailVerifyForm form={form} onSubmit={handleOnSubmit} />
      <Button
        className="mt-4"
        disabled={!isValid}
        form={EMAIL_VERIFY_FORM_ID}
        fullWidth={true}
        loading={isSignUpLoading}
        size="lg"
        type="submit"
        variant="cta"
      >
        Continue
      </Button>
    </>
  ) : (
    <p>
      Your verification token is either invalid or has expired. Please{' '}
      <Link className="underline" href="/auth/signup">
        Sign up
      </Link>
      again.
    </p>
  )
}
