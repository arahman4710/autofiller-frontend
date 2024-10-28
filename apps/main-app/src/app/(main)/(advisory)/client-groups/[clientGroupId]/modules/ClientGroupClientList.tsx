'use client'

import { useSuspenseQuery } from '@apollo/client'
import { DataTable } from '@rag/ui/DataTable'
import { useRouter } from 'next/navigation'

import { ClientGroupClientList_ClientGroupsDocument } from '@gql/graphql'

import { columns } from '../components/Columns'

interface IClientGroupClientListProps {
  clientGroupId: string
}

export const ClientGroupClientList = ({ clientGroupId }: IClientGroupClientListProps) => {
  const router = useRouter()

  const { data } = useSuspenseQuery(ClientGroupClientList_ClientGroupsDocument, {
    variables: {
      clientGroupIds: [clientGroupId],
    },
  })

  const clientsListTableData = data.clientGroups[0].clients.map((client) => {
    const user = client.user

    return {
      advisorName: `${user.advisor?.firstName} ${user.advisor?.lastName}`,
      allJobs: client.numAllJobs,
      appliedJobs: client.numAppliedJobs,
      id: client.id,
      interviewedJobs: client.numInterviewedJobs,
      lastActiveAt: user.lastActiveAt,
      name: `${user.firstName} ${user.lastName}`,
      offeredJobs: client.numOfferedJobs,
      rejectedJobs: client.numRejectedJobs,
    }
  })

  const handleRowClick = (id: string) => {
    router.push(`/clients/${id}`)
  }

  return (
    <DataTable
      columns={columns}
      data={clientsListTableData}
      emptyResultsText="No clients found"
      enableFooter={true}
      onRowClick={handleRowClick}
    />
  )
}
