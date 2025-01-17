'use client'

import { useEffect, useRef, useState } from 'react'

import { useLazyQuery, useMutation } from '@apollo/client'
import { Button } from '@autofiller/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@autofiller/ui/Dialog'
import { Dropzone } from '@autofiller/ui/Dropzone'
import { useToast } from '@autofiller/ui/useToast'
import { PlusCircle } from '@phosphor-icons/react'

import { DocumentsList_AllDocumentsDocument, UploadDocumentDocument } from '@gql/graphql'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { uploadFile } from '@/utils/uploadFile'

interface IUploadDocumentDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

interface IFile {
  filename: string
  signed_id: string
}

export const UploadDocumentDialog = ({ open, setOpen }: IUploadDocumentDialogProps) => {
  const { errorToast, successToast } = useToast()
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false)
  // const [fileSignedId, setFileSignedId] = useState<null | string>(null)
  // const [fileName, setFileName] = useState<string>('')
  const filesRef = useRef<IFile[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { isPaidPlan, user } = useCurrentUser()
  const [uploadDocument, { loading }] = useMutation(UploadDocumentDocument, {
    refetchQueries: [DocumentsList_AllDocumentsDocument],
  })

  useEffect(() => {
    if (!open) {
      filesRef.current = []
      setIsLoading(false)
    }
  }, [open])

  const handleUploadResume = async (files: File[]) => {
    setIsFileUploading(true)

    files.forEach(async (file) => {
      await uploadFile({
        file,
        onComplete: (response) => {
          filesRef.current.push({ filename: response.filename, signed_id: response.signed_id })
        },
        onError: () => {
          errorToast({ description: 'There was an error uploading your document.' })
          setIsFileUploading(false)
        },
      })
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      if (filesRef.current.length > 0) {
        filesRef.current.forEach(async (file) => {
          await uploadDocument({
            variables: {
              name: file.filename,
              uploadSignedId: file.signed_id,
            },
          })
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
        <Dropzone loading={false} multiple onDropAccepted={handleUploadResume} />
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
