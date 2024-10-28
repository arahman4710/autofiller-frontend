import { useEffect, useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { Resumes, UsersJobs } from '@gql/graphql'

import { TApplicationForm } from '@/forms/types'

type TApplication = {
  resume?: Pick<Resumes, 'id'> | null | undefined
} & Pick<
  UsersJobs,
  | 'applicationInstructions'
  | 'companyName'
  | 'contacts'
  | 'interviewStep'
  | 'isRemote'
  | 'jobDetails'
  | 'location'
  | 'notes'
  | 'payPeriod'
  | 'position'
  | 'rejectedStage'
  | 'salaryMax'
  | 'salaryMin'
  | 'status'
  | 'url'
>

interface IUseApplicationFormResetFormParams {
  application: TApplication | undefined
  form: UseFormReturn<TApplicationForm>
}

export const useApplicationFormReset = ({
  application,
  form,
}: IUseApplicationFormResetFormParams) => {
  const applicationValues = useMemo(
    () => ({
      applicationInstructions: application?.applicationInstructions,
      companyName: application?.companyName,
      contacts: application?.contacts,
      interviewStep: application?.interviewStep,
      isRemote: application?.isRemote,
      jobDetails: application?.jobDetails,
      location: application?.location,
      notes: application?.notes,
      payPeriod: application?.payPeriod,
      position: application?.position,
      rejectedStage: application?.rejectedStage,
      resumeId: application?.resume?.id,
      salaryMax: application?.salaryMax,
      salaryMin: application?.salaryMin,
      status: application?.status,
      url: application?.url,
    }),
    [application]
  )

  const constructSalaryString = useMemo(() => {
    if (!application?.salaryMin && !application?.salaryMax) return ''

    const salaryMin = application?.salaryMin?.toLocaleString()
    const salaryMax = application?.salaryMax?.toLocaleString()

    if (salaryMax && !salaryMin) {
      return salaryMax
    }

    if (salaryMin && !salaryMax) {
      return salaryMin
    }

    return `${salaryMin}-${salaryMax}`
  }, [applicationValues.salaryMin, applicationValues.salaryMax])

  useEffect(() => {
    form.reset({
      ...form.formState.defaultValues,
      applicationInstructions: applicationValues?.applicationInstructions ?? '',
      company: applicationValues?.companyName,
      interviewStep: applicationValues?.interviewStep || undefined,
      isRemote: applicationValues?.isRemote ?? false,
      jobDetails: applicationValues?.jobDetails ?? '',
      location: applicationValues?.location ?? '',
      notes: applicationValues?.notes ?? '',
      payPeriod: applicationValues?.payPeriod,
      position: applicationValues?.position ?? '',
      rejectedStage: applicationValues?.rejectedStage || undefined,
      resumeId: applicationValues?.resumeId || undefined,
      salary: constructSalaryString,
      status: applicationValues?.status,
      url: applicationValues?.url ?? '',
    })
  }, [applicationValues, constructSalaryString, form, application])
}
