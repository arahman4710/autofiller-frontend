'use client'

import { cloneElement, useEffect, useMemo, useState } from 'react'

import { useQuery, useSuspenseQuery } from '@apollo/client'
import { Badge } from '@canyon/ui/Badge'
import { IconText } from '@canyon/ui/IconText'
import { cn } from '@canyon/ui/utils/cn'
import {
  ArrowCircleUp,
  Article,
  CaretDown,
  Chats,
  DotsNine,
  Files,
  House,
  ReadCvLogo,
  Student,
  User,
  UsersThree,
} from '@phosphor-icons/react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Navigation_ClientGroupsDocument,
  Navigation_ItemsDataDocument,
  UsersRoleEnum,
} from '@gql/graphql'

import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'
import { trackEvent } from '@/lib/utils/analytics'
import { generateTodoItems } from '@/utils/generateTodoItems'

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

  const [isDocumentsOpen, setDocumentsOpen] = useState(true)
  const [isClientGroupsOpen, setClientGroupsOpen] = useState(true)

  useEffect(() => {
    if (shouldOpenUpgradeDialog && !upgradePlanDialog.isOpen) {
      upgradePlanDialog.setOpen(true)
    }
  }, [])

  const { isAdvisoryOrgAccount, isPaidPlan, loading: currentUserIsLoading, role } = useCurrentUser()
  const { data } = useSuspenseQuery(Navigation_ItemsDataDocument)
  const todoItems = generateTodoItems(data)
  const todoListCount = todoItems.filter((todoItem) => !todoItem.checked).length

  const { data: clientGroupsData } = useQuery(Navigation_ClientGroupsDocument, {
    skip: !isAdvisoryOrgAccount,
  })
  const clientGroups = clientGroupsData?.clientGroups || []

  const mainNavItems = (): TNavItem[] => {
    switch (role) {
      case UsersRoleEnum.Admin:
        return [
          {
            enabled: true,
            href: '/advisors',
            icon: <User />,
            name: 'Advisors',
          },
          {
            enabled: true,
            href: '/clients',
            icon: <Student />,
            name: 'Clients',
          },
          {
            enabled: true,
            href: '/job-postings',
            icon: <ReadCvLogo />,
            name: 'Job Postings',
          },
        ]
      case UsersRoleEnum.AccountManager:
        return [
          {
            enabled: true,
            href: '/advisors',
            icon: <User />,
            name: 'Advisors',
          },
          {
            enabled: true,
            href: '/clients',
            icon: <Student />,
            name: 'Clients',
          },
          {
            enabled: true,
            href: '/job-postings',
            icon: <ReadCvLogo />,
            name: 'Job Postings',
          },
        ]
      case UsersRoleEnum.Advisor:
        return [
          {
            enabled: true,
            href: '/clients',
            icon: <Student />,
            name: 'Clients',
          },
          {
            enabled: true,
            href: '/job-postings',
            icon: <ReadCvLogo />,
            name: 'Job Postings',
          },
        ]
      case UsersRoleEnum.Jobseeker:
        return [
          {
            count: todoListCount,
            enabled: true,
            href: '/dashboard',
            icon: <House />,
            name: 'Dashboard',
          },
          {
            enabled: true,
            href: '/board',
            icon: <DotsNine />,
            name: 'Applications',
          },
          {
            enabled: true,
            href: '/interviews',
            icon: <Chats />,
            name: 'Interviews',
          },
        ]
      default:
        return []
    }
  }

  const navSections: TNavSection[] = useMemo(() => {
    if (!role) {
      return []
    }

    return [
      {
        enabled: isAdvisoryOrgAccount && clientGroups.length > 0,
        name: 'Client Groups',
        navItems: clientGroups.map((clientGroup) => ({
          enabled: true,
          href: `/client-groups/${clientGroup.id}`,
          icon: (
            <NavSectionItemIcon
              className="bg-emerald-300"
              icon={<UsersThree className="text-slate-800" />}
            />
          ),
          name: clientGroup.name,
        })),
        open: isClientGroupsOpen,
        toggleOpen: () => setClientGroupsOpen(!isClientGroupsOpen),
      },
      {
        enabled: !isAdvisoryOrgAccount,
        name: 'Documents',
        navItems: [
          {
            enabled: true,
            href: '/resumes',
            icon: (
              <NavSectionItemIcon
                className="bg-slate-300"
                icon={<Files className="text-slate-800" />}
              />
            ),
            name: 'Resumes',
          },
          {
            enabled: true,
            href: '/cover-letters',
            icon: (
              <NavSectionItemIcon
                className="bg-slate-300"
                icon={<Article className="text-slate-800" />}
              />
            ),
            name: 'Cover Letters',
          },
        ],
        open: isDocumentsOpen,
        toggleOpen: () => setDocumentsOpen(!isDocumentsOpen),
      },
    ]
  }, [
    isDocumentsOpen,
    setDocumentsOpen,
    isClientGroupsOpen,
    setClientGroupsOpen,
    role,
    isAdvisoryOrgAccount,
    clientGroups,
  ])

  return (
    <div className="space-y-4">
      <nav className="space-y-1">
        {mainNavItems().map((item) => (
          <NavLink href={item.href} key={item.href}>
            <IconText leftIcon={item.icon}>{item.name}</IconText>
            {!!item.count && item.count !== 0 && <Badge variant="notification">{item.count}</Badge>}
          </NavLink>
        ))}
        <div>
          {navSections.map((section) => {
            if (!section.enabled) return null

            return (
              <div className="mt-3" key={section.name}>
                <div
                  className="text-muted hover:bg-background-secondary/70 flex w-fit cursor-pointer select-none flex-row items-center gap-2 rounded-lg px-2 py-1 text-[12px]"
                  onClick={section.toggleOpen}
                >
                  <CaretDown className={cn('transition-all', !section.open && '-rotate-90')} />{' '}
                  {section.name}
                </div>
                <div
                  className={cn(
                    'h-fit overflow-visible transition-all',
                    !section.open && 'h-0 overflow-hidden opacity-0'
                  )}
                >
                  {section.navItems.map((item) => (
                    <NavLink href={item.href} key={item.name}>
                      <IconText leftIcon={item.icon}>
                        <div className="w-[160px] truncate">{item.name}</div>
                      </IconText>
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </nav>
      {!isPaidPlan && !isAdvisoryOrgAccount && !currentUserIsLoading && (
        <>
          <hr className="border-border/30" />
          <div className="flex flex-col gap-2 px-3">
            <div
              className="font-light text-white hover:text-white/80"
              onClick={() => {
                upgradePlanDialog.setOpen(true)
                trackEvent('User clicked Upgrade Plan button')
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
