import z from 'zod'

import { AddBusinessNameFormSchema } from '@/forms/hooks/useAddBusinessNameForm'
import { EmailAuthSignInFormSchema } from '@/forms/hooks/useEmailAuthSignInForm'
import { EmailAuthSignUpFormSchema } from '@/forms/hooks/useEmailAuthSignUpForm'
import { EmailVerifyFormSchema } from '@/forms/hooks/useEmailVerifyForm'
import { ForgotPasswordFormSchema } from '@/forms/hooks/useForgotPasswordForm'
import { ResetPasswordFormSchema } from '@/forms/hooks/useResetPasswordForm'
import { UserFormSchema } from '@/forms/hooks/useUserForm'
import { PageCheckFormSchema } from '@/forms/hooks/usePageCheckForm'

export type TAddBusinessNameForm = z.infer<typeof AddBusinessNameFormSchema>
export type TUserForm = z.infer<typeof UserFormSchema>
export type TResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>
export type TEmailVerifyForm = z.infer<typeof EmailVerifyFormSchema>
export type TEmailAuthSignInForm = z.infer<typeof EmailAuthSignInFormSchema>
export type TEmailAuthSignUpForm = z.infer<typeof EmailAuthSignUpFormSchema>
export type TForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>
export type TPageCheckForm = z.infer<typeof PageCheckFormSchema>
