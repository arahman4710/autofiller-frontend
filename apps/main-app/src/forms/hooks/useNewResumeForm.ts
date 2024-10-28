'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { TNewResumeForm } from '@/forms/types'

export const NewResumeFormSchema = z.object({
  title: z.string().optional(),
})

export const useNewResumeForm = () => {
  const defaultValues = {
    title: '',
  }

  const form = useForm<TNewResumeForm>({
    defaultValues,
    resolver: zodResolver(NewResumeFormSchema),
  })

  return {
    form,
    resetForm: () => form.reset(),
  }
}
