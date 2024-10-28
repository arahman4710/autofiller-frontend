'use client'
import { useState } from 'react'

import { Button } from '@canyon/ui/Button'
import { ArrowCircleRight } from '@phosphor-icons/react'

import { ImportResumeFromLinkedinDialog } from '@/components/dialogs/ImportResumeFromLinkedinDialog'
import { NewResumeDialog } from '@/components/dialogs/NewResumeDialog'
import { TailorResumeDialog } from '@/components/dialogs/TailorResumeDialog'

interface IListEmptyProps {
  isOptimizeResume?: boolean
}

export const ListEmpty = ({ isOptimizeResume }: IListEmptyProps) => {
  const [optimizeResumeDialogOpen, setOptimizeResumeDialogOpen] = useState<boolean>(false)
  const [newResumeDialogOpen, setNewResumeDialogOpen] = useState<boolean>(false)

  const title = isOptimizeResume ? 'Optimize your resume' : 'Create your first resume'
  const description = isOptimizeResume
    ? 'Optimizing your resume to a job is the best way to stand out to employers. Start by creating or selecting a base resume and a job to tailor your resume to.'
    : 'Resumes will be the foundational piece for everything you do in Canyon. Upload an existing resume or create one from scratch to get started.'

  return (
    <div className="flex justify-center py-[100px]">
      <div className="border-border-secondary bg-background-secondary flex w-[420px] flex-col justify-center gap-4 rounded-lg border p-8 pb-12 pt-8">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        {isOptimizeResume ? (
          <Button
            className="w-fit"
            onClick={() => setOptimizeResumeDialogOpen(true)}
            rightIcon={<ArrowCircleRight size={16} weight="fill" />}
            variant="cta"
          >
            Optimize a Resume
          </Button>
        ) : (
          <Button
            className="w-fit"
            dropdownMenu={<ImportResumeFromLinkedinDialog />}
            onClick={() => setNewResumeDialogOpen(true)}
            rightIcon={<ArrowCircleRight size={16} weight="fill" />}
            variant="cta"
          >
            Resume Builder
          </Button>
        )}
        <NewResumeDialog open={newResumeDialogOpen} setOpen={setNewResumeDialogOpen} />
        <TailorResumeDialog
          open={optimizeResumeDialogOpen}
          setOpen={setOptimizeResumeDialogOpen}
          showResumeSelection={isOptimizeResume}
        />
      </div>
    </div>
  )
}
