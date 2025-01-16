'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@autofiller/ui/Button'
import { useToast } from '@autofiller/ui/useToast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { PageHeader } from '@/components/PageHeader'
import { RESET_PASSWORD_FORM_ID, ResetPasswordForm } from '@/forms/ResetPasswordForm'
import { useResetPasswordForm } from '@/forms/hooks/useResetPasswordForm'
import {
  ResetPassword_ResetPasswordAllowedDocument,
  ResetPassword_ResetPasswordDocument,
} from '@/gql/__generated__/graphql'

export const ResetPassword = () => {
  const { errorToast, successToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''

  const { data, loading } = useQuery(ResetPassword_ResetPasswordAllowedDocument, {
    variables: { resetPasswordToken: token },
  })
  const [resetPassword] = useMutation(ResetPassword_ResetPasswordDocument)

  const resetPasswordAllowed = data?.resetPasswordAllowed
  const { form } = useResetPasswordForm()

  const handleOnSubmit = async () => {
    const formValues = form.getValues()

    try {
      const { data } = await resetPassword({
        variables: {
          newPassword: formValues.newPassword,
          resetPasswordToken: token,
        },
      })

      if (data?.authResetPassword) {
        successToast({ title: 'Password reset successful' })
        router.push('/auth/signin')
      }
    } catch (e) {
      console.error(e)

      errorToast()
    }
  }

  return resetPasswordAllowed ? (
    <>
      <PageHeader
        subtitle="Strong passwords include numbers, letters, and symbols."
        title="Reset Your Password"
      />
      <ResetPasswordForm form={form} onSubmit={handleOnSubmit} />
      <Button
        className="mt-4"
        form={RESET_PASSWORD_FORM_ID}
        fullWidth={true}
        loading={loading}
        size="lg"
        type="submit"
        variant="cta"
      >
        Reset Password
      </Button>
    </>
  ) : (
    <p>
      Your token is either invalid or has expired. Please{' '}
      <Link className="underline" href="/auth/forgot-password">
        submit a new request
      </Link>
      .
    </p>
  )
}
