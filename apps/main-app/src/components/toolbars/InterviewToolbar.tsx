'use client'

import { useState } from 'react'

import { Button } from '@rag/ui/Button'
import { Toolbar } from '@rag/ui/Toolbar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { PlusCircle, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

import { NewInterviewDialog } from '@/components/dialogs/NewInterviewDialog'
import { useInterviewStore } from '@/store/interviewStore'

export const InterviewToolbar = () => {
  const enableVoice = useInterviewStore((state) => state.enableVoice)
  const setEnableVoice = useInterviewStore((state) => state.setEnableVoice)

  const [openNewInterviewDialog, setOpenNewInterviewDialog] = useState(false)

  return (
    <Toolbar justify="end">
      <div className="flex flex-row items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={() => setEnableVoice(!enableVoice)} variant="ghost">
              {enableVoice ? <SpeakerHigh size={18} /> : <SpeakerSlash size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{enableVoice ? 'Disable voice' : 'Enable voice'}</TooltipContent>
        </Tooltip>

        <Button
          leftIcon={<PlusCircle size={16} weight="bold" />}
          onClick={() => setOpenNewInterviewDialog(true)}
          size="sm"
          variant="cta"
        >
          New Mock Interview
        </Button>
        <NewInterviewDialog open={openNewInterviewDialog} setOpen={setOpenNewInterviewDialog} />
      </div>
    </Toolbar>
  )
}
