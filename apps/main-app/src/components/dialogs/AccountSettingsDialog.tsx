import type { TAlertVariant } from '@rag/ui/Alert'

import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Alert, AlertDescription, AlertTitle } from '@rag/ui/Alert'
import { Avatar, AvatarFallback } from '@rag/ui/Avatar'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogContent, DialogScreen, DialogScreenProvider } from '@rag/ui/Dialog'
import { IconText } from '@rag/ui/IconText'
import { Separator } from '@rag/ui/Separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { useToast } from '@rag/ui/useToast'
import { cn } from '@rag/ui/utils'
import { Gear, User, Wallet } from '@phosphor-icons/react'

import {
  AccountSettingsDialog_UpdateUserDocument,
  AccountSettingsDialog_UserDocument,
  UseCurrentUser_UsersDocument,
} from '@gql/graphql'

import { AdvisoryBadge } from '@/components/AdvisoryBadge'
import { ProBadge } from '@/components/ProBadge'
import { SupportLink } from '@/components/SupportLink'
import { UserForm } from '@/forms/UserForm'
import { useUserForm } from '@/forms/hooks/useUserForm'
import { useUserFormReset } from '@/forms/hooks/useUserFormReset'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
// import { useBillingPlan } from '@/hooks/useBillingPlan'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useDelayedLoading } from '@/hooks/useDelayedLoading'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'

interface IAccountSettingsDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const AccountSettingsDialog = ({ open, setOpen }: IAccountSettingsDialogProps) => {
  const { user } = useCurrentUser()

  const [currentScreen, setCurrentScreen] = useState(0)

  const menuItems = [
    { icon: <User />, label: 'Profile' },
    // { icon: <Wallet />, label: 'Billing' },
  ]

  useEffect(() => {
    if (!open) {
      setCurrentScreen(0)
    }
  }, [open])

  return (
    <DialogScreenProvider currentScreenIndex={currentScreen}>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent
          className="h-[700px] max-w-[805px] p-0"
          title="Account Settings"
          titleIcon={<Gear />}
        >
          <div className="flex h-full flex-row">
            <div className="border-border-muted h-full w-1/4 border-r pr-4">
              <div className="flex flex-col justify-center gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback gradientHashSource={user?.email} />
                </Avatar>
                <div className="flex select-none flex-col justify-center text-sm">
                  <div className="overflow-hidden">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-muted-foreground overflow-hidden">
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
                        <span>{user?.email}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>{user?.email}</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-3">
                {menuItems.map(({ icon, label }, index) => (
                  <div
                    className={cn(
                      'hover:bg-accent/70 mt-2 cursor-pointer rounded-md px-3 py-2 text-sm',
                      currentScreen === index && 'bg-accent/20'
                    )}
                    key={label}
                    onClick={() => setCurrentScreen(index)}
                    role="menu"
                  >
                    <IconText className="text-sm" leftIcon={icon} role="menuitem">
                      {label}
                    </IconText>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full w-full overflow-y-auto px-10">
              <DialogScreen screenNumber={0}>
                <ProfileSettings />
              </DialogScreen>
              <DialogScreen screenNumber={1}>
                <BillingSettings />
              </DialogScreen>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DialogScreenProvider>
  )
}

const SettingHeader = ({
  alert,
  subtitle,
  title,
}: {
  alert?: {
    description?: string
    title?: string
    variant?: TAlertVariant['variant']
  }
  subtitle?: string
  title: string
}) => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-muted-foreground text-sm">{subtitle}</div>
      {alert && (
        <Alert className="my-3" variant={alert.variant}>
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.description && <AlertDescription>{alert.description}</AlertDescription>}
        </Alert>
      )}
      <Separator className="mt-3" />
    </div>
  )
}

const SettingContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-8 h-full">{children}</div>
}

const ProfileSettings = () => {
  const { errorToast } = useToast()
  const { isAdvisor, isAdvisorAdmin } = useCurrentUser()

  const { data, loading } = useQuery(AccountSettingsDialog_UserDocument)
  const [updateUser, { loading: updateUserLoading }] = useMutation(
    AccountSettingsDialog_UpdateUserDocument,
    { refetchQueries: [UseCurrentUser_UsersDocument] }
  )

  const user = data?.user

  const { form } = useUserForm()

  useUserFormReset({ form, user })

  const handleOnSubmit = async () => {
    const formValues = form.getValues()

    try {
      const { data } = await updateUser({
        variables: {
          attributes: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
          },
        },
      })
    } catch (e) {
      console.error(e)

      errorToast()
    }
  }

  useFormAutoSave({
    defaultValues: user,
    form,
    onSubmit: handleOnSubmit,
  })

  const isUpdating = useDelayedLoading(updateUserLoading)

  return (
    <div>
      <SettingHeader
        subtitle="Manage your personal details"
        title="Profile"
      />
      <SettingContent>
        <UserForm form={form} onSubmit={handleOnSubmit} />
        {isUpdating && (
          <div className="my-3 flex justify-end">
            <span className="text-muted-foreground text-sm">Saving...</span>
          </div>
        )}
      </SettingContent>
    </div>
  )
}

const BillingSettings = () => {
  const { isPaidPlan } = useCurrentUser()

  return (
    <div>
      <SettingHeader subtitle="Manage your billing details" title="Billing" />
      <SettingContent>
        <div className="flex flex-col justify-between">
          <BillingPlan plan={isPaidPlan ? 'pro' : 'free'} />
          <div className="text-muted-foreground mt-5 text-sm">
            Questions? Contact <SupportLink />.
          </div>
        </div>
      </SettingContent>
    </div>
  )
}

const BillingPlan = ({ plan }: { plan: 'advisory' | 'free' | 'pro' }) => {
  // const { manageSubscription } = useBillingPlan()
  const upgradePlanDialog = useUpgradePlanDialog()

  const isAdvisor = plan === 'advisory'
  const isPro = plan === 'pro'
  const isFree = plan === 'free'

  // const actionButton = isFree ? (
  //   <Button onClick={() => upgradePlanDialog.setOpen(true)} variant="cta">
  //     Upgrade Plan
  //   </Button>
  // ) : isPro && !isLifetimePaidUser ? (
  //   <Button onClick={() => manageSubscription()}>Manage Subscription</Button>
  // ) : null

  const tierBadge = isAdvisor ? (
    <AdvisoryBadge className="text-md" />
  ) : isPro ? (
    <ProBadge className="text-md" />
  ) : (
    <span className="text-md">Free</span>
  )

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="font-medium">Current Plan</div>
      <div className="border-border-secondary bg-background-secondary flex rounded-lg border p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            {tierBadge}{' '}
          </div>
          {/* {actionButton} */}
        </div>
      </div>
    </div>
  )
}
