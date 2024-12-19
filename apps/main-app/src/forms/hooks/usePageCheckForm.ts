'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { PageCheckIntervalEnum, PageCheckResultTypeEnum, PageCheckTypeEnum } from '@gql/graphql'

import { TPageCheckForm } from '@/forms/types'

export const PageCheckFormSchema = z.object({
  checkInterval: z.nativeEnum(PageCheckIntervalEnum),
  keywordFilter: z.string(),
  multiplePages: z.boolean(),
  pageCheckType: z.nativeEnum(PageCheckTypeEnum),
  priceDiscrepancyThresholdAmount: z.string().optional(),
  priceMinAllowed: z.string().optional(),
  prompt: z.string(),
  resultType: z.nativeEnum(PageCheckResultTypeEnum),
  url: z.string().min(1, "Page check URL can't be empty"),
})

export const usePageCheckForm = () => {
  const defaultValues = {
    checkInterval: PageCheckIntervalEnum.Weekly,
    keywordFilter: '',
    multiplePages: false,
    pageCheckType: PageCheckTypeEnum.JobTitles,
    priceDiscrepancyThresholdAmount: undefined,
    priceMinAllowed: undefined,
    prompt: '',
    resultType: PageCheckResultTypeEnum.Multiple,
    url: '',
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
