import { useEffect, useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { UsersUpdateFragment } from '@gql/graphql'

import { TUserForm } from '@/forms/types'

interface IUseUserFormResetFormParams {
  form: UseFormReturn<TUserForm>
  user: UsersUpdateFragment | undefined
}

export const useUserFormReset = ({ form, user }: IUseUserFormResetFormParams) => {
  const userValues = useMemo(
    () => ({
      firstName: user?.firstName,
      lastName: user?.lastName,
    }),
    [user]
  )

  useEffect(() => {
    form.reset({
      ...form.formState.defaultValues,
      firstName: userValues.firstName || '',
      lastName: userValues.lastName || '',
    })
  }, [userValues, form, user])
}
