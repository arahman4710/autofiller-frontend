'use client'

import { CheckCircle } from '@phosphor-icons/react'

export default function AuthExtensionSuccessPage() {
  return (
    <div className="flex gap-3">
      <CheckCircle className="h-8 w-8 text-green-500" weight="fill" />
      <div>
        <h1>Account successfully linked!</h1>
        <p className="text-muted-foreground">This window will automatically close.</p>
      </div>
    </div>
  )
}
