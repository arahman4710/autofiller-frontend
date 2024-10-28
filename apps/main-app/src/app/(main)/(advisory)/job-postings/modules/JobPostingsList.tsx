'use client'

import { useState } from 'react'

import { useMutation, useSuspenseQuery } from '@apollo/client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@rag/ui/AlertDialog'
import { Button } from '@rag/ui/Button'
import { DataTable } from '@rag/ui/DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@rag/ui/DropdownMenu'
import { IconText } from '@rag/ui/IconText'
import { formatMinMaxSalary } from '@rag/utils'
import { ArchiveBox, DotsThree, Share } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'

import {
  JobPostingsList_JobPostingsDocument,
  JobPostingsList_UpdateUsersJobArchivedDocument,
} from '@gql/graphql'

import { ShareJobPostingDialog } from '@/components/dialogs/ShareJobPostingDialog'

import { columns } from '../components/Columns'

export const JobPostingsList = () => {
  const [selectedJobPostingId, setSelectedJobPostingId] = useQueryState('selected')
  const [searchQueryParam, setSearchQueryParam] = useQueryState('search')
  const [pageQueryParam, setPageQueryParam] = useQueryState('page')
  const [viewQueryParam, setViewQueryParam] = useQueryState('view')
  const router = useRouter()
  const isArchivedView = viewQueryParam === 'archived'

  const [openShareJobPostingDialog, setOpenShareJobPostingDialog] = useState(false)
  const [multiselectJobPostingIds, setMultiselectJobPostingIds] = useState<string[]>([])

  const { data, refetch } = useSuspenseQuery(JobPostingsList_JobPostingsDocument, {
    variables: {
      archived: isArchivedView,
      page: parseInt(pageQueryParam || '1'),
      searchTerm: searchQueryParam,
    },
  })

  const usersJobs = data?.paginatedUsersJobs?.data ?? []
  const currentPage = data?.paginatedUsersJobs?.pagination?.page || 1
  const totalPages = data?.paginatedUsersJobs?.pagination?.totalPages || 1
  const usersJobsTableData = usersJobs.map((usersJob) => {
    const formattedSalary = formatMinMaxSalary(usersJob.salaryMin, usersJob.salaryMax)

    return {
      archived: usersJob.archived,
      clientsShared: usersJob.clientsShared,
      companyName: usersJob.companyName,
      createdAt: new Date(usersJob.createdAt).toLocaleString(),
      id: usersJob.id,
      isRemote: usersJob.isRemote,
      location: usersJob.location,
      numClientsApplied: usersJob.numClientsApplied,
      numClientsShared: usersJob.numClientsShared,
      payPeriod: usersJob.payPeriod,
      position: usersJob.position,
      salary: formattedSalary,
      url: usersJob.url,
    }
  })

  const [archiveJobPosting, { loading }] = useMutation(
    JobPostingsList_UpdateUsersJobArchivedDocument,
    {
      refetchQueries: [JobPostingsList_JobPostingsDocument],
    }
  )

  const handleArchiveJobPostings = async ({
    archive,
    jobPostingIds,
  }: {
    archive: boolean
    jobPostingIds: string[]
  }) => {
    Promise.all(
      jobPostingIds.map((jobPostingId) => {
        return archiveJobPosting({
          variables: {
            archived: archive,
            id: jobPostingId,
          },
        })
      })
    )
  }

  const handlePreviousPage = () => {
    router.push(`/job-postings?page=${currentPage - 1}`)
  }

  const handleNextPage = () => {
    router.push(`/job-postings?page=${currentPage + 1}`)
  }

  return (
    <>
      <DataTable
        columns={columns(refetch)}
        data={usersJobsTableData}
        emptyResultsText="No job postings found"
        meta={{
          archiveJobPostings: (archive, jobPostingIds) =>
            handleArchiveJobPostings({ archive, jobPostingIds }),
          setOpen: (id) => setSelectedJobPostingId(id),
          setOpenShareJobPostingDialog: (rows) => {
            setMultiselectJobPostingIds(rows.map((row) => row?.id ?? ''))
            setOpenShareJobPostingDialog(true)
          },
        }}
        onCellClick={({ cellId, columnId, rowId }) => {
          if (columnId !== 'location' && columnId !== 'actions') {
            setSelectedJobPostingId(rowId)
          }
        }}
        selectionActions={[
          {
            component: (
              <Button className="border-border-muted" size="sm" variant="outline">
                <IconText leftIcon={<Share className="h-4 w-4" />}>Share Jobs</IconText>
              </Button>
            ),
            enabled: !isArchivedView,
            handler: (rows) => {
              setMultiselectJobPostingIds(rows.map((row) => row?.id ?? ''))
              setOpenShareJobPostingDialog(true)
            },
          },
          {
            component: (
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="border-border-muted" size="sm" variant="ghost">
                      <DotsThree className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem>
                        <IconText leftIcon={<ArchiveBox className="h-4 w-4" />}>
                          {isArchivedView ? 'Restore Jobs' : 'Archive Jobs'}
                        </IconText>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone and will {isArchivedView ? 'restore' : 'archive'}
                      these job postings for all clients.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleArchiveJobPostings({
                          archive: !isArchivedView,
                          jobPostingIds: multiselectJobPostingIds,
                        })
                      }}
                      variant="destructive"
                    >
                      {isArchivedView ? 'Restore Jobs' : 'Archive Jobs'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ),
            handler: (rows, setSelectedRows) => {
              handleArchiveJobPostings({
                archive: !rows.every((row) => row?.archived),
                jobPostingIds: rows.map((row) => row?.id ?? ''),
              })
              setSelectedRows([])
            },
          },
        ]}
      />
      <div className="mr-4 mt-4 flex justify-end gap-2">
        {currentPage > 1 && (
          <Button onClick={handlePreviousPage} variant="secondary">
            Previous
          </Button>
        )}
        {currentPage < totalPages && (
          <Button onClick={handleNextPage} variant="cta">
            Next
          </Button>
        )}
      </div>
      <ShareJobPostingDialog
        open={openShareJobPostingDialog}
        setOpen={setOpenShareJobPostingDialog}
        usersJobIds={multiselectJobPostingIds}
      />
    </>
  )
}
