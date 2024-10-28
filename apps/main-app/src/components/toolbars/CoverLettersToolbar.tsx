'use client'

import { useCallback, useState } from 'react'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Toolbar } from '@rag/ui/Toolbar'
import { PlusCircle } from '@phosphor-icons/react'

import { CoverLettersToolbar_CoverLettersDocument } from '@gql/graphql'

import { NewCoverLetterDialog } from '@/components/dialogs/NewCoverLetterDialog'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

export const CoverLettersToolbar = () => {
  const [newCoverLetterDialogOpen, setNewCoverLetterDialogOpen] = useState<boolean>(false)

  const { queryParams, setQueryParams } = useQueryParams<{
    view?: TViewQueryParam
  }>()
  const viewQueryParam = queryParams?.get('view') ?? ''

  const { data, loading } = useQuery(CoverLettersToolbar_CoverLettersDocument)

  const coverLetters = data?.coverLetters ?? []

  const onViewSelect = useCallback(
    (view: TViewQueryParam) => {
      setQueryParams({ view })
    },
    [setQueryParams]
  )

  const handleNewCoverLetterClick = () => {
    setNewCoverLetterDialogOpen(true)
  }

  return (
    <Toolbar>
      <div>
        <Select defaultValue="all" onValueChange={onViewSelect} value={viewQueryParam}>
          {!loading && (
            <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
              <SelectValue placeholder="Active Cover Letters"></SelectValue>
            </SelectTrigger>
          )}
          <SelectContent>
            <SelectItem value="all">Active Cover Letters</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {coverLetters.length > 0 ? (
        <div>
          <Button
            leftIcon={<PlusCircle size={16} weight="bold" />}
            onClick={handleNewCoverLetterClick}
            variant="cta"
          >
            New Cover Letter
          </Button>
        </div>
      ) : null}
      <NewCoverLetterDialog open={newCoverLetterDialogOpen} setOpen={setNewCoverLetterDialogOpen} />
    </Toolbar>
  )
}
