'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast'
import { useToast } from './useToast'

export function Toaster() {
  const { dismiss, toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({
        action,
        description,
        id,
        leftComponent,
        link,
        onClose,
        persist,
        secondaryLink,
        title,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-row justify-center gap-3">
              {leftComponent}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
                <div className="flex w-full flex-row justify-between">
                  {link}
                  {secondaryLink}
                </div>
              </div>
              {action}
              <ToastClose
                className="block"
                onClick={() => {
                  if (persist) {
                    dismiss(id)
                  }

                  if (onClose) {
                    onClose()
                  }
                }}
              />
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
