import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@autofiller/ui/Form'
import { Input } from '@autofiller/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TForgotPasswordForm } from '@/forms/types'

export const FORGOT_PASSWORD_FORM_ID = 'forgot-password-form'

interface IForgotPasswordFormProps {
  form: UseFormReturn<TForgotPasswordForm>
  onSubmit: SubmitHandler<TForgotPasswordForm>
}

export const ForgotPasswordForm = ({ form, onSubmit }: IForgotPasswordFormProps) => {
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        id={FORGOT_PASSWORD_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
