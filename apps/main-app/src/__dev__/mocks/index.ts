'use client'
import { useDevStore } from '@/__dev__/store'

export const initMocks = async () => {
  const { mockingEnabled } = useDevStore.getState()

  if (process.env.NODE_ENV === 'development' && mockingEnabled) {
    if (typeof window === 'undefined') {
      const { server } = await import('./server')
      server.listen()
    } else {
      const { worker } = await import('./browser')
      worker.start()
    }
  }
}
