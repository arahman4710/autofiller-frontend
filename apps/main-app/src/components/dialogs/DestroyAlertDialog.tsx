import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@rag/ui/AlertDialog'

interface IDestroyAlertDialogProps {
  confirmText?: string
  description?: string
  onConfirm: () => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  renderTrigger?: React.ReactNode
  title?: string
}

export const DestroyAlertDialog = ({
  confirmText,
  description,
  onConfirm,
  onOpenChange: onExternalOpenChange,
  open: externalOpen,
  renderTrigger,
  title,
}: IDestroyAlertDialogProps) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false)

  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = onExternalOpenChange || setInternalOpen

  useEffect(() => {
    if (externalOpen !== undefined) {
      setInternalOpen(externalOpen)
    }
  }, [externalOpen])

  return (
    <>
      <AlertDialog onOpenChange={setOpen} open={open}>
        {renderTrigger && <AlertDialogTrigger asChild>{renderTrigger}</AlertDialogTrigger>}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title ?? 'Delete item'}</AlertDialogTitle>
            <AlertDialogDescription>
              {description ?? 'Are you sure? This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onConfirm()
                setOpen(false)
              }}
              variant="destructive"
            >
              {confirmText ?? 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
