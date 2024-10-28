'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { DataTable, TColumnDef } from '@canyon/ui/DataTable'
import { EmptyState } from '@canyon/ui/EmptyState'
import { formatDate } from '@canyon/utils'
import { useQueryState } from 'nuqs'

import { ClientResumes_ClientDocument } from '@gql/graphql'

import { ClientResumeSheet } from '@/components/sheets/ClientResumeSheet'

interface IClientResumesProps {
  clientId: string
}

export const ClientResumes = ({ clientId }: IClientResumesProps) => {
  const [isClientResumeSheetOpen, setIsClientResumeSheetOpen] = useState(false)
  const [resumeId, setResumeId] = useQueryState('resumeId')

  const { data, loading } = useQuery(ClientResumes_ClientDocument, {
    variables: { clientId },
  })

  const client = data?.client
  const activeResumes = client?.activeResumes

  const handleResumeRowClick = (resumeId: string) => {
    setResumeId(resumeId)

    setIsClientResumeSheetOpen(true)
  }

  const handleClientResumeSheetOpenChange = (open: boolean) => {
    if (!open) {
      setResumeId(null)
    }

    setIsClientResumeSheetOpen(open)
  }

  useEffect(() => {
    if (resumeId) {
      setIsClientResumeSheetOpen(true)
    }
  }, [])

  if (!activeResumes?.length) {
    return <EmptyState description="No resumes found for this client" title="No resumes" />
  }

  return (
    <div>
      <DataTable
        columns={ResumesTableColumns}
        data={activeResumes}
        emptyResultsText="No resumes found for this client"
        isLoading={loading}
        onRowClick={handleResumeRowClick}
        variant="minimal"
      />
      <ClientResumeSheet
        clientId={clientId}
        onOpenChange={handleClientResumeSheetOpenChange}
        open={isClientResumeSheetOpen}
        resumeId={resumeId ?? ''}
      />
    </div>
  )
}

type TResume = {
  createdAt: string
  name: string
  updatedAt: string
}

const ResumesTableColumns: TColumnDef<TResume>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'updatedAt',
    cell: ({ row }) => formatDate(row.getValue('updatedAt')),
    header: 'Updated',
    meta: {
      isDate: true,
    },
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => row.getValue('createdAt'),
    header: 'Created',
    meta: {
      isDate: true,
    },
  },
]
