'use client'

import { useEffect, useState } from 'react'

import { useLazyQuery, useMutation } from '@apollo/client'
import { PlusCircle } from '@phosphor-icons/react'
import { Button } from '@autofiller/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@autofiller/ui/Dialog'
import { Dropzone } from '@autofiller/ui/Dropzone'
import { useToast } from '@autofiller/ui/useToast'

import { DocumentsList_AllDocumentsDocument, UploadDocumentDocument, } from '@gql/graphql'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { uploadFile } from '@/utils/uploadFile'

interface IUploadDocumentDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}


export const UploadDocumentDialog = ({ open, setOpen }: IUploadDocumentDialogProps) => {
  const { errorToast, successToast } = useToast()
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false)
  const [fileSignedId, setFileSignedId] = useState<null | string>(null)
  const [fileName, setFileName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const { isPaidPlan, user } = useCurrentUser()
  const [uploadDocument, { loading }] = useMutation(UploadDocumentDocument, {
    refetchQueries: [DocumentsList_AllDocumentsDocument],
  })

  useEffect(() => {
    if (!open) {
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

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      if (fileSignedId) {
        await uploadDocument({
            variables: {
            name: fileName,
            uploadSignedId: fileSignedId,
            }
        })
      } 
      successToast({ description: 'Your document has been uploaded.' })
      setOpen(false)
    } catch (error) {
      errorToast({ description: 'There was an error uploading your document.' })
    }
    setIsLoading(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="max-w-2xl"
        onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : null)}
        title="Upload new document"
        titleIcon={<PlusCircle />}
      >
      <Dropzone
        loading={false}
        onDropAccepted={handleUploadResume}
      />
      <Button
        className="mt-4"
        fullWidth={true}
        loading={loading}
        onClick={handleSubmit}
        size="lg"
        type="submit"
        variant="cta"
      >
        Upload File
      </Button>
      </DialogContent>
    </Dialog>
  )
}
