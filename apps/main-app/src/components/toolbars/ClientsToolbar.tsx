'use client'

import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Combobox } from '@rag/ui/Combobox'
import { DateRangePicker } from '@rag/ui/DateRangePicker'
import { Input } from '@rag/ui/Input'
import { Toolbar } from '@rag/ui/Toolbar'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import debounce from 'debounce'

import { ClientsToolbar_AdvisorsDocument } from '@gql/graphql'

import { CreateClientGroupDialog } from '@/components/dialogs/CreateClientGroupDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'

export const ClientsToolbar = () => {
  const { queryParams, setQueryParams } = useQueryParams<{
    advisorId?: string
    endDate?: string
    search?: string
    startDate?: string
  }>()
  const [openCreateClientGroupDialog, setOpenCreateClientGroupDialog] = useState(false)
  const { isAdvisorAdmin } = useCurrentUser()

  const searchQueryParam = queryParams?.get('search') ?? ''
  const startDateQueryParam = queryParams?.get('startDate')
  const endDateQueryParam = queryParams?.get('endDate')
  const advisorIdQueryParam = queryParams?.get('advisorId') || ''

  const { data: advisorData } = useQuery(ClientsToolbar_AdvisorsDocument)
  const advisors = advisorData?.advisors?.data
  const advisorsList = advisors?.map((advisor) => {
    return {
      label: `${advisor.user.firstName} ${advisor.user.lastName}`,
      value: advisor.id,
    }
  })

  let startDate
  if (startDateQueryParam) {
    startDate = new Date(startDateQueryParam)
  }
  let endDate
  if (endDateQueryParam) {
    endDate = new Date(endDateQueryParam)
  }

  return (
    <Toolbar>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex w-[220px] py-4">
            <Input
              className="max-w-sm"
              defaultValue={searchQueryParam}
              onChange={(e) => {
                debounce(() => {
                  setQueryParams({ search: e.target.value })
                }, 500)()
              }}
              placeholder="Search"
              startSlot={<MagnifyingGlass className="text-muted-foreground" />}
            />
          </div>
          <DateRangePicker
            date={{
              from: startDate,
              to: endDate,
            }}
            placeholderText="Choose a date range"
            setDate={(dateRange) =>
              setQueryParams({
                endDate: dateRange?.to?.toDateString(),
                startDate: dateRange?.from?.toDateString(),
              })
            }
          />
          {isAdvisorAdmin && (
            <Combobox
              onValueChange={(value) => setQueryParams({ advisorId: value })}
              options={advisorsList || []}
              searchPlaceholder="Select an advisor"
              selectPlaceholder="Select an advisor"
              value={advisorIdQueryParam}
            />
          )}
          {(startDate || endDate || advisorIdQueryParam) && (
            <Button
              className="gap-1 font-normal text-red-500 hover:text-red-500"
              onClick={() =>
                setQueryParams({ advisorId: undefined, endDate: undefined, startDate: undefined })
              }
              variant="ghost"
            >
              <X />
              Clear Filters
            </Button>
          )}
        </div>
        <div>
          <Button onClick={() => setOpenCreateClientGroupDialog(true)} variant="cta">
            Create Client Group
          </Button>
        </div>
      </div>
      <CreateClientGroupDialog
        open={openCreateClientGroupDialog}
        setOpen={setOpenCreateClientGroupDialog}
      />
    </Toolbar>
  )
}
