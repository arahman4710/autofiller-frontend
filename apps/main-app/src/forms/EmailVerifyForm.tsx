import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@canyon/ui/Form'
import { InfoTooltip } from '@canyon/ui/InfoTooltip'
import { Input } from '@canyon/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TEmailVerifyForm } from '@/forms/types'

export const EMAIL_VERIFY_FORM_ID = 'email-verify-form'

interface IEmailVerifyFormProps {
  form: UseFormReturn<TEmailVerifyForm>
  onSubmit: SubmitHandler<TEmailVerifyForm>
}

export const EmailVerifyForm = ({ form, onSubmit }: IEmailVerifyFormProps) => {
  return (
    <Form {...form}>
      <form className="space-y-4" id={EMAIL_VERIFY_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel className="flex items-center gap-1">
                  Password *{' '}
                  <InfoTooltip message="Your password must be at least 7 characters long." />
                </FormLabel>
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
