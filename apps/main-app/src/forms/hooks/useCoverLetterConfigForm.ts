import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CoverLetterLengthEnum, CoverLetterToneEnum } from '@gql/zod'

import { TCoverLetterConfigForm } from '@/forms/types'

export const ICoverLetterConfigFormSchema = z.object({
  coverLetterLength: z.nativeEnum(CoverLetterLengthEnum),
  coverLetterTone: z.nativeEnum(CoverLetterToneEnum),
  resumeId: z.string(),
})

interface IUseCoverLetterConfigFormParams {
  preloadedValues?: Partial<TCoverLetterConfigForm>
}

export const defaultValues: TCoverLetterConfigForm = {
  coverLetterLength: CoverLetterLengthEnum.Medium,
  coverLetterTone: CoverLetterToneEnum.Formal,
  resumeId: '',
}

export const useCoverLetterConfigForm = ({
  preloadedValues,
}: IUseCoverLetterConfigFormParams = {}) => {
  const form = useForm<TCoverLetterConfigForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ICoverLetterConfigFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  return {
    ...form,
    form,
  }
}
