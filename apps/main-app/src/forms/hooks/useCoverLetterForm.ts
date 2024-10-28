import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UsersJobsCoverLetterInputObjectSchema } from '@gql/zod'

import { TCoverLetterForm } from '@/forms/types'

interface IUseCoverLetterFormParams {
  preloadedValues?: Partial<TCoverLetterForm>
}

export const defaultValues: TCoverLetterForm = {
  body: '',
  candidateAddress: '',
  companyLocation: '',
  companyName: '',
  email: '',
  firstName: '',
  footer: '',
  lastName: '',
  phoneNumber: '',
}

export const useCoverLetterForm = ({ preloadedValues }: IUseCoverLetterFormParams = {}) => {
  const form = useForm<TCoverLetterForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(UsersJobsCoverLetterInputObjectSchema()),
    values: { ...defaultValues, ...preloadedValues },
  })

  return {
    ...form,
    form,
  }
}
