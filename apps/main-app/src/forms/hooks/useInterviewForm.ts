'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { InterviewsTypeEnum } from '@gql/graphql'

import { TInterviewForm } from '@/forms/types'

export const InterviewFormSchema = z.object({
  interviewType: z.nativeEnum(InterviewsTypeEnum),
  jobDescription: z.string(),
  jobTitle: z.string().min(1, "Job title can't be empty"),
  resumeId: z.string().optional(),
})

export const useInterviewForm = () => {
  const defaultValues = {
    interviewType: InterviewsTypeEnum.JobInterviewBehavioralTechnical,
    jobDescription: '',
    jobTitle: '',
    resumeId: '',
  }

  const form = useForm<TInterviewForm>({
    defaultValues,
    resolver: zodResolver(InterviewFormSchema),
  })

  return {
    form,
    resetForm: () => form.reset(),
  }
}
