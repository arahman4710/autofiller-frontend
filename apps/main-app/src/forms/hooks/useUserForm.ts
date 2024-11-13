import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TUserForm } from '@/forms/types'

export const UserFormSchema = z.object({
  firstName: z.string().min(1, "First name can't be empty"),
  lastName: z.string().min(1, "Last name can't be empty"),
})

interface IUseUserFormParams {
  preloadedValues?: Partial<TUserForm>
}

export const useUserForm = ({ preloadedValues }: IUseUserFormParams = {}) => {
  const defaultValues = {
    firstName: '',
    lastName: '',
  }

  const form = useForm<TUserForm>({
    defaultValues,
    resolver: zodResolver(UserFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
