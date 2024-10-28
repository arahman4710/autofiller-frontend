'use client'

import { Calendar as CalendarIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '../utils'
import { Button } from './Button'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

interface IDateRangePickerProps {
  calendarProps?: React.ComponentProps<typeof Calendar>
  className?: React.HTMLAttributes<HTMLDivElement>
  date?: DateRange
  placeholderText?: string
  setDate: (date: DateRange) => void
}

const DateRangePicker = ({ className, date, placeholderText, setDate }: IDateRangePickerProps) => {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'h-10 w-[220px] justify-start text-left font-normal',
              !(date?.from || date?.to) && 'text-muted-foreground'
            )}
            id="date"
            variant={'outline'}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholderText || 'Pick a date'}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            initialFocus
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { DateRangePicker }
