'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import { Toolbar } from '@rag/ui/Toolbar'
import { GoogleDriveLogo, PlusCircle } from '@phosphor-icons/react'

import { UploadDocumentDialog } from '@/components/dialogs/UploadDocumentDialog'
import { useGoogleLogin } from '@react-oauth/google';
import { useCurrentUser } from '@/hooks/useCurrentUser'



export const DocumentsToolbar = () => {
  const [uploadDocumentDialogOpen, setuploadDocumentDialogOpen] = useState<boolean>(false)
  const { user } = useCurrentUser()

  const login = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: "redirect",
    state: `${user?.id}`,
    redirect_uri: "https://api.skugrep.xyz/drive/callback",
  });

  return (
    <Toolbar justify="end">
      <div className="flex flex-row items-center gap-2">
        <Button
          leftIcon={<GoogleDriveLogo size={16} weight="bold" />}
          onClick={_ => login()}
          size="sm"
          variant="outline"
          >
            Connect Google Drive
        </Button>
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
