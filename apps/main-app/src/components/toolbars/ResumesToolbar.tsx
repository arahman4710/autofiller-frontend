'use client'

import { useCallback, useState } from 'react'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Toolbar } from '@rag/ui/Toolbar'
import { PlusCircle } from '@phosphor-icons/react'

import { ResumesToolbar_ResumesDocument } from '@gql/graphql'

import { ImportResumeFromLinkedinDialog } from '@/components/dialogs/ImportResumeFromLinkedinDialog'
import { NewResumeDialog } from '@/components/dialogs/NewResumeDialog'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

export const ResumesToolbar = () => {
  const [newResumeDialogOpen, setNewResumeDialogOpen] = useState<boolean>(false)

  const { queryParams, setQueryParams } = useQueryParams<{
    view?: TViewQueryParam
  }>()
  const viewQueryParam = queryParams?.get('view') ?? ''
  const isArchivedView = viewQueryParam === 'archived'

  const { data, loading } = useQuery(ResumesToolbar_ResumesDocument, {
    variables: {
      archived: isArchivedView,
    },
  })
  const resumes = data?.resumes ?? []

  const onViewSelect = useCallback(
    (view: TViewQueryParam) => {
      setQueryParams({ view })
    },
    [setQueryParams]
  )

  return (
    <Toolbar>
      <div>
        <Select defaultValue="all" onValueChange={onViewSelect} value={viewQueryParam}>
          {!loading && (
            <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
              <SelectValue placeholder="Active Resumes"></SelectValue>
            </SelectTrigger>
          )}
          <SelectContent>
            <SelectItem value="all">Active Resumes</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {resumes.length > 0 ? (
        <div className="flex flex-row items-center gap-2">
          <Button
            dropdownMenu={<ImportResumeFromLinkedinDialog />}
            leftIcon={<PlusCircle size={16} weight="bold" />}
            onClick={() => setNewResumeDialogOpen(true)}
            size="sm"
            variant="cta"
          >
            Create Resume
          </Button>
          <NewResumeDialog open={newResumeDialogOpen} setOpen={setNewResumeDialogOpen} />
        </div>
      ) : null}
    </Toolbar>
  )
}
