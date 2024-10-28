import { create } from 'zustand'

interface IInterviewStore {
  enableVoice: boolean
  setEnableVoice: (enable: boolean) => void
}

export const useInterviewStore = create<IInterviewStore>((set) => ({
  enableVoice: false,
  setEnableVoice: (enable) => set({ enableVoice: enable }),
}))
