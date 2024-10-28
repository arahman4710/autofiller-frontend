'use client'

import { Button } from '@canyon/ui/Button'
import { DateRangePicker } from '@canyon/ui/DateRangePicker'
import { Input } from '@canyon/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@canyon/ui/Select'
import { Toolbar } from '@canyon/ui/Toolbar'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import debounce from 'debounce'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'

export const AdvisorsToolbar = () => {
  const { queryParams, setQueryParams } = useQueryParams<{
    endDate?: string
    role?: string
    search?: string
    startDate?: string
  }>()
  const { isAdvisorAdmin } = useCurrentUser()

  const searchQueryParam = queryParams?.get('search') ?? ''
  const roleQueryParam = queryParams?.get('role') ?? ''
  const startDateQueryParam = queryParams?.get('startDate')
  const endDateQueryParam = queryParams?.get('endDate')

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
      <div className="flex items-center gap-2">
        <div className="flex w-[200px] py-4">
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
        <div className="w-[200px]">
          <Select
            defaultValue=""
            onValueChange={(role) => setQueryParams({ role })}
            value={roleQueryParam}
          >
            <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="advisor">Advisor</SelectItem>
              <SelectItem value="accountManager">Account Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(startDate || endDate || roleQueryParam) && (
          <Button
            className="gap-1 font-normal text-red-500 hover:text-red-500"
            onClick={() =>
              setQueryParams({ endDate: undefined, role: undefined, startDate: undefined })
            }
            variant="ghost"
          >
            <X />
            Clear Filters
          </Button>
        )}
      </div>
    </Toolbar>
  )
}
