import { cn } from '../utils'
import { Button } from './Button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './Select'

export interface ICalendarMonthYearOptions {
  maxYear?: number
  minYear?: number
}

export interface ICalendarMonthYearProps extends ICalendarMonthYearOptions {
  selected: Date
  setSelected: (date: Date) => void
}

const DEFAULT_MIN_YEAR = 1980

export const CalendarMonthYear = ({
  maxYear,
  minYear,
  selected,
  setSelected,
}: ICalendarMonthYearProps) => {
  const currentDate = new Date()
  const selectedDate = selected ?? currentDate
  const selectedYear = selectedDate.getFullYear()
  const selectedMonth = selectedDate.getMonth()

  const monthStrings = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'short' })
  )

  const monthMap = monthStrings.map((month) => ({
    label: month,
    value: monthStrings.indexOf(month),
  }))

  const yearSelectionLength =
    (maxYear ?? currentDate.getFullYear()) - (minYear ?? DEFAULT_MIN_YEAR) + 1
  const years = Array.from(
    { length: yearSelectionLength },
    (_, i) => (maxYear ?? currentDate.getFullYear()) - i
  )

  const handleSelectMonth = (month: number) => {
    setSelected(new Date(selectedYear, month))
  }

  const handleSelectYear = (year: number) => {
    setSelected(new Date(year, selectedMonth))
  }

  return (
    <div className="border-border-secondary bg-background-secondary flex min-w-[180px] flex-col gap-4 rounded-md border-[0.1px] p-3">
      <Select
        onValueChange={(year) => handleSelectYear(Number(year))}
        value={selectedYear.toString()}
      >
        <SelectTrigger>{selectedYear}</SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-3 items-center justify-center gap-4">
        {monthMap.map((month) => (
          <Button
            className={cn('h-8 w-8 px-4 py-4', month.value === selectedMonth && 'bg-primary')}
            fullWidth
            key={month.value}
            onClick={() => handleSelectMonth(month.value)}
            variant="ghost"
          >
            {month.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
