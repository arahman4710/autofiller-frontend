'use client'

import { useRef } from 'react'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@rag/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Input } from '@rag/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Tiptap } from '@rag/ui/Tiptap'
import { useToast } from '@rag/ui/useToast'
import { Chat } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  InterviewsSidebar_InterviewsDocument,
  InterviewsTypeEnum,
  NewInterviewDialog_InterviewStartMockDocument,
  NewInterviewDialog_ResumeDocument,
} from '@gql/graphql'

import { useInterviewForm } from '@/forms/hooks/useInterviewForm'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface INewInterviewDialogProps {
  children?: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

const MAX_STARTED_INTERVIEWS = 1

export const NewInterviewDialog = ({ children, open, setOpen }: INewInterviewDialogProps) => {
  const { errorToast } = useToast()
  const router = useRouter()
  const resumeStateSet = useRef(false)
  const upgradePlanDialog = useUpgradePlanDialog()

  const [startMock, { loading: isStartMockMutationLoading }] = useMutation(
    NewInterviewDialog_InterviewStartMockDocument,
    {
      refetchQueries: [InterviewsSidebar_InterviewsDocument],
    }
  )
  const { data: resumeData } = useQuery(NewInterviewDialog_ResumeDocument, {
    variables: {
      archived: false,
    },
  })
  const { isPaidPlan, user } = useCurrentUser()
  const resumes = resumeData?.resumes ?? []

  const { form } = useInterviewForm()
  const interviewTypeOptions: Record<InterviewsTypeEnum, string> = {
    [InterviewsTypeEnum.IntroRecruiterScreen]: 'Intro Recruiter Screen',
    [InterviewsTypeEnum.JobInterviewBehavioralTechnical]: 'Technical Interview',
  }
  const jobTitle = form.watch('jobTitle')
  const interviewType = form.watch('interviewType')
  const resumeId = form.watch('resumeId')
  const jobDescription = form.watch('jobDescription')
  if (!resumeId && resumes.length > 0 && !resumeStateSet.current) {
    form.setValue('resumeId', resumes[0].id)
    resumeStateSet.current = true
  }

  const handleStartInterview = async () => {
    if (
      user?.numStartedInterviews &&
      user.numStartedInterviews >= MAX_STARTED_INTERVIEWS &&
      !isPaidPlan
    ) {
      upgradePlanDialog.setOpen(true)
      return
    }
    try {
      const response = await startMock({
        variables: {
          interviewType,
          jobDescription,
          jobTitle,
          resumeId,
        },
      })

      setOpen(false)

      router.replace(`/interviews/${response?.data?.interviewStartMock?.id}`)
    } catch (e) {
      errorToast()
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="max-w-[750px]"
        disableOutsideClose
        title="Start New AI Interview"
        titleIcon={<Chat />}
      >
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleStartInterview)}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Interview Type</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an interview type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(interviewTypeOptions).map((option) => (
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
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Job title *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {interviewType == InterviewsTypeEnum.IntroRecruiterScreen && (
                <FormField
                  control={form.control}
                  name="resumeId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Resume *</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a resume before you can get started" />
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
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Tiptap
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="Paste the job description here (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row justify-end gap-2">
              <DialogClose asChild disabled={isStartMockMutationLoading}>
                <Button size="lg" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={
                  interviewType == InterviewsTypeEnum.IntroRecruiterScreen && resumeId == ''
                }
                loading={isStartMockMutationLoading}
                size="lg"
                type="submit"
                variant="cta"
              >
                Start Interview
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
