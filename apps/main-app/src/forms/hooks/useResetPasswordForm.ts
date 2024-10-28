import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TResetPasswordForm } from '@/forms/types'

export const ResetPasswordFormSchema = z
  .object({
    confirmNewPassword: z.string(),
    newPassword: z.string().min(7, 'New password must contain at least 7 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  })

interface IUseResetPasswordFormParams {
  preloadedValues?: Partial<TResetPasswordForm>
}

export const useResetPasswordForm = ({ preloadedValues }: IUseResetPasswordFormParams = {}) => {
  const defaultValues = {
    confirmNewPassword: '',
    newPassword: '',
  }

  const form = useForm<TResetPasswordForm>({
    defaultValues,
    resolver: zodResolver(ResetPasswordFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
