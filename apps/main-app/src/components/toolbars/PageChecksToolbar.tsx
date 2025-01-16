'use client'

import { useState } from 'react'

import { PlusCircle } from '@phosphor-icons/react'
import { Button } from '@autofiller/ui/Button'
import { Toolbar } from '@autofiller/ui/Toolbar'

import { NewPageCheckDialog } from '@/components/dialogs/NewPageCheckDialog'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const PageChecksToolbar = () => {
  const [openNewPageCheckDialog, setOpenNewPageCheckDialog] = useState(false)
  const upgradePlanDialog = useUpgradePlanDialog()
  const { business } = useCurrentUser()

  const handleDialogClick = () => {
    if (business?.reachedFreePlanPageCheckLimit) {
      upgradePlanDialog.setOpen(true)
    } else {
      setOpenNewPageCheckDialog(true)
    }
  }

  return (
    <Toolbar justify="end">
      <div className="flex flex-row items-center gap-4">
        <Button
          leftIcon={<PlusCircle size={16} weight="bold" />}
          onClick={handleDialogClick}
          size="sm"
          variant="cta"
        >
          New Page Check
        </Button>
        <NewPageCheckDialog open={openNewPageCheckDialog} setOpen={setOpenNewPageCheckDialog} />
      </div>
    </Toolbar>
  )
}
