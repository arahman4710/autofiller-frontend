import { useEffect, useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { TEmailVerifyForm } from '@/forms/types'

interface IUseEmailVerifyFormResetFormParams {
  email: string
  firstName: string
  form: UseFormReturn<TEmailVerifyForm>
  lastName: string
}

export const useEmailVerifyFormReset = ({ email, firstName, form, lastName }: IUseEmailVerifyFormResetFormParams) => {
  const emailVerifyValues = useMemo(
    () => ({
      email: email,
      firstName: firstName,
      lastName: lastName,
    }),
    [firstName, lastName]
  )

  useEffect(() => {
    form.reset({
      ...form.formState.defaultValues,
      email: emailVerifyValues.email || '',
      firstName: emailVerifyValues.firstName || '',
      lastName: emailVerifyValues.lastName || '',
    })
  }, [emailVerifyValues, form, firstName, lastName])
}
