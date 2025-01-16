import { CheckCircle, Info, XCircle } from '@phosphor-icons/react'
import { Label } from '@autofiller/ui/Label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@autofiller/ui/Sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@autofiller/ui/Tooltip'

import { PageCheck_GetPageCheckQuery, PageCheckIntervalEnum } from '@gql/graphql'

import { pageCheckTypeOptions } from '@/utils/pageCheckTypeOptions'

const pageCheckIntervalToTooltip = {
  [PageCheckIntervalEnum.Daily]: 'This check runs daily at 2:00 PM EST',
  [PageCheckIntervalEnum.Weekly]: 'This check runs weekly on Monday at 5:00 PM EST',
}

interface IPageCheckSheetProps {
  onOpenChange: (open: boolean) => void
  open: boolean
  pageCheck?: PageCheck_GetPageCheckQuery['pageChecks'][0]
}
export const PageCheckSheet = ({ onOpenChange, open, pageCheck }: IPageCheckSheetProps) => {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-blue-300">Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Url</Label>
            <span>{pageCheck?.pageUrl}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Page Check Type </Label>
            <span>{pageCheckTypeOptions[pageCheck?.pageCheckType || '']}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Check interval</Label>
            <span className="flex flex-row items-center gap-1">
              {pageCheck?.checkInterval?.toLowerCase()}
              {pageCheckIntervalToTooltip[pageCheck?.checkInterval || ''] && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-md" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{pageCheckIntervalToTooltip[pageCheck?.checkInterval || '']}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
          </div>
          {pageCheck?.keywordFilters && pageCheck?.keywordFilters.length > 0 && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Keyword Filters</Label>
              <span>{pageCheck?.keywordFilters.join(', ')}</span>
            </div>
          )}
          {pageCheck?.jobDepartmentFilter && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Job Department Filter</Label>
              <span>{pageCheck?.jobDepartmentFilter}</span>
            </div>
          )}
          {pageCheck?.jobLocationFilter && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Job Location Filter</Label>
              <span>{pageCheck?.jobLocationFilter}</span>
            </div>
          )}
          {pageCheck?.multiplePages && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Multiple pages?</Label>
              <span>{pageCheck?.multiplePages ? <CheckCircle /> : <XCircle />}</span>
            </div>
          )}
          {pageCheck?.priceMinAllowed && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Price drop Amount</Label>
              <span>{pageCheck?.priceMinAllowed}</span>
            </div>
          )}
          {pageCheck?.priceDiscrepancyThresholdAmount && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Price Discrepancy Amount Allowed</Label>
              <span>{pageCheck?.priceDiscrepancyThresholdAmount}</span>
            </div>
          )}
          {pageCheck?.prompt && (
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Page check instructions</Label>
              <span>{pageCheck?.prompt}</span>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
