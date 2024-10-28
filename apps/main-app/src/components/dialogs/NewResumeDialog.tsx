'use client'

import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@canyon/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@canyon/ui/Dialog'
import { Dropzone } from '@canyon/ui/Dropzone'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@canyon/ui/Form'
import { Input } from '@canyon/ui/Input'
import { useToast } from '@canyon/ui/useToast'
import { PlusCircle } from '@phosphor-icons/react'

import { NewResumeDialog_ResumesDocument, ResumesList_ResumesDocument } from '@gql/graphql'

import { useNewResumeForm } from '@/forms/hooks/useNewResumeForm'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCreateResume } from '@/hooks/useCreateResume'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useUploadResume } from '@/hooks/useUploadResume'
import { generateResumeTitle } from '@/utils/generateResumeTitle'
import { uploadFile } from '@/utils/uploadFile'

interface INewResumeDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const MAX_RESUMES = 3

export const NewResumeDialog = ({ open, setOpen }: INewResumeDialogProps) => {
  const { errorToast, successToast } = useToast()
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false)
  const [fileSignedId, setFileSignedId] = useState<null | string>(null)
  const [fileName, setFileName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const upgradePlanDialog = useUpgradePlanDialog()

  const { isPaidPlan, user } = useCurrentUser()
  const { createResume } = useCreateResume({ redirectToResume: true })
  const { uploadResume } = useUploadResume({ redirectToResume: true })
  const { data } = useQuery(NewResumeDialog_ResumesDocument)
  const [getResumes, _] = useLazyQuery(ResumesList_ResumesDocument, {
    fetchPolicy: 'network-only',
    variables: {
      archived: false,
    },
  })

  const resumes = data?.resumes ?? []

  const { form, resetForm } = useNewResumeForm()

  useEffect(() => {
    if (!open) {
      resetForm()
      setFileSignedId(null)
      setIsLoading(false)
    }
  }, [open])

  const handleUploadResume = async (files: File[]) => {
    setIsFileUploading(true)

    const file = files[0]

    await uploadFile({
      file,
      onComplete: (response) => {
        setFileSignedId(response.signed_id)
        setFileName(response.filename)
        setIsFileUploading(false)
      },
      onError: () => {
        errorToast({ description: 'There was an error uploading your document.' })
        setIsFileUploading(false)
      },
    })
  }

  const handleOnSubmit = async () => {
    setIsLoading(true)

    const formValues = form.getValues()
    const title =
      formValues.title ||
      generateResumeTitle({ existingResumes: resumes, uploadedResumeFileName: fileName })

    try {
      if (resumes?.length && resumes.length >= MAX_RESUMES && !isPaidPlan) {
        setIsLoading(false)
        upgradePlanDialog.setOpen(true)
        return
      }
      if (fileSignedId) {
        if (user?.numUploadedResumes && user.numUploadedResumes >= MAX_RESUMES && !isPaidPlan) {
          setIsLoading(false)
          upgradePlanDialog.setOpen(true)
          return
        }
        await uploadResume({
          variables: {
            name: title,
            uploadSignedId: fileSignedId,
          },
        })
      } else {
        await createResume({
          variables: {
            name: title,
          },
        })
      }
      successToast({ description: 'Your resume has been created.' })
      setOpen(false)
    } catch (error) {
      errorToast({ description: 'There was an error creating your resume.' })
    }
    setIsLoading(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="max-w-2xl"
        onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : null)}
        title="Create New Resume"
        titleIcon={<PlusCircle />}
      >
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <div className="flex flex-col gap-5">
              <Dropzone
                loading={isFileUploading || isLoading}
                onDropAccepted={handleUploadResume}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild disabled={isLoading}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button loading={isLoading} type="submit" variant="cta">
                Create resume
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
