'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Browser, Info } from '@phosphor-icons/react'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@rag/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Input } from '@rag/ui/Input'
import { InputChips } from '@rag/ui/InputChips'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Switch } from '@rag/ui/Switch'
import { Tiptap } from '@rag/ui/Tiptap'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { useToast } from '@rag/ui/useToast'
import { useRouter } from 'next/navigation'

import {
  NewPageCheckDialog_CreatePageCheckDocument,
  PageCheckIntervalEnum,
  PageCheckTypeEnum,
  PageChecksList_AllPageChecksDocument,
} from '@gql/graphql'

import { usePageCheckForm } from '@/forms/hooks/usePageCheckForm'
// import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { pageCheckTypeOptions } from '@/utils/pageCheckTypeOptions'

interface INewInterviewDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewPageCheckDialog = ({ open, setOpen }: INewInterviewDialogProps) => {
  const [jobTitleInputValue, setJobTitleInputValue] = useState<string>('')
  const { errorToast } = useToast()
  const router = useRouter()
  //   const upgradePlanDialog = useUpgradePlanDialog()

  const [createPageCheck, { loading: isCreatePageCheckLoading }] = useMutation(
    NewPageCheckDialog_CreatePageCheckDocument,
    {
      refetchQueries: [PageChecksList_AllPageChecksDocument],
    }
  )
  const { isPaidPlan, user } = useCurrentUser()

  const { form } = usePageCheckForm()
  const checkIntervalOptions: Record<PageCheckIntervalEnum, string> = {
    [PageCheckIntervalEnum.Daily]: 'Daily',
    [PageCheckIntervalEnum.Weekly]: 'Weekly',
  }
  const url = form.watch('url')
  const multiplePages = form.watch('multiplePages')
  const pageCheckType = form.watch('pageCheckType')
  const jobDepartmentFilter = form.watch('jobDepartmentFilter')
  const jobLocationFilter = form.watch('jobLocationFilter')
  const prompt = form.watch('prompt')
  const priceDiscrepancyThresholdAmount = form.watch('priceDiscrepancyThresholdAmount')
  const priceMinAllowed = form.watch('priceMinAllowed')
  const checkInterval = form.watch('checkInterval')
  const resultType = form.watch('resultType')
  const keywordFilters = form.watch('keywordFilters')

  const handleCreatePageCheck = async () => {
    try {
      const response = await createPageCheck({
        variables: {
          checkInterval,
          jobDepartmentFilter,
          jobLocationFilter,
          keywordFilters:
            keywordFilters.length > 0
              ? keywordFilters
              : jobTitleInputValue
                ? [jobTitleInputValue]
                : [],
          multiplePages,
          pageCheckType,
          priceDiscrepancyThresholdAmount:
            !priceDiscrepancyThresholdAmount || isNaN(parseFloat(priceDiscrepancyThresholdAmount))
              ? null
              : parseFloat(priceDiscrepancyThresholdAmount),
          priceMinAllowed:
            !priceMinAllowed || isNaN(parseFloat(priceMinAllowed))
              ? null
              : parseFloat(priceMinAllowed),
          prompt,
          resultType,
          url,
        },
      })

      setOpen(false)

      router.replace(`/page-checks/${response?.data?.createPageCheck?.id}`)
    } catch (e) {
      errorToast()
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="max-w-[500px]"
        disableOutsideClose
        title="Create new page check"
        titleIcon={<Browser />}
      >
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleCreatePageCheck)}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="pageCheckType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Page Check Type</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an page check type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(pageCheckTypeOptions).map((option) => (
                          <SelectItem key={option[0]} value={option[0]}>
                            {option[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-4 flex flex-row items-center gap-1">
                      URL
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="text-md" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Make sure your URL begins with "https://"</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-row items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="checkInterval"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Check Interval</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange} {...field}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an page check type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(checkIntervalOptions).map((option) => (
                            <SelectItem key={option[0]} value={option[0]}>
                              {option[1]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {pageCheckType != PageCheckTypeEnum.Price && (
                  <FormField
                    control={form.control}
                    name="multiplePages"
                    render={({ field }) => (
                      <FormItem className="w-1/4 md:flex md:w-full md:flex-col">
                        <FormLabel>Multiple pages?</FormLabel>
                        <FormControl>
                          <Switch
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            value={field?.value?.toString()}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              {pageCheckType == PageCheckTypeEnum.Generic && (
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page check instructions</FormLabel>
                      <FormControl>
                        <Tiptap
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Write instructions for what you want to monitor on the page"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {pageCheckType == PageCheckTypeEnum.JobTitles && (
                <FormField
                  control={form.control}
                  name="keywordFilters"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-4 flex flex-row items-center gap-1">
                        Job Title filters
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-md" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Only job titles that include the filter will be included. Type and
                              press enter to add multiple job title filters
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <InputChips
                          chips={field.value}
                          inputValue={jobTitleInputValue}
                          onChange={field.onChange}
                          placeholder="Type and press enter to add multiple job title filters"
                          setInputValue={setJobTitleInputValue}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {pageCheckType == PageCheckTypeEnum.JobTitles && (
                <FormField
                  control={form.control}
                  name="jobLocationFilter"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-4 flex flex-row items-center gap-1">
                        Job Location filter
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-md" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Only job locations that include the filter will be included. Use comma
                              separated values to add multiple locations
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {pageCheckType == PageCheckTypeEnum.JobTitles && (
                <FormField
                  control={form.control}
                  name="jobDepartmentFilter"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-4 flex flex-row items-center gap-1">
                        Job Department filter
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-md" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Only job departments that include the filter will be included. Use
                              comma separated values to add multiple departments
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {pageCheckType == PageCheckTypeEnum.Price && (
                <FormField
                  control={form.control}
                  name="priceDiscrepancyThresholdAmount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-4 flex flex-row items-center gap-1">
                        Price discrepancy amount allowed
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-md" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              This is the max difference in price before its flagged as a
                              significant change
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} min="0" step="0.01" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {pageCheckType == PageCheckTypeEnum.Price && (
                <FormField
                  control={form.control}
                  name="priceMinAllowed"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-4 flex flex-row items-center gap-1">
                        Price drop amount
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-md" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>When the price drops below this price, you will be alerted</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} min="0" step="0.01" type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex flex-row justify-end gap-2">
              <DialogClose asChild disabled={isCreatePageCheckLoading}>
                <Button size="lg" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={pageCheckType == PageCheckTypeEnum.Generic && prompt == ''}
                loading={isCreatePageCheckLoading}
                size="lg"
                type="submit"
                variant="cta"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
