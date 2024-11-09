'use client'

import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@rag/ui/Avatar'
import { IconText } from '@rag/ui/IconText'
import {
  Popover,
  PopoverContent,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuSeparator,
  PopoverTrigger,
} from '@rag/ui/Popover'
import { Barcode, Gear, Gift, Question, SignOut, User } from '@phosphor-icons/react'
import Link from 'next/link'

import { AccountSettingsDialog } from '@/components/dialogs/AccountSettingsDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { trackEvent } from '@/lib/utils/analytics'

export const ProfileButton = () => {
  const { user } = useCurrentUser()

  const [isAccountSettingsDialogOpen, setIsAccountSettingsDialogOpen] = useState<boolean>(false)

  const handleReferralsClick = () => {
    setIsReferralsDialogOpen(true)
    trackEvent('User clicked referrals')
  }

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <div className="border-border-secondary bg-background-secondary border-0.5 shadow-highlight flex cursor-pointer items-center gap-2.5 rounded-lg p-2">
          <Avatar className="h-5 w-5">
            {/* <AvatarImage src={user?.avatarUrl} /> */}
            <AvatarFallback gradientHashSource={user?.email} />
          </Avatar>
          <div className="flex select-none flex-col">
            <div className="text-sm font-light tracking-wide">{user?.firstName}</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[240px]" sideOffset={6}>
        <PopoverMenu>
          <PopoverMenuItem>
            <Link className="w-full" href="/auth/signout">
              <IconText leftIcon={<SignOut />}>Sign Out</IconText>
            </Link>
          </PopoverMenuItem>
          <PopoverMenuSeparator />
          <PopoverMenuItem onClick={() => setIsAccountSettingsDialogOpen(true)}>
            <IconText leftIcon={<Gear />}>Account Settings</IconText>
          </PopoverMenuItem>
        </PopoverMenu>
      </PopoverContent>

      <AccountSettingsDialog
        open={isAccountSettingsDialogOpen}
        setOpen={setIsAccountSettingsDialogOpen}
      />
    </Popover>
  )
}
