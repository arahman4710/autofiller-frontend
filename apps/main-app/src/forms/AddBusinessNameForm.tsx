import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { InfoTooltip } from '@rag/ui/InfoTooltip'
import { Input } from '@rag/ui/Input'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { TAddBusinessNameForm } from '@/forms/types'

export const ADD_BUSINESS_NAME_FORM_ID = 'add-business-name-form'

interface IAddBusinessNameFormProps {
  form: UseFormReturn<TAddBusinessNameForm>
  onSubmit: SubmitHandler<TAddBusinessNameForm>
}

export const AddBusinessNameForm = ({ form, onSubmit }: IAddBusinessNameFormProps) => {
  return (
    <Form {...form}>
      <form className="space-y-4" id={ADD_BUSINESS_NAME_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
