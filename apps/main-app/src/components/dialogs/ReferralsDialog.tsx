'use client'

import { Dialog, DialogContent } from '@canyon/ui/Dialog'
import { Progress, ProgressIndicator } from '@canyon/ui/Progress'
import {
  VerticalGroup,
  VerticalGroupColumn,
  VerticalGroupDescription,
  VerticalGroupTitle,
} from '@canyon/ui/VerticalGroup'
import { Copy, HandCoins, XLogo } from '@phosphor-icons/react'

import { LinkedInLogo } from '@/components/assets/LinkedInLogo'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface IReferralsDialogProps {
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}

export const ReferralsDialog = ({ isDialogOpen, setIsDialogOpen }: IReferralsDialogProps) => {
  const { copyToClipboard } = useCopyToClipboard()
  const { user } = useCurrentUser()
  const referralUrl = `https://app.usecanyon.com/auth/signup?referral_code=${user?.uniqueId}`
  const linkedinReferralUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${referralUrl}`
  const twitterReferralUrl = `https://twitter.com/intent/tweet?text=Canyon's%20all-in-one%20platform%20helps%20you%20perfect%20your%20resume,%20apply%20to%20more%20jobs,%20and%20ace%20your%20interview.%0A%0ACheck%20out%20Canyon%20using%20my%20invite%20link%3A%20${referralUrl}`
  const referralTokens = user?.referralTokens
  const progress = referralTokens ? Math.min(referralTokens * 20, 100) : 0

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogContent className="max-w-[700px]" title="Refer a Friend" titleIcon={<HandCoins />}>
        <div className="max-h-[600px] overflow-y-auto pb-[24px]">
          <VerticalGroup className="gap-5">
            <VerticalGroupColumn>
              <VerticalGroupTitle>How it works</VerticalGroupTitle>
              <VerticalGroupDescription>
                <div>Get a free month of Canyon Pro for every 5 points you earn.</div>
                <br />
                <div>
                  Earn 1 point for every user you refer that adds a resume and 5 points if they
                  upgrade to Canyon Pro.
                </div>
              </VerticalGroupDescription>
            </VerticalGroupColumn>
            <VerticalGroupColumn className="gap-4">
              <Progress value={progress}>
                <ProgressIndicator style={{ transform: `translateX(-${100 - progress}%)` }} />
              </Progress>
              <VerticalGroupTitle>Progress to Free Month of Canyon Pro: </VerticalGroupTitle>
              <div className="flex items-center gap-2">
                <span>{`${referralTokens} / 5`}</span>
              </div>
            </VerticalGroupColumn>
            <div className="border-border-muted border-b"></div>
            <VerticalGroupColumn>
              <VerticalGroupTitle>Sharing</VerticalGroupTitle>
              <div className="text-muted-foreground text-[12px]">Your link</div>
              <div className="flex items-center gap-3">
                <div className="bg-background-contrast w-[550px] p-2 text-[11px]">
                  {referralUrl}
                </div>
                <Copy
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(referralUrl)}
                  size={24}
                />
                <LinkedInLogo
                  className="cursor-pointer"
                  onClick={() => window.open(linkedinReferralUrl, '_blank')}
                />
                <XLogo
                  className="cursor-pointer"
                  onClick={() => window.open(twitterReferralUrl, '_blank')}
                  size={24}
                />
              </div>
            </VerticalGroupColumn>
          </VerticalGroup>
        </div>
      </DialogContent>
    </Dialog>
  )
}
