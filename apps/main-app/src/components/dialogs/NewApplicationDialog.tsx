'use client'

import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@rag/ui/Dialog'
import { useToast } from '@rag/ui/useToast'
import { PencilCircle, PlusCircle } from '@phosphor-icons/react'

import {
  Applications_UsersJobsDocument,
  JobPostingsList_JobPostingsDocument,
  NewApplicationDialog_CreateUsersJobDocument,
  NewApplicationDialog_ResumesDocument,
  NewApplicationsDialog_UpdateUsersJobDocument,
  NewApplicationsDialog_UsersJobsDocument,
  UsersJobsStatusEnum,
} from '@gql/graphql'

import { DestroyAlertDialog } from '@/components/dialogs/DestroyAlertDialog'
import { APPLICATION_FORM_ID, ApplicationForm } from '@/forms/ApplicationForm'
import { useApplicationForm } from '@/forms/hooks/useApplicationForm'
import { useApplicationFormReset } from '@/forms/hooks/useApplicationFormReset'

interface INewApplicationDialogProps {
  children?: React.ReactNode
  editableApplicationId?: string
  isEditMode?: boolean
  jobPostingForClient?: boolean
  open: boolean
  preselectedStatus?: UsersJobsStatusEnum
  setOpen: (open: boolean) => void
}

export const NewApplicationDialog = ({
  children,
  editableApplicationId,
  jobPostingForClient = false,
  open,
  preselectedStatus,
  setOpen,
}: INewApplicationDialogProps) => {
  const { errorToast, successToast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [showDestroyAlertDialog, setShowDestroyAlertDialog] = useState(false)
  const { data: resumesData } = useQuery(NewApplicationDialog_ResumesDocument)
  const resumes = resumesData?.resumes ?? []

  const {
    form,
    helpers: { sanitizedSalary },
    onChangeHandlers: { salaryOnChange },
    onKeyDownHandlers: { salaryOnKeyDown },
    resetForm,
  } = useApplicationForm()

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  useEffect(() => {
    if (preselectedStatus) {
      form.reset({ status: preselectedStatus })
    }
  }, [preselectedStatus])

  const { data: usersJobsData } = useQuery(NewApplicationsDialog_UsersJobsDocument, {
    skip: !editableApplicationId,
    variables: {
      id: editableApplicationId ?? '',
    },
  })

  const application = usersJobsData?.usersJobs[0]

  useApplicationFormReset({
    application,
    form,
  })

  const payload = {
    applicationInstructions: form.getValues().applicationInstructions,
    companyName: form.getValues().company,
    interviewStep:
      form.getValues().status === UsersJobsStatusEnum.Interview
        ? form.getValues().interviewStep
        : null,
    isRemote: form.getValues().isRemote,
    jobDetails: form.getValues().jobDetails,
    location: form.getValues().location,
    notes: form.getValues().notes,
    payPeriod: form.getValues().payPeriod,
    position: form.getValues().position,
    rejectedStage:
      form.getValues().status === UsersJobsStatusEnum.Rejected
        ? form.getValues().rejectedStage
        : null,
    resumeId: form.getValues().resumeId,
    salaryMax: sanitizedSalary()['max'],
    salaryMin: sanitizedSalary()['min'],
    status: form.getValues().status,
    url: form.getValues().url,
  }

  const [updateJobApplication] = useMutation(NewApplicationsDialog_UpdateUsersJobDocument, {
    refetchQueries: [JobPostingsList_JobPostingsDocument, NewApplicationsDialog_UsersJobsDocument],
    variables: {
      id: editableApplicationId ?? '',
      ...payload,
    },
  })

  const [createJobApplication] = useMutation(NewApplicationDialog_CreateUsersJobDocument, {
    refetchQueries: [Applications_UsersJobsDocument, JobPostingsList_JobPostingsDocument],
    variables: payload,
  })

  const handleCreateJobApplication = async () => {
    let successToastTitle = 'New job application created 🎉'

    if (jobPostingForClient) {
      successToastTitle = 'New job posting created 🎉'
    }

    try {
      const { data } = await createJobApplication()

      if (data?.createUsersJob) {
        setOpen(false)

        successToast({
          title: successToastTitle,
        })
      }
    } catch (e) {
      console.error(e)

      errorToast()
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditJobApplication = async () => {
    let successToastTitle = 'Job application updated'

    if (jobPostingForClient) {
      successToastTitle = 'Job posting updated'
    }

    try {
      const { data } = await updateJobApplication()

      if (data?.updateUsersJob) {
        setOpen(false)

        successToast({
          title: successToastTitle,
        })
      }
    } catch (e) {
      console.error(e)

      errorToast()
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)

    if (editableApplicationId) {
      await handleEditJobApplication()
    } else {
      await handleCreateJobApplication()
    }
  }

  const handleOpenChange = (state: boolean) => {
    if (!state && form.formState.isDirty) {
      return setShowDestroyAlertDialog(true)
    }

    return setOpen(state)
  }

  let title = 'Create New Job Application'
  let buttonText = 'Create Job Application'
  let discardText = 'Discard application?'

  if (jobPostingForClient) {
    title = 'Create New Job Posting'
    buttonText = 'Create Job Posting'
    discardText = 'Discard job posting?'
  }

  if (editableApplicationId) {
    title = 'Edit Job Application'
    buttonText = 'Update Job Application'
  }

  if (jobPostingForClient && editableApplicationId) {
    title = 'Edit Job Posting'
    buttonText = 'Update Job Posting'
  }

  const titleIcon = editableApplicationId ? <PencilCircle /> : <PlusCircle />
  const formIsValid = form.formState.isValid

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="max-h-[800px] max-w-[798px]"
        disableOutsideClose={!editableApplicationId}
        title={title}
        titleIcon={titleIcon}
      >
        <div className="h-[550px] overflow-y-scroll px-6">
          <ApplicationForm
            form={form}
            isUpdating={!!editableApplicationId}
            jobPostingForClient={jobPostingForClient}
            onSubmit={handleOnSubmit}
            resumes={resumes}
            salaryOnChange={salaryOnChange}
            salaryOnKeyDown={salaryOnKeyDown}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!formIsValid}
            form={APPLICATION_FORM_ID}
            loading={isLoading}
            type="submit"
            variant="cta"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
      <DestroyAlertDialog
        confirmText="Discard"
        onConfirm={() => setOpen(false)}
        onOpenChange={setShowDestroyAlertDialog}
        open={showDestroyAlertDialog}
        title={discardText}
      />
    </Dialog>
  )
}
