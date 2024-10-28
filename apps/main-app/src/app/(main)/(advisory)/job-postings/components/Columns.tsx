'use client'

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
} from '@canyon/ui/AlertDialog'
import { Button } from '@canyon/ui/Button'
import { Checkbox } from '@canyon/ui/Checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@canyon/ui/DropdownMenu'
import { ExpandableCell } from '@canyon/ui/ExpandableCell'
import { cn } from '@canyon/ui/utils'
import { trimUrl } from '@canyon/utils'
import { ArrowDown, ArrowUp, DotsThree } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import {
  JobPostingSortEnum,
  JobPostingsList_JobPostingsQuery,
  SortByDirectionEnum,
} from '@gql/graphql'

type TData = JobPostingsList_JobPostingsQuery['paginatedUsersJobs']['data'][number]

interface IColumn {
  companyName: TData['companyName']
  createdAt: TData['createdAt']
  id: TData['id']
  isRemote: TData['isRemote']
  location: TData['location']
  numClientsApplied: TData['numClientsApplied']
  numClientsShared: TData['numClientsShared']
  payPeriod: TData['payPeriod']
  position: TData['position']
  salary: null | string
  url: TData['url']
}

export const columns = (refetch): ColumnDef<IColumn>[] => {
  return [
    {
      accessorKey: 'companyName',
      cell: ({ cell, row }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            className="z-10 h-[16px] w-[16px]"
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            variant="cta"
          />
          <div>{cell.getValue() as string}</div>
        </div>
      ),
      header: ({ table }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            aria-label="Select all"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            className="z-10 h-[16px] w-[16px]"
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
            variant="cta"
          />
          <div>Company Name</div>
        </div>
      ),
      meta: {
        isPinned: true,
      },
      size: 160,
    },
    {
      accessorKey: 'position',
      cell: ({ cell }) => <div>{cell.getValue() as string}</div>,
      header: 'Job Position',
    },
    {
      accessorKey: 'salary',
      cell: ({ cell, row }) => {
        const payPeriod = row.original.payPeriod

        return cell.getValue() ? (
          <div>
            {cell.getValue() as string}{' '}
            <span className="text-muted-foreground lowercase">/{payPeriod}</span>
          </div>
        ) : null
      },
      header: 'Salary',
    },
    {
      accessorKey: 'location',
      cell: ({ cell, row }) => {
        const isRemote = row.original.isRemote
        const location = cell.getValue() as string

        return (
          <ExpandableCell cellSize={230}>
            <div className="flex items-center gap-2">
              {location && (
                <Pill className="border-purple-400 bg-purple-500/30 text-purple-200 ">
                  {location}
                </Pill>
              )}
              {isRemote && (
                <Pill className="border-orange-400 bg-orange-500/30 text-orange-200">Remote</Pill>
              )}
            </div>
          </ExpandableCell>
        )
      },
      header: 'Location',
      meta: {
        disableTruncate: true,
      },
      size: 110,
    },
    {
      accessorKey: 'url',
      cell: ({ cell }) => (
        <Link
          className="text-muted-foreground truncate underline"
          href={cell.getValue() as string}
          target="_blank"
        >
          {trimUrl(cell.getValue() as string)}
        </Link>
      ),
      header: 'Posting URL',
      size: 120,
    },
    {
      accessorKey: 'numClientsShared',
      header: ({ column }) => {
        return (
          <Button
            className="z-10"
            onClick={() => {
              refetch({
                sortBy: JobPostingSortEnum.ClientsSharedWith,
                sortByDirection:
                  column.getIsSorted() !== 'asc'
                    ? SortByDirectionEnum.Asc
                    : SortByDirectionEnum.Desc,
              })
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
            variant="ghost"
          >
            Clients Shared With
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
      size: 90,
    },
    {
      accessorKey: 'numClientsApplied',
      header: ({ column }) => {
        return (
          <Button
            className="z-10"
            onClick={() => {
              refetch({
                sortBy: JobPostingSortEnum.ClientsApplied,
                sortByDirection:
                  column.getIsSorted() !== 'asc'
                    ? SortByDirectionEnum.Asc
                    : SortByDirectionEnum.Desc,
              })
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
            variant="ghost"
          >
            Clients Applied
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
      size: 90,
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      meta: {
        isDate: true,
      },
      size: 90,
    },
    {
      cell: ({ row, table }) => {
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <DotsThree className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => table.options.meta?.setOpen(row.original.id)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => table.options.meta?.setOpenShareJobPostingDialog([row.original])}
                >
                  Share with Clients
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>Archive Job Posting</DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone and will archive this job posting for all clients.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    table.options.meta?.archiveJobPostings(true, [row.original.id])
                  }}
                  variant="destructive"
                >
                  Archive
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
      header: 'Actions',
      id: 'actions',
    },
  ]
}

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('border-0.5 rounded-lg px-1.5 text-sm', className)}>{children}</div>
}
