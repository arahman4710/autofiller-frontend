import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@rag/ui/Dialog'
import { IconText } from '@rag/ui/IconText'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { useToast } from '@rag/ui/useToast'
import { cn } from '@rag/ui/utils/cn'
import { PlusCircle } from '@phosphor-icons/react'
import { Plus } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  CoverLettersList_CoverLettersDocument,
  NewApplicationDialog_CreateUsersJobDocument,
  NewCoverLetterDialog_CoverLetterUpsertDocument,
  NewCoverLetterDialog_ResumesDocument,
  NewCoverLetterDialog_UsersJobsDocument,
} from '@gql/graphql'

import {
  CONDENSED_APPLICATION_FORM_ID,
  CondensedApplicationForm,
} from '@/forms/CondensedApplicationForm'
import { useApplicationForm } from '@/forms/hooks/useApplicationForm'

interface INewCoverLetterDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewCoverLetterDialog = ({ open, setOpen }: INewCoverLetterDialogProps) => {
  const router = useRouter()
  const { errorToast } = useToast()

  const { form, resetForm } = useApplicationForm()
  const { formState } = form

  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('')
  const [selectedResumeId, setSelectedResumeId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedApplicationId('')
      resetForm()
    }

    setOpen(open)
  }

  const { data: resumesData } = useQuery(NewCoverLetterDialog_ResumesDocument)
  const resumes = resumesData?.resumes ?? []

  const { data: applicationsData } = useQuery(NewCoverLetterDialog_UsersJobsDocument, {
    variables: { archived: false },
  })
  const applications = applicationsData?.usersJobs ?? []

  const [createApplication] = useMutation(NewApplicationDialog_CreateUsersJobDocument, {
    variables: {
      companyName: form.getValues().company,
      jobDetails: form.getValues().jobDetails,
      position: form.getValues().position,
      status: form.getValues().status,
    },
  })

  const isCreateNewApplication = selectedApplicationId === 'create'
  const selectedApplicationCoverLetterId = applications.find(
    (app) => app.id === selectedApplicationId
  )?.coverLetter?.id

  const isContinueEnabled =
    (selectedResumeId !== '' && selectedApplicationId !== '') ||
    (isCreateNewApplication && formState.isValid && !formState.errors && formState.isDirty)

  const [coverLetterUpsert] = useMutation(NewCoverLetterDialog_CoverLetterUpsertDocument)

  const handleCreateCoverLetter = async ({ applicationId }: { applicationId: string }) => {
    try {
      const { data } = await coverLetterUpsert({
        refetchQueries: [CoverLettersList_CoverLettersDocument],
        variables: {
          attributes: {},
          usersJobId: applicationId,
        },
      })

      return data?.coverLetterUpsert?.id
    } catch (error) {
      errorToast({ description: 'There was an error creating the application.' })
    }
  }

  const handleCreationApplicationSubmit = async () => {
    setIsLoading(true)

    try {
      const { data } = await createApplication()

      const coverLetterId = await handleCreateCoverLetter({
        applicationId: data?.createUsersJob?.id ?? '',
      })

      if (coverLetterId) {
        setOpen(false)
        router.push(`/cover-letters/${coverLetterId}`)
      }
    } catch (error) {
      errorToast({ description: 'There was an error creating the application.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    if (selectedApplicationCoverLetterId) {
      router.push(`/cover-letters/${selectedApplicationCoverLetterId}`)
      return
    }

    const coverLetterId = await handleCreateCoverLetter({
      applicationId: selectedApplicationId,
    })

    if (coverLetterId) {
      setOpen(false)
      router.push(`/cover-letters/${coverLetterId}`)
    }

    setIsLoading(false)
  }

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogContent
        className="max-w-[700px]"
        disableOutsideClose={true}
        title="Create New Cover Letter"
        titleIcon={<PlusCircle />}
      >
        <div className={cn('flex min-h-[500px] flex-col gap-6')}>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span>Resume Source</span>
              <p className="text-muted-foreground">Choose which resume to use as the source.</p>
            </div>
            <Select onValueChange={setSelectedResumeId} value={selectedResumeId}>
              <SelectTrigger className="max-w-[40%] select-none rounded-lg border-none bg-stone-700">
                <SelectValue placeholder="Select a resume" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {resumes.map((resume) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span>Job Application Source</span>
              <p className="text-muted-foreground">
                Choose which job application to use as the source.
              </p>
            </div>
            <Select onValueChange={setSelectedApplicationId} value={selectedApplicationId}>
              <SelectTrigger className="max-w-[40%] select-none rounded-lg border-none bg-stone-700">
                <SelectValue placeholder="Select or create application" />
              </SelectTrigger>
              <SelectContent className="max-h-[450px] overflow-y-auto">
                <SelectItem value="create">
                  <IconText className="text-accent-foreground" leftIcon={<Plus />}>
                    Create new application
                  </IconText>
                </SelectItem>
                {applications.map((application) => (
                  <SelectItem key={application.id} value={application.id}>
                    <span className="text-accent-foreground">{application.position}</span>
                    <span className="mx-2">•</span>
                    <span className="text-muted-foreground">{application.companyName}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isCreateNewApplication && (
            <div className="flex flex-col gap-1">
              <span>New Job Application</span>
              <CondensedApplicationForm form={form} onSubmit={handleCreationApplicationSubmit} />
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {isCreateNewApplication ? (
            <Button
              disabled={!isContinueEnabled}
              form={CONDENSED_APPLICATION_FORM_ID}
              loading={isLoading}
              type="submit"
              variant="cta"
            >
              Create Cover letter
            </Button>
          ) : (
            <Button
              disabled={!isContinueEnabled}
              loading={isLoading}
              onClick={handleSubmit}
              variant="cta"
            >
              {selectedApplicationCoverLetterId ? 'Edit Cover Letter' : 'Create Cover Letter'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
