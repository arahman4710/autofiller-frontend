'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Alert, AlertDescription, AlertTitle } from '@canyon/ui/Alert'
import { Button } from '@canyon/ui/Button'
import { useToast } from '@canyon/ui/useToast'

import { ForgotPassword_AuthPasswordResetRequestDocument } from '@gql/graphql'

import { FORGOT_PASSWORD_FORM_ID, ForgotPasswordForm } from '@/forms/ForgotPasswordForm'
import { useForgotPasswordForm } from '@/forms/hooks/useForgotPasswordForm'

export const ForgotPassword = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { errorToast } = useToast()

  const [forgotPassword, { loading }] = useMutation(ForgotPassword_AuthPasswordResetRequestDocument)

  const { form } = useForgotPasswordForm()

  const handleSubmit = async () => {
    const formValues = form.getValues()

    try {
      await forgotPassword({ variables: { email: formValues.email } })
      setHasSubmitted(true)
    } catch (error) {
      errorToast({ description: 'Please try again later', title: 'Something went wrong' })
    }
  }

  const isValid = form.formState.isValid

  return hasSubmitted ? (
    <Alert variant="information">
      <AlertTitle>Check your email</AlertTitle>
      <AlertDescription>
        If an account exists, we'll send you a link to reset your password.
      </AlertDescription>
    </Alert>
  ) : (
    <>
      <ForgotPasswordForm form={form} onSubmit={handleSubmit} />

      <Button
        className="mt-4"
        disabled={!isValid}
        form={FORGOT_PASSWORD_FORM_ID}
        fullWidth={true}
        loading={loading}
        size="lg"
        type="submit"
        variant="cta"
      >
        Continue
      </Button>
    </>
  )
}
