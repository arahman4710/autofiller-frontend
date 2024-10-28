import { useCallback, useEffect, useState } from 'react'

import debounce from 'debounce'
import { UseFormReturn, useWatch } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'

interface IUseAutoSaveProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues: any
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  onSubmit: () => void
}

export const useFormAutoSave = ({ defaultValues, disabled, form, onSubmit }: IUseAutoSaveProps) => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasErrored, setHasErrored] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedSave = useCallback(
    debounce(async () => {
      try {
        setIsSubmitting(true)
        await onSubmit()
        setHasSubmitted(true)
      } catch {
        setHasErrored(true)
      } finally {
        setIsSubmitting(false)
      }
    }, 1000),
    []
  )

  // Watch all the data, provide with defaultValues from server, this way we know if the new data came from server or was actually edited by user
  const watchedData = useWatch({
    control: form.control,
    defaultValue: defaultValues,
  })

  useDeepCompareEffect(() => {
    if (!disabled && form.formState.isDirty) {
      debouncedSave()
    }
  }, [watchedData])

  return {
    hasErrored,
    hasSubmitted,
    isSubmitting,
  }
}
