'use client'

import { Calendar as CalendarIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'

import { cn } from '../utils'
import { Button } from './Button'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

interface IDatePickerProps {
  calendarProps?: React.ComponentProps<typeof Calendar>
  date?: Date
  disabled?: boolean
  placeholderText?: string
  setDate: (date: Date) => void
}

export function DatePicker({
  calendarProps,
  date,
  disabled,
  placeholderText,
  setDate,
}: IDatePickerProps) {
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
            'h-9 w-full justify-start rounded-md text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
          variant={'outline'}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholderText || 'Pick a date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...calendarProps}
          initialFocus
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
}
