import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TEmailAuthSignUpForm } from '@/forms/types'

export const EmailAuthSignUpFormSchema = z.object({
  email: z.string().email(),
})

interface IUseEmailAuthSignUpFormParams {
  preloadedValues?: Partial<TEmailAuthSignUpForm>
}

export const useEmailAuthSignUpForm = ({ preloadedValues }: IUseEmailAuthSignUpFormParams = {}) => {
  const defaultValues = {
    email: '',
  }

  const form = useForm<TEmailAuthSignUpForm>({
    defaultValues,
    resolver: zodResolver(EmailAuthSignUpFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
