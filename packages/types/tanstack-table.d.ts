/* eslint-disable */
import '@tanstack/react-table'
import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    isDate?: boolean
    isDateTime?: boolean
    isExpandable?: boolean
    isShortDate?: boolean
    isPinned?: boolean
    disableTruncate?: boolean
    width?: number
  }

  interface TableMeta<TData extends RowData, TValue> {
    archiveJobPostings: (archive: boolean, jobPostingIds: string[]) => void
    setOpen: (id: string) => void
    setOpenShareJobPostingDialog: (rows: TData[]) => void
  }
}
