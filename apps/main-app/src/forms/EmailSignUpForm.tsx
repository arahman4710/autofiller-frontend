import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@autofiller/ui/Form'
import { Input } from '@autofiller/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TEmailAuthSignUpForm } from '@/forms/types'

interface IEmailSignUpFormProps {
  form: UseFormReturn<TEmailAuthSignUpForm>
  onSubmit: SubmitHandler<TEmailAuthSignUpForm>
}

export const EmailSignUpForm = ({ form, onSubmit }: IEmailSignUpFormProps) => {
  return (
    <Form {...form}>
      <form id="email-sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
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
      </form>
    </Form>
  )
}
