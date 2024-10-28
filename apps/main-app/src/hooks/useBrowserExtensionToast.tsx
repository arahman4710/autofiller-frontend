'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { useToast } from '@rag/ui/useToast'
import Link from 'next/link'

import { UseBrowserExtensionToast_UserDocument } from '@gql/graphql'

import { AppIcon } from '@/components/AppIcon'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { trackEvent } from '@/lib/utils/analytics'
import { useAppConfigStore } from '@/store/appConfigStore'

const TOAST_ID = 'browser-extension'

export const useBrowserExtensionToast = () => {
  const { toast } = useToast()
  const { user } = useCurrentUser()
  const { data } = useQuery(UseBrowserExtensionToast_UserDocument)
  const hideBrowserExtensionToast = useAppConfigStore((state) => state.hideBrowserExtensionToast)
  const setHideBrowserExtensionToast = useAppConfigStore(
    (state) => state.setHideBrowserExtensionToast
  )

  const [hasRendered, setHasRendered] = useState<boolean>(false)

  const usedChromeExtension = data?.user?.usedChromeExtension
  const showToast =
    user && !hasRendered && !hideBrowserExtensionToast && usedChromeExtension !== true

  useEffect(() => {
    let timeout

    if (showToast) {
      timeout = setTimeout(() => {
        toast({
          description:
            'Download the Canyon browser extension to quickly add and track job applications.',
          leftComponent: <AppIcon />,
          link: (
            <Link
              href="https://chromewebstore.google.com/detail/rag-track-apply-to-job/npekhmlmillbfcbohangleomoblkckih"
              target="_blank"
            >
              <Button
                onClick={() => trackEvent('User clicked browser extension link')}
                variant="link"
              >
                Download for Chrome ›
              </Button>
            </Link>
          ),
          onClose: () => setHideBrowserExtensionToast(true),
          persist: true,
          title: 'Canyon Browser Extension',
          toastId: TOAST_ID,
        })
      }, 4500)

      setHasRendered(true)
    }

    return () => clearTimeout(timeout)
  }, [usedChromeExtension])
}
