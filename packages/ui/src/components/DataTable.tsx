'use client'

import { useMemo, useState } from 'react'

import { LoaderBar } from '@rag/ui/LoaderBar'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableVariants,
} from '@rag/ui/Table'
import { cn } from '@rag/ui/utils/cn'
import { formatDate } from '@rag/utils'
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  TableMeta,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { VariantProps } from 'class-variance-authority'

import type { TSelectionAction } from './DataTableSelectActionBar'

import { DataTableSelectActionBar } from './DataTableSelectActionBar'

export type TColumnDef<T> = ColumnDef<{ id?: string } & T>

interface IDataTableProps<TData, TValue> {
  className?: string
  clearSelectedRows?: () => void
  columns: ColumnDef<{ id?: string } & TData, TValue>[]
  data: ({ id?: string } & TData)[]
  emptyResultsText?: string
  enableFooter?: boolean
  isLoading?: boolean
  meta?: TableMeta<TData, TValue>
  onCellClick?: ({
    cellId,
    columnId,
    rowId,
  }: {
    cellId: string
    columnId: string
    rowId: string
  }) => void
  onRowClick?: (rowId: string) => void
  selectionActions?: TSelectionAction[]
  variant?: VariantProps<typeof tableVariants>['variant']
}

export function DataTable<TData, TValue>({
  className,
  columns,
  data,
  emptyResultsText,
  enableFooter = false,
  isLoading = false,
  meta,
  onCellClick,
  onRowClick,
  selectionActions,
  variant = 'default',
}: IDataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    data,
    defaultColumn: {
      maxSize: -1,
      minSize: -1,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  })

  if (isLoading) {
    return <LoaderBar className="w-[400px]" />
  }

  const getPinnedBorderStyles = (type: 'column' | 'header'): string =>
    `sticky after:content-[""] after:absolute after:inset-0 after:h-full after:border-border-secondary ${type === 'column' ? 'after:border-r-0.5 left-0 border-r-0 bg-background z-10' : 'after:border-b-0.5 top-0 border-b-0 z-20 bg-background'}`

  const getPinnedColumnStyles = (isPinned: boolean): string =>
    isPinned ? getPinnedBorderStyles('column') : ''

  const pinnedHeaderStyles = `${getPinnedBorderStyles('header')}`

  const memoizedCellProps = (cellInfo: Cell<TData, TValue>) => ({
    className: cn(
      'select-none',
      getPinnedColumnStyles(cellInfo.column.columnDef.meta?.isPinned ?? false),
      cellInfo.column.columnDef.meta?.disableTruncate ? '' : 'truncate',
      cellInfo.column.columnDef.meta?.width ? `w-[${cellInfo.column.columnDef.meta.width}px]` : 'w-[150px]'
    ),
    // style: {
    //   width: cellInfo.column.columnDef.size || 'auto',
    // },
  })

  const selectedRows = table.getSelectedRowModel().rows

  return (
    <div className="relative h-full">
      <Table variant={variant}>
        <TableHeader className={cn('', pinnedHeaderStyles)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow enableHover={false} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isPinned = header.column.columnDef.meta?.isPinned
                return (
                  <TableHead
                    className={cn('truncate', getPinnedColumnStyles(!!isPinned))}
                    key={header.id}
                    style={{
                      width: header.column.columnDef.size || 'auto',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn(onRowClick && 'cursor-pointer')}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
                onClick={() => onRowClick && row.original.id && onRowClick(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    onClick={() => {
                      if (onCellClick && row.original.id) {
                        onCellClick({
                          cellId: cell.id,
                          columnId: cell.column.id,
                          rowId: row.original.id,
                        })
                      }
                    }}
                    {...memoizedCellProps(cell)}
                  >
                    {cell.column.columnDef.meta?.isDate ||
                    cell.column.columnDef.meta?.isDateTime ||
                    cell.column.columnDef.meta?.isShortDate
                      ? formatDateTimeCell(cell.getValue(), cell.column.columnDef.meta)
                      : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow enableHover={false}>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                {emptyResultsText || 'No results.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {enableFooter && table.getFooterGroups().length > 0 && (
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <TableRow enableHover={false} key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    const isPinned = header.column.columnDef.meta?.isPinned
                    return (
                      <TableCell className={cn(getPinnedColumnStyles(!!isPinned))} key={header.id}>
                        {flexRender(header.column.columnDef.footer, header.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableFooter>
        )}
      </Table>
      {selectedRows.length > 0 && (
        <DataTableSelectActionBar
          actions={selectionActions ?? []}
          clearSelectedRows={() => setRowSelection({})}
          open={true}
          selectedRowCount={selectedRows.length}
          selectedRows={selectedRows.map((row) => row.original)}
          setSelectedRows={setRowSelection}
        ></DataTableSelectActionBar>
      )}
    </div>
  )
}

export const TABLE_SHORT_DATE_FORMAT = 'MMM d'
export const TABLE_DATE_FORMAT = 'MMM d, yyyy'
export const TABLE_DATETIME_FORMAT = 'MMM d yyyy, h:mmaaa'

const formatDateTimeCell = (value, meta) => {
  if (!value) return ''

  const date = new Date(value)

  if (meta.isShortDate) {
    return formatDate(date, TABLE_SHORT_DATE_FORMAT)
  }

  if (meta.isDate) {
    return formatDate(date, TABLE_DATE_FORMAT)
  }

  if (meta.isDateTime) {
    return formatDate(date, TABLE_DATETIME_FORMAT)
  }

  return value
}
