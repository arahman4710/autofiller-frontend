'use client'

import { useCallback, useState } from 'react'

import { Button } from '@rag/ui/Button'
import { Toolbar } from '@rag/ui/Toolbar'
import { PlusCircle } from '@phosphor-icons/react'

import { UploadDocumentDialog } from '@/components/dialogs/UploadDocumentDialog'

export const DocumentsToolbar = () => {
  const [uploadDocumentDialogOpen, setuploadDocumentDialogOpen] = useState<boolean>(false)

  return (
    <Toolbar justify="end">
      <div className="flex flex-row items-center gap-2">
        <Button
        leftIcon={<PlusCircle size={16} weight="bold" />}
        onClick={() => setuploadDocumentDialogOpen(true)}
        size="sm"
        variant="cta"
        >
          Upload document
        </Button>
        <UploadDocumentDialog open={uploadDocumentDialogOpen} setOpen={setuploadDocumentDialogOpen} />
      </div>
    </Toolbar>
  )
}
