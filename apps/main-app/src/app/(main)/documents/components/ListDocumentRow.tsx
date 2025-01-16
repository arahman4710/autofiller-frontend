'use client'

import { useState } from 'react'

import { ArchiveBox, DotsThree, FileText } from '@phosphor-icons/react'
import { IconText } from '@autofiller/ui/IconText'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverOverlay,
  PopoverTrigger,
} from '@autofiller/ui/Popover'
import { cn } from '@autofiller/ui/utils/cn'

import { IListRowProps, ListRow } from './ListRow'

interface IListDocumentRowProps {
  archiveDocument: () => void
  documentId: string
  documentName: string
  documentUrl: string
  isLast?: boolean
}

export const ListDocumentRow = ({
  archiveDocument,
  documentId,
  documentName,
  documentUrl,
  isLast,
}: IListDocumentRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleArchiveResume = () => {
    archiveDocument()
    setIsMenuOpen(false)
  }

  const handleClick = () => {
    if (documentUrl && window != null) {
      window?.open(documentUrl, '_blank')?.focus();
    }
  }

  return (
    <div>
      <Shell isLast={isLast}>
        <div
          className="cursor-pointer grow"
          onClick={handleClick}
        >
          <IconText
            className="gap-3 font-mono"
            leftIcon={<FileText className="text-muted-foreground text-lg" />}
          >
            {documentName || <span className="text-muted-foreground">(empty title)</span>}
          </IconText>
        </div>
        <div className="flex items-center">
          <Popover onOpenChange={(state) => setIsMenuOpen(state)} open={isMenuOpen}>
            <PopoverTrigger asChild>
              <div
                className="hover:bg-background-contrast rounded-md px-2 py-1 hover:block"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuOpen(true)
                }}
                role="button"
              >
                <DotsThree className="text-muted-foreground text-xl" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-auto min-w-[170px] select-none"
              onClick={(e) => e.stopPropagation()}
              side="bottom"
              sideOffset={8}
            >
              <PopoverMenu>
                <PopoverMenuItem onClick={handleArchiveResume}>
                  <IconText leftIcon={<ArchiveBox />}>Archive document</IconText>
                </PopoverMenuItem>
              </PopoverMenu>
            </PopoverContent>
          </Popover>
          <PopoverOverlay open={isMenuOpen} />
        </div>
      </Shell>
    </div>
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