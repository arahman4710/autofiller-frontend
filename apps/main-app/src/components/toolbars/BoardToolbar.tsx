'use client'

import { useCallback, useState } from 'react'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Toolbar } from '@rag/ui/Toolbar'
import { PlusCircle } from '@phosphor-icons/react'

import { BoardToolbar_UsersJobsDocument } from '@gql/graphql'

import { NewApplicationDialog } from '@/components/dialogs/NewApplicationDialog'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

export const BoardToolbar = () => {
  const { queryParams, setQueryParams } = useQueryParams<{
    view?: TViewQueryParam
  }>()

  const [openNewApplicationDialog, setOpenNewApplicationDialog] = useState<boolean>(false)

  const viewQueryParam = queryParams?.get('view') ?? ''

  const onViewSelect = useCallback(
    (view: TViewQueryParam) => {
      setQueryParams({ view })
    },
    [setQueryParams]
  )

  const { data } = useQuery(BoardToolbar_UsersJobsDocument)
  const usersJobs = data?.usersJobs ?? []

  return (
    <Toolbar>
      <div className="flex flex-row items-center space-x-4">
        <Select defaultValue="all" onValueChange={onViewSelect} value={viewQueryParam}>
          <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
            <SelectValue placeholder="Active Applications" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Active Applications</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {usersJobs.length > 0 && (
        <Button
          leftIcon={<PlusCircle size={16} />}
          onClick={() => setOpenNewApplicationDialog(true)}
          size="sm"
          variant="cta"
        >
          Add Job Application
        </Button>
      )}
      <NewApplicationDialog open={openNewApplicationDialog} setOpen={setOpenNewApplicationDialog} />
    </Toolbar>
  )
}
