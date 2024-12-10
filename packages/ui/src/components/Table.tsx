import { forwardRef } from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

export const tableVariants = cva('group w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      minimal: 'minimal',
    },
  },
})

const Table = forwardRef<
  HTMLTableElement,
  {
    tableContainerProps?: React.HTMLAttributes<HTMLDivElement>
  } & React.HTMLAttributes<HTMLTableElement> &
    VariantProps<typeof tableVariants>
>(({ className, tableContainerProps, variant, ...props }, ref) => (
  <div className="relative h-[calc(100vh-150px)] w-full overflow-auto" {...tableContainerProps}>
    <table className={cn(tableVariants({ variant }), className)} ref={ref} {...props} />
  </div>
))
Table.displayName = 'Table'

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead className={cn('text-nowrap [&_tr]:border-b', className)} ref={ref} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody className={cn('', className)} ref={ref} {...props} />)
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    className={cn('border-y-0.5 bg-inherit font-mono font-medium', className)}
    ref={ref}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableFooterCell = forwardRef<
  HTMLTableCellElement,
  {
    label: string
    value: number | string
  } & React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, label, value, ...props }, ref) => (
  <td className={cn('flex justify-end gap-1.5', className)} ref={ref} {...props}>
    <span className="font-mono">{value}</span>
    <span className="text-muted-foreground">{label}</span>
  </td>
))
TableFooterCell.displayName = 'TableFooterCell'

const TableRow = forwardRef<
  HTMLTableRowElement,
  { enableHover?: boolean } & React.HTMLAttributes<HTMLTableRowElement>
>(({ className, enableHover = false, ...props }, ref) => (
  <tr
    className={cn(
      'data-[state=selected]:bg-muted/10 border-border border-b-0.5 transition-colors',
      enableHover && 'hover:bg-muted/50',
      className
    )}
    ref={ref}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      className={cn(
        'text-muted-foreground border-border h-10 select-none select-none border-r px-4 text-left align-middle font-medium group-[.minimal]:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      className={cn(
        'border-border h-[35px] text-wrap border-r px-4 align-middle group-[.minimal]:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption className={cn('text-muted-foreground mt-4 text-sm', className)} ref={ref} {...props} />
))
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableFooterCell,
  TableHead,
  TableHeader,
  TableRow,
}
