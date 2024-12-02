'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import { Toolbar } from '@rag/ui/Toolbar'
import { PlusCircle } from '@phosphor-icons/react'

import { NewPageCheckDialog } from '@/components/dialogs/NewPageCheckDialog'

export const PageChecksToolbar = () => {
  const [openNewPageCheckDialog, setOpenNewPageCheckDialog] = useState(false)

  return (
    <Toolbar justify="end">
      <div className="flex flex-row items-center gap-4">
        <Button
          leftIcon={<PlusCircle size={16} weight="bold" />}
          onClick={() => setOpenNewPageCheckDialog(true)}
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
