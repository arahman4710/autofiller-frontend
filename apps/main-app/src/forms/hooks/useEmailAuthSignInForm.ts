import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TEmailAuthSignInForm } from '@/forms/types'

export const EmailAuthSignInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
})

interface IUseEmailAuthSignInFormParams {
  preloadedValues?: Partial<TEmailAuthSignInForm>
}

export const useEmailAuthSignInForm = ({ preloadedValues }: IUseEmailAuthSignInFormParams = {}) => {
  const defaultValues = {
    email: '',
    password: '',
  }

  const form = useForm<TEmailAuthSignInForm>({
    defaultValues,
    resolver: zodResolver(EmailAuthSignInFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
