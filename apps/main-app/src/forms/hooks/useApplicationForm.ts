import { restrictKeyInput } from '@rag/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import {
  UsersJobsInterviewStepEnum,
  UsersJobsPayPeriodEnum,
  UsersJobsRejectedStageEnum,
  UsersJobsStatusEnum,
} from '@gql/graphql'

import { TApplicationForm } from '@/forms/types'

export const ApplicationFormSchema = z.object({
  applicationInstructions: z.string().optional(),
  company: z.string().min(1, "Company name can't be empty"),
  interviewStep: z.nativeEnum(UsersJobsInterviewStepEnum).optional(),
  isRemote: z.boolean().default(false).optional(),
  jobDetails: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  payPeriod: z.nativeEnum(UsersJobsPayPeriodEnum).optional(),
  position: z.string().min(1, "Position can't be empty"),
  rejectedStage: z.nativeEnum(UsersJobsRejectedStageEnum).optional(),
  resumeId: z.string().optional(),
  salary: z.string().optional(),
  status: z.nativeEnum(UsersJobsStatusEnum).optional(),
  url: z.string().url('Link must be a valid URL').or(z.literal('')).optional(),
})

interface IUseApplicationFormParams {
  preloadedValues?: Partial<TApplicationForm>
}

export const useApplicationForm = ({ preloadedValues }: IUseApplicationFormParams = {}) => {
  const defaultValues = {
    applicationInstructions: '',
    company: '',
    interviewstep: undefined,
    isRemote: false,
    jobDetails: '',
    location: '',
    notes: '',
    payPeriod: UsersJobsPayPeriodEnum.Yearly,
    position: '',
    rejectedStage: undefined,
    resumeId: undefined,
    salary: '',
    status: UsersJobsStatusEnum.Applied,
    url: '',
  }

  const form = useForm<TApplicationForm>({
    defaultValues,
    resolver: zodResolver(ApplicationFormSchema),
    values: { ...defaultValues, ...preloadedValues },
  })

  const resetForm = () => form.reset(defaultValues)

  const salaryOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    restrictKeyInput(e, new RegExp(/[0-9,-]/))

  const onKeyDownHandlers = {
    salaryOnKeyDown,
  }

  const salaryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const ranges = value.split('-')

    const dashCount = (value.match(/-/g) || []).length

    // Allow only one dash
    if (dashCount > 1) {
      return
    }

    // Format each part: remove non-digit characters, convert to number, add commas
    const formattedRanges = ranges.map((range) => {
      const parsedNumber = parseInt(range.replace(/[^\d]+/g, ''), 10) || ''
      return parsedNumber.toLocaleString()
    })

    // Join parts with dash
    const countWithCommas = formattedRanges.join('-')

    form.setValue('salary', countWithCommas, { shouldDirty: true })
  }

  const onChangeHandlers = {
    salaryOnChange,
  }

  const helpers = {
    sanitizedSalary: (): { max: Maybe<number>; min: Maybe<number> } => {
      const salaryInput = form.getValues('salary') ?? ''
      const [min, max] = salaryInput.replace(/,/g, '').split('-')

      return { max: parseInt(max), min: parseInt(min) }
    },
  }

  return {
    form,
    helpers,
    onChangeHandlers,
    onKeyDownHandlers,
    resetForm,
  }
}
