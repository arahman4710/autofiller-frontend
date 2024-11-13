import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Input } from '@rag/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TUserForm } from '@/forms/types'

export const USER_PROFILE_FORM_ID = 'user-profile-form'

interface IUserFormProps {
  form: UseFormReturn<TUserForm>
  onSubmit: SubmitHandler<TUserForm>
}

export const UserForm = ({ form, onSubmit }: IUserFormProps) => {
  return (
    <Form {...form}>
      <form className="space-y-4" id={USER_PROFILE_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-6">
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
          </div>
        </div>
      </form>
    </Form>
  )
}
