import { Fragment, createContext, useState } from 'react'

import { UpgradePlanDialog } from '@/components/dialogs/UpgradePlanDialog'

type TGlobalDialogsContextType = {
  upgradePlanDialog: {
    isOpen: boolean
    setOpen: (open: boolean) => void
  }
}

export const GlobalDialogsContext = createContext<TGlobalDialogsContextType | undefined>(undefined)

/* WARNING: Be mindful of what dialogs are put here since they are global */
export const GlobalDialogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpgradePlanDialogOpen, setUpgradePlanDialogOpen] = useState(false)

  const value = {
    upgradePlanDialog: {
      isOpen: isUpgradePlanDialogOpen,
      setOpen: setUpgradePlanDialogOpen,
    },
  }

  const GlobalDialogs = () => (
    <Fragment>
      <UpgradePlanDialog open={isUpgradePlanDialogOpen} setOpen={setUpgradePlanDialogOpen} />
    </Fragment>
  )

  return (
    <GlobalDialogsContext.Provider value={value}>
      {children}
      <GlobalDialogs />
    </GlobalDialogsContext.Provider>
  )
}
