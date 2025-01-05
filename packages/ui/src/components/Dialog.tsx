'use client'

import { createContext, forwardRef, useContext } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { cn } from '../utils'
import { IconText } from './IconText'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'backdrop-blur-xs bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50',
      className
    )}
    ref={ref}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface IDialogScreenProviderProps {
  children: React.ReactNode
  currentScreenIndex: number
}

const DialogScreenContext = createContext<{
  screenIndex: number
}>({
  screenIndex: 0,
})

const DialogScreenProvider = ({ children, currentScreenIndex }: IDialogScreenProviderProps) => {
  return (
    <DialogScreenContext.Provider
      value={{
        screenIndex: currentScreenIndex,
      }}
    >
      {children}
    </DialogScreenContext.Provider>
  )
}

const useDialogScreen = () => {
  const context = useContext(DialogScreenContext)

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return context
}

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  {
    disableOutsideClose?: boolean
    subtitle?: string
    title?: string
    titleIcon?: React.ReactNode
  } & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, disableOutsideClose, subtitle, title, titleIcon, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'shadow- bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-[960px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[14px] p-0.5 duration-200 md:w-full',
          className
        )}
        onPointerDownOutside={(e) => disableOutsideClose && e.preventDefault()}
        ref={ref}
        {...props}
      >
        <div className="border-border-muted rounded-[13px] border">
          <DialogHeader>
            <div className="flex flex-col">
              <DialogTitle asChild>
                <IconText leftIcon={titleIcon}>
                  <div className="text-sm">{title}</div>
                </IconText>
              </DialogTitle>
              <DialogDescription>{subtitle}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="h-[calc(100%-32.5px)] p-[16px] has-[.dialog-footer]:pb-0">{children}</div>
          <DialogPrimitive.Close
            autoFocus={false}
            className="focus:ring-ring ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-5 top-3.5 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <Cross2Icon className="h-3 w-3" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogScreen = ({
  children,
  screenNumber,
}: {
  children: React.ReactNode
  screenNumber: number
}) => {
  const dialogContext = useDialogScreen()
  const screenIndex = dialogContext.screenIndex

  return screenIndex === screenNumber ? children : null
}

const DialogHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'border-border-muted relative sticky flex w-full flex-row items-center justify-between space-y-1.5 border-b px-4 py-2.5 text-center sm:text-left',
      className
    )}
    {...props}
  >
    {children}
  </div>
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'border-border-muted dialog-footer -mx-[16px] mt-8 flex h-[48px] max-h-[48px] flex-row items-center justify-end space-x-2 rounded-bl-[14px] rounded-br-[14px] border-t px-4',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn('leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogScreen,
  DialogScreenContext,
  DialogScreenProvider,
  DialogTrigger,
}
