'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { DataTable } from '@rag/ui/DataTable'
import { useRouter } from 'next/navigation'

import { AdvisorsList_AdvisorsDocument, UsersRoleEnum } from '@gql/graphql'

import { AdvisorSheet } from '@/components/sheets/AdvisorSheet'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { columns } from '../components/Columns'

const ROLE_TO_LABEL = {
  [UsersRoleEnum.AccountManager]: 'Account Manager',
  [UsersRoleEnum.Admin]: 'Admin',
  [UsersRoleEnum.Advisor]: 'Advisor',
}

const ROLE_QUERY_PARAM_TO_ROLE = {
  accountManager: UsersRoleEnum.AccountManager,
  advisor: UsersRoleEnum.Advisor,
}

export const AdvisorsList = () => {
  const [isAdvisorDialogOpen, setIsAdvisorDialogOpen] = useState(false)
  const router = useRouter()

  const { queryParams, setQueryParams } = useQueryParams<{
    selected?: string
    view?: TViewQueryParam
  }>()
  const pageQueryParam = queryParams?.get('page') || ''
  const searchQueryParam = queryParams?.get('search') ?? ''
  const roleQueryParam = queryParams?.get('role') ?? ''
  const startDateQueryParam = queryParams?.get('startDate')
  const endDateQueryParam = queryParams?.get('endDate') ?? ''
  const selectedAdvisorQueryParam = queryParams?.get('selected') ?? ''

  let startDate: Date | undefined = undefined
  if (startDateQueryParam) {
    startDate = new Date(startDateQueryParam)
  }
  let endDate: Date | undefined = undefined
  if (endDateQueryParam) {
    endDate = new Date(endDateQueryParam)
  }

  const { data, loading, refetch } = useQuery(AdvisorsList_AdvisorsDocument, {
    variables: {
      fromDate: startDate,
      page: parseInt(pageQueryParam),
      role: ROLE_QUERY_PARAM_TO_ROLE[roleQueryParam],
      searchTerm: searchQueryParam,
      toDate: endDate,
    },
  })

  useEffect(() => {
    refetch()
  }, [startDate, endDate])

  const advisors = data?.advisors?.data ?? []
  const currentPage = data?.advisors?.pagination?.page || 1
  const totalPages = data?.advisors?.pagination?.totalPages || 1
  const advisorsTableData = advisors.map((advisor) => {
    return {
      email: advisor.user.email,
      id: advisor.id,
      jobsAdded: advisor.jobsAdded.length,
      jobsShared: advisor.jobsShared.length,
      name: `${advisor.user.firstName} ${advisor.user.lastName}`,
      numClients: advisor.user.numOwnClients,
      role: ROLE_TO_LABEL[advisor.user.role] || '',
    }
  })

  const handlePreviousPage = () => {
    router.push(`/advisors?page=${currentPage - 1}`)
  }

  const handleNextPage = () => {
    router.push(`/advisors?page=${currentPage + 1}`)
  }

  const selectedAdvisor = advisors.find((advisor) => advisor.id === selectedAdvisorQueryParam)

  return (
    <>
      <DataTable
        columns={columns(refetch)}
        data={advisorsTableData}
        isLoading={loading}
        onRowClick={(id: string) => {
          setQueryParams({
            ...queryParams,
            selected: id,
          })
          setIsAdvisorDialogOpen(true)
        }}
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
      <AdvisorSheet
        advisor={selectedAdvisor}
        onOpenChange={setIsAdvisorDialogOpen}
        open={isAdvisorDialogOpen}
      />
    </>
  )
}
