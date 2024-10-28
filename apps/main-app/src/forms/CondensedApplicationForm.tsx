import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Input } from '@rag/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Tiptap } from '@rag/ui/Tiptap'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { statusOptions } from '@/constants/usersJobStatus'
import { TApplicationForm } from '@/forms/types'

export const CONDENSED_APPLICATION_FORM_ID = 'new-application-form'

interface IApplicationFormProps {
  children?: React.ReactNode
  form: UseFormReturn<TApplicationForm>
  isArchived?: boolean
  onSubmit: SubmitHandler<TApplicationForm>
}

export const CondensedApplicationForm = ({
  children,
  form,
  isArchived = false,
  onSubmit,
}: IApplicationFormProps) => {
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        id={CONDENSED_APPLICATION_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-between space-x-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isArchived} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-row justify-between space-x-6">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isArchived} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isArchived}
                      onValueChange={(value) => {
                        if (value) {
                          field.onChange(value)
                        }
                      }}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an application status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(statusOptions).map((option) => (
                          <SelectItem key={option[0]} value={option[0]}>
                            {option[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="jobDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Tiptap
                      content={field.value}
                      disabled={isArchived}
                      onChange={field.onChange}
                      placeholder="Paste the job description here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {children}
      </form>
    </Form>
  )
}
