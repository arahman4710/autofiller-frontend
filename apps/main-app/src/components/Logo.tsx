'use client'

import { CanyonAdvisoryLogoFull, CanyonLogoFull, CanyonLogoProFull } from '@canyon/ui/CanyonLogo'

import { useCurrentUser } from '@/hooks/useCurrentUser'

export const Logo = () => {
  const { isAdvisoryOrgAccount, isPaidPlan } = useCurrentUser()

  if (isAdvisoryOrgAccount) {
    return <CanyonAdvisoryLogoFull />
  }

  return isPaidPlan ? <CanyonLogoProFull /> : <CanyonLogoFull />
}
