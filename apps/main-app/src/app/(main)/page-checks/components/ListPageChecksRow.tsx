'use client'

import { useState } from 'react'

import { ArchiveBox, Browser, DotsThree } from '@phosphor-icons/react'
import Link from 'next/link'

import { IconText } from '@rag/ui/IconText'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverOverlay,
  PopoverTrigger,
} from '@rag/ui/Popover'
import { cn } from '@rag/ui/utils/cn'

import { PageCheckIntervalEnum } from '@/gql/__generated__/graphql'

import { IListRowProps, ListRow } from './ListRow'

export const checkIntervalToString: Record<PageCheckIntervalEnum, string> = {
  [PageCheckIntervalEnum.Daily]: "Daily",
  [PageCheckIntervalEnum.Weekly]: "Weekly",
}

interface IListDocumentRowProps {
  archivePageCheck: () => void
  isLast?: boolean
  pageCheckId: string
  pageCheckInterval: PageCheckIntervalEnum
  pageCheckUrl: string
}

export const ListPageChecksRow = ({
  archivePageCheck,
  isLast,
  pageCheckId,
  pageCheckInterval,
  pageCheckUrl,
}: IListDocumentRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleArchivePageCheck = () => {
    archivePageCheck()
    setIsMenuOpen(false)
  }

  return (
    <Link href={`/page-checks/${pageCheckId}`}>
      <Shell isLast={isLast}>
        <div
          className="cursor-pointer grow"
        >
          <IconText
            className="gap-3 font-mono"
            leftIcon={<Browser className="text-muted-foreground text-lg" />}
          >
            ({checkIntervalToString[pageCheckInterval]}) {pageCheckUrl}
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
                <PopoverMenuItem onClick={handleArchivePageCheck}>
                  <IconText leftIcon={<ArchiveBox />}>Archive page check</IconText>
                </PopoverMenuItem>
              </PopoverMenu>
            </PopoverContent>
          </Popover>
          <PopoverOverlay open={isMenuOpen} />
        </div>
      </Shell>
    </Link>
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