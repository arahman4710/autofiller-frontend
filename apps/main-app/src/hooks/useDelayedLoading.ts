import { useEffect, useState } from 'react'

export const useDelayedLoading = (actualLoading: boolean, minDuration: number = 1000) => {
  const [delayedLoading, setDelayedLoading] = useState(false)

  useEffect(() => {
    if (actualLoading) {
      setDelayedLoading(true)
    }

    if (!actualLoading && delayedLoading) {
      const timer = setTimeout(() => {
        setDelayedLoading(false)
      }, minDuration)

      return () => clearTimeout(timer)
    }
  }, [actualLoading, delayedLoading, minDuration])

  return delayedLoading
}
