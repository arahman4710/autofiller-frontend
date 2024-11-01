import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TAddBusinessNameForm } from '@/forms/types'

export const AddBusinessNameFormSchema = z.object({
  name: z.string().min(1, "Business name can't be empty"),
})

interface IAddBusinessNameFormParams {
  preloadedValues?: Partial<TAddBusinessNameForm>
}

export const useAddBusinessNameForm = ({ preloadedValues }: IAddBusinessNameFormParams = {}) => {
  const defaultValues = {
    name: '',
  }

  const form = useForm<TAddBusinessNameForm>({
    defaultValues,
    resolver: zodResolver(AddBusinessNameFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  return {
    form,
    resetForm,
  }
}
