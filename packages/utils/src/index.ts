import { KeyboardEvent } from 'react'

import { format } from 'date-fns'
import { ReadonlyURLSearchParams } from 'next/navigation'

export const restrictKeyInput = (e: KeyboardEvent<HTMLInputElement>, regex?: RegExp) => {
  const key = e.key
  const allowedKeys = [
    'Backspace',
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Delete',
    'Tab',
    'Enter',
  ]

  const specialKeys = ['a', 'c', 'v', 'x', 'z']

  if (regex && !key.match(regex) && !allowedKeys.includes(key)) {
    if (!(e.metaKey || e.ctrlKey) || !specialKeys.includes(key)) {
      e.preventDefault()
    }
  }
}

export const formatCurrencyThousands = (num: null | number | undefined): null | string => {
  if (!num) return null

  if (num >= 1000) {
    return '$' + (num / 1000).toFixed(0) + 'K'
  } else {
    return '$' + num
  }
}

export const formatMinMaxSalary = (min?: null | number, max?: null | number): string => {
  if (!min && !max) return ''

  if (min && !max) return `${formatCurrencyThousands(min)}`
  if (!min && max) return `${formatCurrencyThousands(max)}`

  return `${formatCurrencyThousands(min)}-${formatCurrencyThousands(max)}`
}

export const createDateWithTime = (date: string, time?: string): Date => {
  return new Date(`${date} ${time || '00:00:00'}`)
}

/**
 * @param options.excludeTZ - Whether to exclude the timezone from the date. Use this for date selectors that only show month/year.
 */
export const formatDate = (
  date?: Date | null | string | undefined,
  dateFormat?: string,
  options?: {
    excludeTZ?: boolean
  }
): string => {
  if (!date) return ''

  if (typeof date === 'string') {
    // Timezones are messy with month/year only selectors, such as the ones used in the Resume Builder, since it uses 00:00:00 as the time.
    // This causes issues with the browser interpreting the timestamp and converting it to the user's local time which causes an offset.
    // For example: 04/2024 would be 03/2024 in the user's timezone.
    date = options?.excludeTZ ? new Date(date.replace('Z', '')) : new Date(date)
  }

  return format(date, dateFormat ?? 'MMM yyyy')
}

export const formatStartAndEndDates = ({
  endDate,
  present,
  startDate,
}: {
  endDate?: Date | null | string | undefined
  present?: boolean | null | undefined
  startDate?: Date | null | string | undefined
}): string => {
  if (!startDate && !endDate) return ''

  const startDateFormatted = startDate
    ? formatDate(startDate, undefined, { excludeTZ: true })
    : undefined
  const endDateFormatted = endDate ? formatDate(endDate, undefined, { excludeTZ: true }) : undefined

  if (startDate && present) {
    return `${startDateFormatted} - Present`
  }

  if (!startDateFormatted && endDateFormatted) {
    return endDateFormatted
  }

  if (!endDateFormatted && startDateFormatted) {
    return startDateFormatted
  }

  if (
    (startDate && new Date(startDate).getFullYear()) ===
    (endDate && new Date(endDate).getFullYear())
  ) {
    return `${formatDate(startDate, 'MMM', { excludeTZ: true })} - ${endDateFormatted}`
  }

  return `${startDateFormatted} - ${endDateFormatted}`
}

export const extractListItemEl = (htmlStr: string): string[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlStr, 'text/html')
  const nodes = Array.from(doc.getElementsByTagName('li'))
  return nodes.map((node) => node.outerHTML)
}

export const stringsToOptions = (strings: string[]) =>
  strings.map((string) => ({ label: string, value: string }))

export const objectToQueryString = (
  obj: ReadonlyURLSearchParams | Record<string, string>
): string => {
  return new URLSearchParams(obj).toString()
}

export const isValidHttpUrl = (url_string: string): boolean => {
  let url

  try {
    url = new URL(url_string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const trimUrl = (url: string): string => {
  const noProtocol = url.replace(/(^\w+:|^)\/\//, '')
  const noWWW = noProtocol.replace(/^www\./, '')

  return noWWW.replace(/\/$/, '')
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

export const hashCode = (str: string) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  return hash
}

export const generateColors = (text: string) => {
  const hash = Math.abs(hashCode(text))
  const hue1 = hash % 360
  const hue2 = (hue1 + 120) % 360
  const hue3 = (hue2 + 120) % 360

  const saturation = 80
  const lightness = 60

  return [
    `hsl(${hue1}, ${saturation}%, ${lightness}%)`,
    `hsl(${hue2}, ${saturation}%, ${lightness}%)`,
    `hsl(${hue3}, ${saturation}%, ${lightness}%)`,
  ]
}
