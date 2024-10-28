import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@canyon/ui/Form'
import { Input } from '@canyon/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TResetPasswordForm } from '@/forms/types'

export const RESET_PASSWORD_FORM_ID = 'reset-password-form'

interface IResetPasswordFormProps {
  form: UseFormReturn<TResetPasswordForm>
  onSubmit: SubmitHandler<TResetPasswordForm>
}

export const ResetPasswordForm = ({ form, onSubmit }: IResetPasswordFormProps) => {
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        id={RESET_PASSWORD_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New Password *</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm New Password *</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
