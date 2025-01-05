'use client'

import { cloneElement, useEffect, useMemo, useState } from 'react'

import { ArrowCircleUp, Browser } from '@phosphor-icons/react'
import { Badge } from '@rag/ui/Badge'
import { IconText } from '@rag/ui/IconText'
import { cn } from '@rag/ui/utils/cn'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'

type TNavItem = {
  count?: number
  enabled: boolean
  href: string
  icon?: JSX.Element
  name: string
}

type TNavSection = {
  enabled: boolean
  name: string
  navItems: TNavItem[]
  open: boolean
  toggleOpen: () => void
}

export const Navigation = () => {
  const { queryParams } = useQueryParams()
  const upgradePlanDialog = useUpgradePlanDialog()
  const shouldOpenUpgradeDialog = queryParams?.get('open_upgrade_dialog') == 'true'
  const { isPaidPlan, loading: currentUserIsLoading, user } = useCurrentUser()

  const mainNavItems = (): TNavItem[] => {
    return [
      // {
      //   enabled: true,
      //   href: '/chat',
      //   icon: <Chat />,
      //   name: 'Chat',
      // },
      // {
      //   enabled: true,
      //   href: '/documents',
      //   icon: <ReadCvLogo />,
      //   name: 'Documents',
      // },
      {
        enabled: true,
        href: '/page-checks',
        icon: <Browser />,
        name: 'Page Checks',
      },
    ]
  }

  return (
    <div className="space-y-4">
      <nav className="space-y-1">
        {mainNavItems().map((item) => (
          <NavLink href={item.href} key={item.href}>
            <IconText leftIcon={item.icon}>{item.name}</IconText>
            {!!item.count && item.count !== 0 && <Badge variant="notification">{item.count}</Badge>}
          </NavLink>
        ))}
      </nav>
      {!isPaidPlan && !currentUserIsLoading && (
        <>
          <hr className="border-border/30" />
          <div className="flex flex-col gap-2 px-3">
            <div
              className="font-light text-white hover:text-white/80"
              onClick={() => {
                upgradePlanDialog.setOpen(true)
              }}
              role="button"
            >
              <IconText
                leftIcon={<ArrowCircleUp className="text-emerald-400" size={16} weight="fill" />}
              >
                Upgrade to Pro
              </IconText>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const NavLink = ({ children, href, ...props }: { children: React.ReactNode } & LinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'text-text-muted hover:text-text/90 flex items-center justify-between rounded-lg px-3 py-2',
        pathname?.includes(href as string)
          ? 'text-semibold bg-background-secondary text-text/90 hover:text-text/90'
          : null
      )}
    >
      {children}
    </Link>
  )
}

const NavSectionItemIcon = ({ className, icon }: { className?: string; icon: JSX.Element }) => (
  <div className={cn('flex items-center justify-center rounded-[4px] p-0.5', className)}>
    {cloneElement(icon, {
      size: 11,
      weight: 'fill',
    })}
  </div>
)
