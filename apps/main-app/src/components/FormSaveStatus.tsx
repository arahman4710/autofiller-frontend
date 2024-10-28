import { useEffect, useState } from 'react'

import { CheckCircle, SpinnerGap, XCircle } from '@phosphor-icons/react'

interface IFormSaveStatusProps {
  hasErrored: boolean
  hasSaved: boolean
  isSaving: boolean
  size?: number
}

export const FormSaveStatus = ({
  hasErrored,
  hasSaved,
  isSaving,
  size = 16,
}: IFormSaveStatusProps) => {
  const [showSaving, setShowSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showErrored, setShowErrored] = useState(false)

  useEffect(() => {
    if (isSaving) {
      setShowSaving(true)
    } else {
      const timer = setTimeout(() => {
        setShowSaving(false)

        if (hasSaved) {
          setShowSaved(true)
        }

        if (hasErrored) {
          setShowErrored(true)
        }
      }, 1000) // Ensure isSaving is shown for at least 1 second
      return () => clearTimeout(timer)
    }
  }, [isSaving])

  useEffect(() => {
    if (showSaved || showErrored) {
      const timer = setTimeout(() => {
        setShowSaved(false)
        setShowErrored(false)
      }, 650)
      return () => clearTimeout(timer)
    }
  }, [showSaved, showErrored])

  return (
    <div>
      {showSaving && <SpinnerGap className="text-text animate-spin" size={size} />}
      {showSaved && <CheckCircle className="text-green-400" size={size} />}
      {showErrored && <XCircle className="text-red-4000" size={size} />}
    </div>
  )
}
