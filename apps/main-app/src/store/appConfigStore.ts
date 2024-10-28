import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { UsersJobsStatusEnum } from '@gql/graphql'

interface IAppConfigStore {
  hiddenApplicationStatusColumns: UsersJobsStatusEnum[]
  hideApplicationStatusColumns: (columns: UsersJobsStatusEnum[]) => void
  hideBrowserExtensionToast: boolean
  setHideBrowserExtensionToast: (hide: boolean) => void
  showApplicationStatusColumns: (columns: UsersJobsStatusEnum[]) => void
}

export const useAppConfigStore = create<IAppConfigStore>()(
  persist(
    (set, get) => ({
      hiddenApplicationStatusColumns: [],
      hideApplicationStatusColumns: (columns) =>
        set((state) => ({
          hiddenApplicationStatusColumns: [...state.hiddenApplicationStatusColumns, ...columns],
        })),
      hideBrowserExtensionToast: false,
      setHideBrowserExtensionToast: (hide) => set({ hideBrowserExtensionToast: hide }),
      showApplicationStatusColumns: (columns) =>
        set((state) => ({
          hiddenApplicationStatusColumns: state.hiddenApplicationStatusColumns.filter(
            (column) => !columns.includes(column)
          ),
        })),
    }),
    {
      name: 'app-config',
    }
  )
)
