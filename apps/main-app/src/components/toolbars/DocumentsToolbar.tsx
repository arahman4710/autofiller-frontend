'use client'

import { useState } from 'react'

import { GoogleDriveLogo, PlusCircle } from '@phosphor-icons/react'
import { Button } from '@autofiller/ui/Button'
import { Toolbar } from '@autofiller/ui/Toolbar'
import { useGoogleLogin } from '@react-oauth/google';

import { UploadDocumentDialog } from '@/components/dialogs/UploadDocumentDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'


export const DocumentsToolbar = () => {
  const [uploadDocumentDialogOpen, setuploadDocumentDialogOpen] = useState<boolean>(false)
  const { user } = useCurrentUser()

  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: "https://api.skugrep.xyz/drive/callback",
    state: `${user?.id}`,
    ux_mode: "redirect",
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
