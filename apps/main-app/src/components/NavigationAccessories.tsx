'use client'

import { Hammer, PuzzlePiece } from '@phosphor-icons/react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@rag/ui/Drawer'
import { IconText } from '@rag/ui/IconText'

import { Devtool } from '@/__dev__/Devtool'
import { ProfileButton } from '@/components/ProfileButton'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const NavigationAccessories = ({}) => {
  const { user } = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <Drawer>
          <DrawerTrigger>
            <AccessoryItem>
              <IconText leftIcon={<Hammer />}>Devtool</IconText>
            </AccessoryItem>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Devtool</DrawerTitle>
                <DrawerDescription>Enable or disable development features.</DrawerDescription>
              </DrawerHeader>
              <Devtool />
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <div className="mt-3">
        <ProfileButton />
      </div>
    </div>
  )
}

const AccessoryItem = ({ children }: { children: React.ReactNode }) => (
  <div className="text-text-muted hover:text-text/90 flex w-full cursor-pointer items-center rounded-lg px-3 py-2 *:w-full">
    {children}
  </div>
)
