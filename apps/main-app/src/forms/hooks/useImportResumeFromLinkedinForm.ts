'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TImportResumeFromLinkedinForm } from '@/forms/types'

export const ImportResumeFromLinkedinFormSchema = z.object({
  linkedinProfileUrl: z.string().optional(),
})

export const useImportResumeFromLinkedinForm = () => {
  const defaultValues = {
    linkedinProfileUrl: '',
  }

  const form = useForm<TImportResumeFromLinkedinForm>({
    defaultValues,
    resolver: zodResolver(ImportResumeFromLinkedinFormSchema),
  })

  return {
    form,
    resetForm: () => form.reset(),
  }
}
