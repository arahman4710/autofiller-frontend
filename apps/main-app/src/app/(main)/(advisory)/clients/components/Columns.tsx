'use client'

import { useMemo } from 'react'

import { TableFooterCell } from '@canyon/ui/Table'
import { ColumnDef } from '@tanstack/react-table'

export type TClient = {
  allJobs: number
  appliedJobs: number
  interviewedJobs: number
  lastActiveAt: string
  name: string
  offeredJobs: number
  rejectedJobs: number
}

export const columns: ColumnDef<TClient>[] = [
  {
    accessorKey: 'name',
    footer: ({ table }) => (
      <TableFooterCell
        label="count"
        value={useMemo(() => table.getRowCount(), [table.getRowCount()])}
      />
    ),
    header: 'Name',
    meta: {
      isPinned: true,
    },
    size: 250,
  },
  {
    accessorKey: 'advisorName',
    aggregationFn: 'count',
    footer: ({ table }) => {
      return (
        <TableFooterCell
          label="empty"
          value={useMemo(
            () =>
              table.getFilteredRowModel().rows.filter((row) => row.getValue('advisorName') === null)
                .length,
            [table.getFilteredRowModel()]
          )}
        />
      )
    },
    header: 'Advisor',
    size: 400,
  },
  {
    accessorKey: 'allJobs',
    footer: ({ table }) => (
      <TableFooterCell
        label="sum"
        value={useMemo(
          () =>
            table.getFilteredRowModel().rows.reduce((acc, row) => acc + row.original.allJobs, 0),
          [table.getFilteredRowModel()]
        )}
      />
    ),
    header: 'All',
  },
  {
    accessorKey: 'appliedJobs',
    footer: ({ table }) => (
      <TableFooterCell
        label="sum"
        value={useMemo(
          () =>
            table
              .getFilteredRowModel()
              .rows.reduce((acc, row) => acc + row.original.appliedJobs, 0),
          [table.getFilteredRowModel()]
        )}
      />
    ),
    header: 'Apply',
  },
  {
    accessorKey: 'interviewedJobs',
    footer: ({ table }) => (
      <TableFooterCell
        label="sum"
        value={useMemo(
          () =>
            table
              .getFilteredRowModel()
              .rows.reduce((acc, row) => acc + row.original.interviewedJobs, 0),
          [table.getFilteredRowModel()]
        )}
      />
    ),
    header: 'Interview',
  },
  {
    accessorKey: 'offeredJobs',
    footer: ({ table }) => (
      <TableFooterCell
        label="sum"
        value={useMemo(
          () =>
            table
              .getFilteredRowModel()
              .rows.reduce((acc, row) => acc + row.original.offeredJobs, 0),
          [table.getFilteredRowModel()]
        )}
      />
    ),
    header: 'Offer',
  },
  {
    accessorKey: 'rejectedJobs',
    footer: ({ table }) => (
      <TableFooterCell
        label="sum"
        value={useMemo(
          () =>
            table
              .getFilteredRowModel()
              .rows.reduce((acc, row) => acc + row.original.rejectedJobs, 0),
          [table.getFilteredRowModel()]
        )}
      />
    ),
    header: 'Rejected',
  },
  {
    accessorKey: 'lastActiveAt',
    header: 'Last Active At',
    meta: {
      isDateTime: true,
    },
  },
]
