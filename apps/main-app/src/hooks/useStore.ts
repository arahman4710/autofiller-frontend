import { useEffect, useState } from 'react'

// This wrapper hook should be used for zustand stores that utilize middleware for storage (e.g. session storage).
// example: useStore(useBearStore((state) => state.bears)
export const useStore = <T, TF>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => TF
) => {
  const result = store(callback) as TF
  const [data, setData] = useState<TF>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
