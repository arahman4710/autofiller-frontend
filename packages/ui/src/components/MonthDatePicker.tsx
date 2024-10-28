'use client'

import { Calendar as CalendarIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'

import { cn } from '../utils'
import { Button } from './Button'
import { CalendarMonthYear, ICalendarMonthYearOptions } from './CalendarMonthYear'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

interface IMonthDatePickerProps {
  calendarProps?: ICalendarMonthYearOptions
  date?: Date
  disabled?: boolean
  setDate: (date: Date) => void
}

export function MonthDatePicker({
  calendarProps,
  date = new Date(),
  disabled,
  setDate,
}: IMonthDatePickerProps) {
  if (typeof date === 'string') {
    // convert datetime string to Date object and truncate the timezone
    // @ts-ignore
    date = new Date(date.replace('Z', ''))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'h-9 w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
          variant={'outline'}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'LLL, yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarMonthYear {...calendarProps} selected={date} setSelected={setDate} />
      </PopoverContent>
    </Popover>
  )
}
