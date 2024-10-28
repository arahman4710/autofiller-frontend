'use client'

import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Input } from '@rag/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Toolbar } from '@rag/ui/Toolbar'
import { Export, MagnifyingGlass, PlusCircle } from '@phosphor-icons/react'
import debounce from 'debounce'
import { useQueryState } from 'nuqs'

import { JobPostingsToolbar_ExportCsvDocument } from '@gql/graphql'

import { NewApplicationDialog } from '@/components/dialogs/NewApplicationDialog'

export const JobPostingsToolbar = () => {
  const [selectedJobPosting, setSelectedJobPosting] = useQueryState('selected')
  const [searchQuery, setSearchQuery] = useQueryState('search')
  const [archivedView, setArchivedView] = useQueryState('view')

  const [openNewApplicationDialog, setOpenNewApplicationDialog] = useState<boolean>(false)

  useEffect(() => {
    if (selectedJobPosting) {
      setOpenNewApplicationDialog(true)
    }
  }, [selectedJobPosting])

  const handleOpenNewApplicationDialog = (open: boolean) => {
    if (!open) {
      setSelectedJobPosting(null)
    }

    setOpenNewApplicationDialog(open)
  }

  const [exportCsv, { loading }] = useMutation(JobPostingsToolbar_ExportCsvDocument)

  const handleExportCsv = async () => {
    const csvUrlData = await exportCsv()
    if (csvUrlData?.data) {
      window.open(csvUrlData?.data?.exportUsersJobToCsv)
    }
  }

  return (
    <Toolbar justify="between">
      <div className="flex items-center gap-4">
        <div className="flex w-[220px] py-4">
          <Input
            className="max-w-sm"
            defaultValue={searchQuery ?? ''}
            onChange={(e) => {
              debounce(() => {
                setSearchQuery(e.target.value)
              }, 500)()
            }}
            placeholder="Search"
            startSlot={<MagnifyingGlass className="text-muted-foreground" />}
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={(view) => setArchivedView(view)}
          value={archivedView ?? ''}
        >
          <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
            <SelectValue placeholder="Active Job Postings"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Active Job Postings</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button
          leftIcon={<Export size={16} />}
          loading={loading}
          onClick={handleExportCsv}
          size="sm"
          variant="secondary"
        >
          Export to CSV
        </Button>
        <Button
          leftIcon={<PlusCircle size={16} />}
          onClick={() => setOpenNewApplicationDialog(true)}
          size="sm"
          variant="cta"
        >
          Add Job Posting
        </Button>
      </div>
      <NewApplicationDialog
        editableApplicationId={selectedJobPosting ?? ''}
        jobPostingForClient={true}
        open={openNewApplicationDialog}
        setOpen={handleOpenNewApplicationDialog}
      />
    </Toolbar>
  )
}
