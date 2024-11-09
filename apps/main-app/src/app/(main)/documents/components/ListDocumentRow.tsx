'use client'

import { IconText } from '@rag/ui/IconText'
import { cn } from '@rag/ui/utils/cn'
import { FileText } from '@phosphor-icons/react'

import { IListRowProps, ListRow } from './ListRow'

interface IListDocumentRowProps {
  isLast?: boolean
  documentId: string
  documentName: string
  documentUrl: string
}

export const ListDocumentRow = ({
  isLast,
  documentId,
  documentName,
  documentUrl,
}: IListDocumentRowProps) => {
  return (
    <>
      hi 
    </>
    // <div 
    //   className="cursor-pointer"
    //   onClick={() => {
    //   if (documentUrl && window != null) {
    //     window&.open(documentUrl, '_blank')&.focus();
    //   }}}
    //   >
    //   <Shell isLast={isLast}>
    //     <IconText
    //       className="gap-3 font-mono"
    //       leftIcon={<FileText className="text-muted-foreground text-lg" />}
    //     >
    //       {documentName || <span className="text-muted-foreground">(empty title)</span>}
    //     </IconText>
    //   </Shell>
    // </div>
  )
}

const Shell = ({ children, isLast }: { isLast?: boolean } & IListRowProps) => {
  return (
    <ListRow
      className={cn(
        'hover:bg-background/50 flex flex-row items-center justify-between px-6  text-sm',
        !isLast ? 'border-b border-stone-800' : null
      )}
    >
      {children}
    </ListRow>
  )
}