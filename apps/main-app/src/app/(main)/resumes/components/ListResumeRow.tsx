'use client'

import { useState } from 'react'

import { IconText } from '@canyon/ui/IconText'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverOverlay,
  PopoverTrigger,
} from '@canyon/ui/Popover'
import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'
import { formatDate } from '@canyon/utils'
import { FileText } from '@phosphor-icons/react'
import { ArchiveBox, ArrowSquareUp, Copy, DotsThree } from '@phosphor-icons/react'
import Link from 'next/link'

import { trackEvent } from '@/lib/utils/analytics'

import { IListRowProps, ListRow } from './ListRow'

interface IListResumeRowProps {
  archiveResume: () => void
  createdAt: Date
  duplicateResume: () => void
  isArchived: boolean
  isLast?: boolean
  restoreResume: () => void
  resumeId: string
  resumeName: string
  updatedAt: Date
}

export const ListResumeRow = ({
  archiveResume,
  createdAt,
  duplicateResume,
  isArchived,
  isLast,
  restoreResume,
  resumeId,
  resumeName,
  updatedAt,
}: IListResumeRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleArchiveResume = () => {
    archiveResume()
    setIsMenuOpen(false)
  }

  const handleRestoreResume = () => {
    restoreResume()
    setIsMenuOpen(false)
  }

  const handleDuplicateResume = () => {
    duplicateResume()
    setIsMenuOpen(false)
  }

  return (
    <Link href={`/resumes/${resumeId}`} onClick={() => trackEvent('User clicked on a resume')}>
      <Shell isLast={isLast}>
        <IconText
          className="gap-3 font-mono"
          leftIcon={<FileText className="text-muted-foreground text-lg" />}
        >
          {resumeName || <span className="text-muted-foreground">(empty title)</span>}
        </IconText>
        <div className="flex items-center">
          <div className="text-text-muted mr-4 text-right text-sm">
            created {formatDate(createdAt, 'MM/dd/yy')}
          </div>
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
                {isArchived ? (
                  <PopoverMenuItem onClick={handleRestoreResume}>
                    <IconText leftIcon={<ArrowSquareUp />}>Restore resume</IconText>
                  </PopoverMenuItem>
                ) : (
                  <PopoverMenuItem onClick={handleArchiveResume}>
                    <IconText leftIcon={<ArchiveBox />}>Archive resume</IconText>
                  </PopoverMenuItem>
                )}
              </PopoverMenu>
              <PopoverMenuItem onClick={handleDuplicateResume}>
                <IconText leftIcon={<Copy />}>Duplicate</IconText>
              </PopoverMenuItem>
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

export const ListResumeRowSkeleton = () => {
  return (
    <Shell>
      <IconText className="gap-3" leftIcon={<Skeleton className="h-4 w-4" />}>
        <Skeleton className="h-5 w-[200px]" />
      </IconText>
    </Shell>
  )
}
