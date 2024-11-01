'use client'

import { CanyonLogoFull, CanyonLogoProFull } from '@rag/ui/CanyonLogo'

import { useCurrentUser } from '@/hooks/useCurrentUser'

export const Logo = () => {
  const { isAdvisoryOrgAccount, isPaidPlan } = useCurrentUser()

  return (
    <div>
      RetailMind
    </div>)

  // return isPaidPlan ? <CanyonLogoProFull /> : <CanyonLogoFull />
}
