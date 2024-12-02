'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { PageCheckIntervalEnum, PageCheckResultTypeEnum, PageCheckTypeEnum } from '@gql/graphql'

import { TPageCheckForm } from '@/forms/types'

export const PageCheckFormSchema = z.object({
  checkInterval: z.nativeEnum(PageCheckIntervalEnum),
  multiplePages: z.boolean(),
  resultType: z.nativeEnum(PageCheckResultTypeEnum),
  pageCheckType: z.nativeEnum(PageCheckTypeEnum),
  prompt: z.string(),
  url: z.string().min(1, "Page check URL can't be empty"),
})

export const usePageCheckForm = () => {
  const defaultValues = {
    checkInterval: PageCheckIntervalEnum.Weekly,
    multiplePages: false,
    resultType: PageCheckResultTypeEnum.Multiple,
    pageCheckType: PageCheckTypeEnum.JobTitles,
    prompt: '',
    url: ''
  }

  const form = useForm<TPageCheckForm>({
    defaultValues,
    resolver: zodResolver(PageCheckFormSchema),
  })

  return {
    form,
    resetForm: () => form.reset(),
  }
}
