import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TForgotPasswordForm } from '@/forms/types'

export const ForgotPasswordFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
})

interface IUseForgotPasswordFormParams {
  preloadedValues?: Partial<TForgotPasswordForm>
}

export const useForgotPasswordForm = ({ preloadedValues }: IUseForgotPasswordFormParams = {}) => {
  const defaultValues = {
    email: '',
    newPassword: '',
  }

  const form = useForm<TForgotPasswordForm>({
    defaultValues,
    resolver: zodResolver(ForgotPasswordFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
