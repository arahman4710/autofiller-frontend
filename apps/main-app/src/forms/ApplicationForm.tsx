import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { IconText } from '@rag/ui/IconText'
import { InfoTooltip } from '@rag/ui/InfoTooltip'
import { Input } from '@rag/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Switch } from '@rag/ui/Switch'
import { Tiptap } from '@rag/ui/Tiptap'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { isValidHttpUrl } from '@rag/utils'
import { ArrowSquareOut, Info } from '@phosphor-icons/react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import {
  ApplicationContent_UsersJobsQuery,
  UsersJobsPayPeriodEnum,
  UsersJobsStatusEnum,
} from '@gql/graphql'

import { interviewStepOptions } from '@/constants/usersJobInterviewStep'
import { payPeriodOptions } from '@/constants/usersJobPayPeriod'
import { rejectedStageOptions } from '@/constants/usersJobRejectedStage'
import { statusOptions } from '@/constants/usersJobStatus'
import { TApplicationForm } from '@/forms/types'

export const APPLICATION_FORM_ID = 'new-application-form'

interface IApplicationFormProps {
  children?: React.ReactNode
  form: UseFormReturn<TApplicationForm>
  isArchived?: boolean
  isUpdating?: boolean
  jobPostingForClient?: boolean
  onSubmit: SubmitHandler<TApplicationForm>
  resumes: ApplicationContent_UsersJobsQuery['resumes']
  salaryOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  salaryOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const ApplicationForm = ({
  children,
  form,
  isArchived = false,
  isUpdating = false,
  jobPostingForClient = false,
  onSubmit,
  resumes,
  salaryOnChange,
  salaryOnKeyDown,
}: IApplicationFormProps) => {
  const status = form.watch('status')
  return (
    <Form {...form}>
      <form className="space-y-4" id={APPLICATION_FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isArchived} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-3/4 md:w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isArchived} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="w-1/4 md:flex md:w-full md:flex-col">
                    <FormLabel>Remote</FormLabel>
                    <FormControl>
                      <Switch
                        {...field}
                        checked={field.value}
                        disabled={isArchived}
                        onCheckedChange={field.onChange}
                        value={field?.value?.toString()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-6">
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
              {!jobPostingForClient && (
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
              )}
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-4 flex flex-row items-center gap-1">
                      Expected Salary Range
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="text-md" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Enter a salary range (e.g. 50,000-80,000) or a singular salary amount
                            (e.g. 50,000)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isArchived}
                        onChange={salaryOnChange}
                        onKeyDown={salaryOnKeyDown}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payPeriod"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Salary Pay Frequency</FormLabel>
                    <Select
                      disabled={isArchived}
                      onValueChange={(value) => {
                        if (value) {
                          field.onChange(value)
                        }
                      }}
                      {...field}
                    >
                      <FormControl defaultValue={UsersJobsPayPeriodEnum.Yearly}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(payPeriodOptions).map((option) => (
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
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-4 flex flex-row gap-1">
                    Job Details URL
                    {isValidHttpUrl(form.watch('url') || '') && (
                      <ArrowSquareOut
                        className="cursor-pointer"
                        onClick={() => window.open(form.watch('url'), '_blank')}
                      />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isArchived} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!jobPostingForClient && resumes.length > 0 && (
              <FormField
                control={form.control}
                name="resumeId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Resume</FormLabel>
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
                          <SelectValue placeholder="Select the resume you used for this job" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resumes.map((resume) => (
                          <SelectItem key={resume.id} value={resume.id}>
                            {resume.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {status === UsersJobsStatusEnum.Rejected && (
              <FormField
                control={form.control}
                name="rejectedStage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rejected Stage</FormLabel>
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
                          <SelectValue placeholder="Select a rejected stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(rejectedStageOptions).map((option) => (
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
            )}
            {status === UsersJobsStatusEnum.Interview && (
              <FormField
                control={form.control}
                name="interviewStep"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Interview Step</FormLabel>
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
                          <SelectValue placeholder="Select a interview step" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(interviewStepOptions).map((option) => (
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
            )}
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
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Tiptap
                      content={field.value}
                      disabled={isArchived}
                      onChange={field.onChange}
                      placeholder="Add notes about the position"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {jobPostingForClient && (
              <FormField
                control={form.control}
                name="applicationInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconText
                        rightIcon={
                          <InfoTooltip message="These instructions will be shown to the client on how they can apply to this job (Note: These instructions can only be added when creating the job posting)." />
                        }
                      >
                        Application Instructions
                      </IconText>
                    </FormLabel>
                    <FormControl>
                      <Tiptap
                        content={field.value}
                        disabled={isArchived || isUpdating}
                        onChange={field.onChange}
                        placeholder="Add application instructions for the client"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        {children}
      </form>
    </Form>
  )
}
