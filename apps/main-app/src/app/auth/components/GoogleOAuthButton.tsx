'use client'

import { useState } from 'react'

import { Button } from '@canyon/ui/Button'
import { IconText } from '@canyon/ui/IconText'
import { objectToQueryString } from '@canyon/utils'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { GoogleLogo } from '@/components/assets/GoogleLogo'

interface IGoogleOAuthButtonProps {
  type: 'signin' | 'signup'
}

export const GoogleOAuthButton = ({ type }: IGoogleOAuthButtonProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const referral_code = searchParams?.get('referral_code')
  if (referral_code) {
    // 3 days
    document.cookie = `referral-code=${referral_code}; SameSite=None; path=/; max-age=259200; Secure`
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    signIn('google', {
      callbackUrl: searchParams
        ? `${window.location.origin}?${objectToQueryString(searchParams)}`
        : window.location.origin,
    })
  }

  const text = 'Continue with Google'

  return (
    <Button
      className="h-[40px] w-full"
      disabled={isGoogleLoading}
      loading={isGoogleLoading}
      onClick={handleGoogleSignIn}
      size="lg"
      variant="outline"
    >
      <IconText leftIcon={<GoogleLogo className="h-6 w-6" />}>{text}</IconText>
    </Button>
  )
}
