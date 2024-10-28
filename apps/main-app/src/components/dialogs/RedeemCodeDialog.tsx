'use client'

import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { Dialog, DialogContent, DialogFooter } from '@canyon/ui/Dialog'
import { Input } from '@canyon/ui/Input'
import { Label } from '@canyon/ui/Label'
import { Wallet } from '@phosphor-icons/react'

import {
  RedeemCodeDialog_SubscriptionsRedeemLtdPromoCodeDocument,
  SubscriptionPlanEnum,
  UseCurrentUser_UsersDocument,
} from '@gql/graphql'

import { useConfetti } from '@/hooks/useConfetti'

interface IRedeemCodeDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const RedeemCodeDialog = ({ open, setOpen }: IRedeemCodeDialogProps) => {
  const { cannon } = useConfetti()
  const [redemptionCode, setRedemptionCode] = useState<string>('')
  const [hasRedemptionCodeError, setHasRedemptionCodeError] = useState<boolean>(false)

  const [redeemCode, { loading: isRedeemCodeLoading }] = useMutation(
    RedeemCodeDialog_SubscriptionsRedeemLtdPromoCodeDocument,
    {
      refetchQueries: [UseCurrentUser_UsersDocument],
      variables: {
        promoCode: redemptionCode,
      },
    }
  )

  const resetRedemptionCode = () => {
    setRedemptionCode('')
    setHasRedemptionCodeError(false)
  }

  const handleRedeemPromoCode = async () => {
    const { data } = await redeemCode()
    const response = data?.subscriptionsRedeemLtdPromoCode

    if (response?.plan === SubscriptionPlanEnum.Free) {
      setHasRedemptionCodeError(true)

      return
    }

    cannon({ particleCount: 200, spread: 180 })
    resetRedemptionCode()
    setOpen(false)
  }

  const handleRedemptionCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasRedemptionCodeError) {
      setHasRedemptionCodeError(false)
    }

    setRedemptionCode(e.target.value.toUpperCase())
  }

  useEffect(() => {
    if (!open) {
      resetRedemptionCode()
    }
  }, [open])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent title="Redeem Code" titleIcon={<Wallet />}>
        <div className="flex flex-col gap-3 px-3">
          <Label>Lifetime Code</Label>
          <Input
            id="redemptionCode"
            name="redemptionCode"
            onChange={handleRedemptionCodeChange}
            placeholder="Enter lifetime redemption code"
            value={redemptionCode}
          />
          {hasRedemptionCodeError && (
            <span className="text-destructive text-sm">Invalid code.</span>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={!redemptionCode || hasRedemptionCodeError}
            loading={isRedeemCodeLoading}
            onClick={handleRedeemPromoCode}
            variant="cta"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
