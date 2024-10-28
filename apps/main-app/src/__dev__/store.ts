import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IDevStore {
  mockingEnabled: boolean
  pdfViewerEnabled: boolean
  setMockingEnabled: (enable: boolean) => void
  setpdfViewerEnabled: (enable: boolean) => void
}

export const useDevStore = create<IDevStore>()(
  persist(
    (set) => ({
      mockingEnabled: false,
      pdfViewerEnabled: false,
      setMockingEnabled: (enable) => set({ mockingEnabled: enable }),
      setpdfViewerEnabled: (enable) => set({ pdfViewerEnabled: enable }),
    }),
    {
      name: 'dev-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
