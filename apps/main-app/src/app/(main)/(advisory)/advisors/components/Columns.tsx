'use client'

import { Button } from '@rag/ui/Button'
import { ArrowDown, ArrowUp } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'

import { AdvisorSortEnum, SortByDirectionEnum } from '@gql/graphql'

export type TAdvisor = {
  name: string
}

export const columns = (refetch): ColumnDef<TAdvisor>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'numClients',
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              refetch({
                sortBy: AdvisorSortEnum.Clients,
                sortByDirection:
                  column.getIsSorted() !== 'asc'
                    ? SortByDirectionEnum.Asc
                    : SortByDirectionEnum.Desc,
              })
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
            variant="ghost"
          >
            Clients
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
    },
    {
      accessorKey: 'jobsAdded',
      header: ({ column }) => {
        return (
          <Button
            onClick={() => {
              refetch({
                sortBy: AdvisorSortEnum.JobsAdded,
                sortByDirection:
                  column.getIsSorted() !== 'asc'
                    ? SortByDirectionEnum.Asc
                    : SortByDirectionEnum.Desc,
              })
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
            variant="ghost"
          >
            Jobs added
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
    },
    {
      accessorKey: 'jobsShared',
      header: 'Jobs shared',
    },
  ]
}
