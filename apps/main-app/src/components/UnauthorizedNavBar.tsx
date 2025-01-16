'use client'

import { Button } from '@autofiller/ui/Button'
import { Toolbar } from '@autofiller/ui/Toolbar'
import Link from 'next/link'

import { Logo } from '@/components/assets/Logo'
import { trackEvent } from '@/lib/utils/analytics'

export const UnauthorizedNavBar = () => {
  return (
    <Toolbar borderBottom={false} className="p-10">
      <Logo />
      <div className="flex flex-row gap-4">
        <Link href="/auth/signin">
          <Button onClick={() => trackEvent('User clicked Sign in button')} variant="outline">
            Sign in
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button onClick={() => trackEvent('User clicked Sign up button')} variant="cta">
            Sign up
          </Button>
        </Link>
      </div>
    </Toolbar>
  )
}
