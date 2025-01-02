'use client'

import { CheckCircle, XCircle } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'

import { stringIsArray } from '@/utils/stringIsArray'

export type TPageCheckResultRun = {
  createdAt: string
  result: string
  sameResultAsLastRun: boolean
}

export const columns = (refetch): ColumnDef<TPageCheckResultRun>[] => {
  return [
    {
      accessorKey: 'createdAt',
      header: 'Created At',
    },
    {
      accessorKey: 'result',
      cell: ({ cell, row }) => {
        const result = cell.getValue() as string
        return (
          <div>
            {stringIsArray(result)
              ? JSON.parse(result)
                  .sort()
                  .map((item) => <div key={item}>{item}</div>)
              : result}
          </div>
        )
      },
      header: 'Result',
      meta: {
        width: 500,
      },
    },
    {
      accessorKey: 'sameResultAsLastRun',
      cell: ({ cell, row }) => {
        return (
          <div>
            {cell.getValue() ? (
              <CheckCircle className="text-green-400" />
            ) : (
              <XCircle className="text-red-400" />
            )}
          </div>
        )
      },
      header: 'Same as last time?',
    },
  ]
}
