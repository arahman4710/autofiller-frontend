'use client'

import { IconText } from '@canyon/ui/IconText'
import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'
import { CheckCircle } from '@phosphor-icons/react'
import Link from 'next/link'

import { trackEvent } from '@/lib/utils/analytics'

import { IListRowProps, ListRow } from './ListRow'

interface IListResumeRowProps {
  checked: boolean
  header: string
  href: string
  icon: JSX.Element
  isLast?: boolean
  openInNewTab: boolean
  subText: string
}

export const ListTodoRow = ({
  checked,
  header,
  href,
  icon,
  isLast,
  openInNewTab = false,
  subText,
}: IListResumeRowProps) => {
  return (
    <LinkComponent header={header} href={href} openInNewTab={openInNewTab}>
      <Shell isLast={isLast}>
        <div className={cn('flex gap-3', checked ? 'opacity-25' : null)}>
          <span className="pt-1">{icon}</span>
          <div>
            {header}
            <p className="text-muted-foreground mt-1 text-sm">{subText}</p>
          </div>
        </div>
        {checked ? (
          <CheckCircle className="mr-2 self-center" color="green" size={24} weight="duotone" />
        ) : null}
      </Shell>
    </LinkComponent>
  )
}

const LinkComponent = ({
  children,
  header,
  href,
  openInNewTab,
}: {
  children: React.ReactNode
  header: string
  href: string
  openInNewTab: boolean
}) => {
  if (openInNewTab) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  } else {
    return (
      <Link href={href} onClick={() => trackEvent(`User clicked on to do list item: ${header}`)}>
        {children}
      </Link>
    )
  }
}

const Shell = ({ children, isLast }: { isLast?: boolean } & IListRowProps) => {
  return (
    <ListRow
      className={cn(
        'hover:bg-background/50 flex flex-row items-center justify-between px-6 text-base',
        !isLast ? 'border-b border-stone-800' : null
      )}
    >
      {children}
    </ListRow>
  )
}

export const ListTodoRowSkeleton = () => {
  return (
    <Shell>
      <IconText className="gap-3" leftIcon={<Skeleton className="h-4 w-4" />}>
        <Skeleton className="h-12 w-[200px]" />
      </IconText>
    </Shell>
  )
}
