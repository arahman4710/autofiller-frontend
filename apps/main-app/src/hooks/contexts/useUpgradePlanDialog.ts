import { useContext } from 'react'

import { GlobalDialogsContext } from '@/app/provider/GlobalDialogsProvider'

export const useUpgradePlanDialog = () => {
  const context = useContext(GlobalDialogsContext)

  if (!context) {
    throw new Error('useUpgradePlanDialog must be used within a GlobalDialogsProvider')
  }

  return context.upgradePlanDialog
}
