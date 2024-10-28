'use client'

import { useEffect } from 'react'

import { useSuspenseQuery } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { DataTable } from '@canyon/ui/DataTable'
import { useRouter } from 'next/navigation'

import { ClientsList_ClientsDocument } from '@gql/graphql'

import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { columns } from '../components/Columns'

export const ClientsList = () => {
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const router = useRouter()
  const pageQueryParam = queryParams?.get('page') || ''
  const searchQueryParam = queryParams?.get('search') ?? ''
  const startDateQueryParam = queryParams?.get('startDate')
  const endDateQueryParam = queryParams?.get('endDate') ?? ''
  const advisorIdQueryParam = queryParams?.get('advisorId') || ''
  let startDate: Date | undefined = undefined
  if (startDateQueryParam) {
    startDate = new Date(startDateQueryParam)
  }
  let endDate: Date | undefined = undefined
  if (endDateQueryParam) {
    endDate = new Date(endDateQueryParam)
  }

  const { data: searchTermData, refetch } = useSuspenseQuery(ClientsList_ClientsDocument, {
    variables: {
      advisorIds: advisorIdQueryParam ? [advisorIdQueryParam] : [],
      fromDate: startDate,
      page: parseInt(pageQueryParam),
      searchTerm: searchQueryParam,
      toDate: endDate,
    },
  })

  useEffect(() => {
    refetch()
  }, [startDate, endDate])

  const clients = searchTermData?.clients?.data ?? []
  const currentPage = searchTermData?.clients?.pagination?.page || 1
  const totalPages = searchTermData?.clients?.pagination?.totalPages || 1
  const clientsTableData = clients.map((client) => {
    return {
      advisorName: `${client.user.advisor?.firstName} ${client.user.advisor?.lastName}`,
      allJobs: client.numAllJobs,
      appliedJobs: client.numAppliedJobs,
      id: client.id,
      interviewedJobs: client.numInterviewedJobs,
      lastActiveAt: new Date(client.user.lastActiveAt).toLocaleString() || '',
      name: `${client.user.firstName} ${client.user.lastName}`,
      offeredJobs: client.numOfferedJobs,
      rejectedJobs: client.numRejectedJobs,
    }
  })

  const handlePreviousPage = () => {
    router.push(`/clients?page=${currentPage - 1}`)
  }

  const handleNextPage = () => {
    router.push(`/clients?page=${currentPage + 1}`)
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={clientsTableData}
        emptyResultsText="No clients found"
        enableFooter={true}
        onRowClick={(id) => router.push(`/clients/${id}`)}
      />
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
    </>
  )
}
