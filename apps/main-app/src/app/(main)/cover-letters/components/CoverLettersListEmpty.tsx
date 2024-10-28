'use client'
import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import { ArrowCircleRight } from '@phosphor-icons/react'

import { NewCoverLetterDialog } from '@/components/dialogs/NewCoverLetterDialog'

export const CoverLettersListEmpty = () => {
  const [newCoverLetterDialogOpen, setNewCoverLetterDialogOpen] = useState<boolean>(false)

  return (
    <div className="flex justify-center py-[100px]">
      <div className="border-border-secondary bg-background-secondary flex w-[420px] flex-col justify-center gap-4 rounded-lg border p-8 pb-12 pt-8">
        <h2 className="text-accent-foreground text-lg font-semibold">
          Create your first cover letter
        </h2>
        <p className="text-muted-foreground">
          Cover letters are a good way of introducing yourself to a potential employer. Use them to
          explain your interest in the company and the position, and to highlight your most relevant
          skills and experiences.
        </p>
        <Button
          className="w-fit"
          onClick={() => setNewCoverLetterDialogOpen(true)}
          rightIcon={<ArrowCircleRight size={16} weight="fill" />}
          variant="cta"
        >
          Create Cover Letter
        </Button>
        <NewCoverLetterDialog
          open={newCoverLetterDialogOpen}
          setOpen={setNewCoverLetterDialogOpen}
        />
      </div>
    </div>
  )
}
