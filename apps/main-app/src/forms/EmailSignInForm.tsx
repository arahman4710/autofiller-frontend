import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@autofiller/ui/Form'
import { Input } from '@autofiller/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TEmailAuthSignInForm } from '@/forms/types'

export const EMAIL_SIGN_IN_FORM_ID = 'email-sign-in-form'

interface IEmailSignInFormProps {
  form: UseFormReturn<TEmailAuthSignInForm>
  onSubmit: SubmitHandler<TEmailAuthSignInForm>
}

export const EmailSignInForm = ({ form, onSubmit }: IEmailSignInFormProps) => {
  return (
    <Form {...form}>
      <form className="space-y-4" id={EMAIL_SIGN_IN_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
