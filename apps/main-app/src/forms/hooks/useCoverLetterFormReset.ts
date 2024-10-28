import { useEffect, useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { TCoverLetterForm } from '@/forms/types'

interface IUseCoverLetterFormResetFormParams {
  coverLetter: TCoverLetterForm
  form: UseFormReturn<TCoverLetterForm>
}

export const useCoverLetterFormReset = ({
  coverLetter,
  form,
}: IUseCoverLetterFormResetFormParams) => {
  const coverLetterValues = useMemo(
    () => ({
      body: coverLetter?.body,
      candidateAddress: coverLetter?.candidateAddress,
      companyLocation: coverLetter?.companyLocation,
      companyName: coverLetter?.companyName,
      email: coverLetter?.email,
      firstName: coverLetter?.firstName,
      footer: coverLetter?.footer,
      lastName: coverLetter?.lastName,
      phoneNumber: coverLetter?.phoneNumber,
    }),
    [coverLetter]
  )

  useEffect(() => {
    form.reset({
      ...form.formState.defaultValues,
      body: coverLetterValues.body,
      candidateAddress: coverLetterValues.candidateAddress,
      companyLocation: coverLetterValues.companyLocation,
      companyName: coverLetterValues.companyName,
      email: coverLetterValues.email,
      firstName: coverLetterValues.firstName,
      footer: coverLetterValues.footer,
      lastName: coverLetterValues.lastName,
      phoneNumber: coverLetterValues.phoneNumber,
    })
  }, [coverLetterValues, form, coverLetter])
}
