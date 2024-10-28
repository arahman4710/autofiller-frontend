'use client'

import { useState } from 'react'

import { Button } from '@canyon/ui/Button'
import { ArrowCircleRight } from '@phosphor-icons/react'

import { NewInterviewDialog } from '@/components/dialogs/NewInterviewDialog'

export const InterviewsEmpty = () => {
  const [openNewInterviewDialog, setOpenNewInterviewDialog] = useState(false)

  return (
    <div className="flex justify-center py-[100px]">
      <div className="border-border-secondary bg-background-secondary flex w-[420px] flex-col justify-center gap-4 rounded-lg border p-8 pb-12 pt-8">
        <h2 className="text-lg font-semibold">Start a mock interview</h2>
        <p className="text-muted-foreground">
          Practice makes perfect. Start a behavioral or technical mock interview to help prepare you
          for your next interview.
        </p>
        <Button
          className="w-fit"
          onClick={() => setOpenNewInterviewDialog(true)}
          rightIcon={<ArrowCircleRight size={16} weight="fill" />}
          variant="cta"
        >
          Start New Mock Interview
        </Button>
        <NewInterviewDialog open={openNewInterviewDialog} setOpen={setOpenNewInterviewDialog} />
      </div>
    </div>
  )
}
