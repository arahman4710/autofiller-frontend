import z from 'zod'

import {
  CoverLetterLengthEnum,
  CoverLetterToneEnum,
  ResumesInputObjectSchema,
  UsersJobsCoverLetterInputObjectSchema,
} from '@gql/zod'

import { ApplicationFormSchema } from '@/forms/hooks/useApplicationForm'
import { EmailAuthSignInFormSchema } from '@/forms/hooks/useEmailAuthSignInForm'
import { EmailAuthSignUpFormSchema } from '@/forms/hooks/useEmailAuthSignUpForm'
import { EmailVerifyFormSchema } from '@/forms/hooks/useEmailVerifyForm'
import { ForgotPasswordFormSchema } from '@/forms/hooks/useForgotPasswordForm'
import { ImportResumeFromLinkedinFormSchema } from '@/forms/hooks/useImportResumeFromLinkedinForm'
import { InterviewFormSchema } from '@/forms/hooks/useInterviewForm'
import { NewResumeFormSchema } from '@/forms/hooks/useNewResumeForm'
import { ResetPasswordFormSchema } from '@/forms/hooks/useResetPasswordForm'
import { UserFormSchema } from '@/forms/hooks/useUserForm'

const ResumeBuilderFormSchema = ResumesInputObjectSchema()
const CoverLetterFormSchema = UsersJobsCoverLetterInputObjectSchema()

export type TResumeBuilderForm = z.infer<typeof ResumeBuilderFormSchema>
export type TApplicationForm = z.infer<typeof ApplicationFormSchema>
export type TUserForm = z.infer<typeof UserFormSchema>
export type TResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>
export type TEmailVerifyForm = z.infer<typeof EmailVerifyFormSchema>
export type TNewResumeForm = z.infer<typeof NewResumeFormSchema>
export type TImportResumeFromLinkedinForm = z.infer<typeof ImportResumeFromLinkedinFormSchema>
export type TInterviewForm = z.infer<typeof InterviewFormSchema>
export type TCoverLetterForm = z.infer<typeof CoverLetterFormSchema>
export type TCoverLetterConfigForm = {
  coverLetterLength: CoverLetterLengthEnum
  coverLetterTone: CoverLetterToneEnum
  resumeId: string
}
export type TEmailAuthSignInForm = z.infer<typeof EmailAuthSignInFormSchema>
export type TEmailAuthSignUpForm = z.infer<typeof EmailAuthSignUpFormSchema>
export type TForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>
