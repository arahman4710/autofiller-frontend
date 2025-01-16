'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@autofiller/ui/Button'
import { useToast } from '@autofiller/ui/useToast'
import { objectToQueryString } from '@autofiller/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { CredentialsAuthenticationSignUpDocument } from '@gql/graphql'

import { EmailSignUpForm } from '@/forms/EmailSignUpForm'
import { useEmailAuthSignUpForm } from '@/forms/hooks/useEmailAuthSignUpForm'

export const SignUpForm = () => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const { form } = useEmailAuthSignUpForm()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { errorToast } = useToast()

  const [signUp] = useMutation(CredentialsAuthenticationSignUpDocument)

  const handleSubmit = async () => {
    setIsSignUpLoading(true)
    const formValues = form.getValues()

    try {
      const { data } = await signUp({
        variables: {
          email: formValues.email,
        },
      })

      if (data?.authSignUp) {
        router.push('/auth/verify-email-pending')
      }
    } catch (error) {
      const { networkError } = error

      if (networkError && networkError.result && networkError.result.errors?.length) {
        if (networkError.result.errors[0]?.message === 'user_already_exists') {
          form.setError('email', {
            message: 'Email is already in use',
          })
        }
      } else {
        errorToast({
          description: 'Please try again later.',
          title: 'Something went wrong',
        })
      }
    } finally {
      setIsSignUpLoading(false)
    }
  }

  const isFormValid = form.formState.isValid

  return (
    <div className="space-y-5">
      <EmailSignUpForm form={form} onSubmit={handleSubmit} />
      <Button
        disabled={!isFormValid}
        form="email-sign-up-form"
        fullWidth
        loading={isSignUpLoading}
        size="lg"
        type="submit"
        variant="cta"
      >
        Continue
      </Button>
    </div>
  )
}
