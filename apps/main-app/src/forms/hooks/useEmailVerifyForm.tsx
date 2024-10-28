import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TEmailVerifyForm } from '@/forms/types'

export const EmailVerifyFormSchema = z.object({
  email: z.string(),
  firstName: z.string().min(1, "First name can't be empty"),
  lastName: z.string().min(1, "Last name can't be empty"),
  password: z
    .string()
    .min(7, 'password must contain at least 7 characters')
    .max(20, 'Password must contain at most 20 characters'),
})

interface IUseEmailVerifyFormParams {
  preloadedValues?: Partial<TEmailVerifyForm>
}

export const useEmailVerifyForm = ({ preloadedValues }: IUseEmailVerifyFormParams = {}) => {
  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  }

  const form = useForm<TEmailVerifyForm>({
    defaultValues,
    resolver: zodResolver(EmailVerifyFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
