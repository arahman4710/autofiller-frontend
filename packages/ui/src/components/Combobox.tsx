import { forwardRef, useState } from 'react'

import { CaretDown, Check, X } from '@phosphor-icons/react'

import { cn } from '../utils'
import { Badge } from './Badge'
import { Button } from './Button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './Command'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { ScrollArea } from './ScrollArea'

export interface IComboboxOption {
  label: string
  value: string
}

interface IComboboxProps {
  clearable?: boolean
  disabled?: boolean
  emptyText?: string
  enableAddOption?: boolean
  options: IComboboxOption[]
  searchPlaceholder?: string
  selectPlaceholder?: string
}

interface IComboboxPropsSingle extends IComboboxProps {
  multiple?: false
  onValueChange?: (value: IComboboxOption[] | string) => void
  value?: IComboboxOption[] | string
}

interface IComboboxPropsMultiple extends IComboboxProps {
  multiple?: true
  onValueChange?: (value: IComboboxOption[]) => void
  value?: IComboboxOption[]
}

export type TComboboxProps = IComboboxPropsMultiple | IComboboxPropsSingle

interface IHandleSingleSelectArgs
  extends Pick<IComboboxPropsSingle, 'clearable' | 'onValueChange' | 'value'> {
  option: IComboboxOption
}

interface IHandleMultipleSelectArgs
  extends Pick<IComboboxPropsMultiple, 'clearable' | 'onValueChange' | 'value'> {
  option: IComboboxOption
}

export const handleSingleSelect = ({
  clearable,
  onValueChange,
  option,
  value,
}: IHandleSingleSelectArgs) => {
  if (clearable) {
    onValueChange?.(option.value === value ? '' : option.value)
  } else {
    onValueChange?.(option.value)
  }
}

export const handleMultipleSelect = ({
  clearable,
  onValueChange,
  option,
  value,
}: IHandleMultipleSelectArgs) => {
  if (value?.map((val) => val.value)?.includes(option.value)) {
    if (!clearable && value.length === 1) return false
    onValueChange?.(value.filter((value) => value.value !== option.value))
  } else {
    onValueChange?.([...(value ?? []), option])
  }
}

export const Combobox = forwardRef(
  (
    {
      clearable,
      disabled,
      emptyText,
      enableAddOption,
      multiple,
      onValueChange,
      options,
      searchPlaceholder,
      selectPlaceholder,
      value,
    }: TComboboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleAddOption = () => {
      const option = { label: search, value: search }

      if (multiple) {
        handleMultipleSelect({ clearable, onValueChange, option, value })
      } else {
        handleSingleSelect({ clearable, onValueChange, option, value })
      }

      setSearch('')
      setOpen(false)
    }

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className={cn(
              'hover:bg-secondary/20 h-fit w-full justify-between active:scale-100',
              !value && 'text-muted-foreground'
            )}
            disabled={disabled}
            role="combobox"
            variant="outline"
          >
            <span className="line-clamp-1 flex flex-row flex-wrap gap-x-0.5 gap-y-2 overflow-visible text-left font-normal">
              {multiple &&
                value &&
                value.map((option, index) => (
                  <Badge className="mr-1 font-light" key={index} variant="secondary">
                    {option.label}
                    <button
                      className="focus:ring-ring ring-offset-background ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          // handleUnselect(framework)
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      // onClick={() => handleUnselect(framework)}
                    >
                      {/* <X className="hover:text-foreground h-3 w-3 text-muted-foreground" /> */}
                    </button>
                  </Badge>
                ))}

              {!multiple &&
                value &&
                value !== '' &&
                options.find((option) => option.value === value)?.label}

              {!value || value.length === 0 ? selectPlaceholder ?? 'Select an option' : null}
            </span>
            <CaretDown
              className={cn(
                'ml-2 h-4 w-4 shrink-0 rotate-0 opacity-50 transition-transform',
                open && 'rotate-180'
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command>
            <CommandInput
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setOpen(false)
                }

                if (enableAddOption && e.key === 'Enter') {
                  handleAddOption()
                }
              }}
              onValueChange={(val) => {
                setSearch(val)
              }}
              placeholder={searchPlaceholder ?? 'Search for an option'}
              ref={ref}
              value={search}
            />
            <CommandEmpty className={cn(enableAddOption && 'p-0')}>
              {enableAddOption ? (
                <div
                  className="outline-nonedata-[disabled]:pointer-events-none relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm data-[disabled]:opacity-50"
                  onClick={handleAddOption}
                >
                  <span
                    aria-selected="true"
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground w-full rounded-sm px-2 py-1.5"
                    data-selected="true"
                  >{`add option: ${search}`}</span>
                </div>
              ) : (
                emptyText ?? 'No results found'
              )}
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-60">
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={(selectedValue) => {
                        const option = options.find(
                          (option) => option.label.toLowerCase() === selectedValue
                        )

                        if (!option) return null

                        if (multiple) {
                          handleMultipleSelect({ clearable, onValueChange, option, value })
                        } else {
                          handleSingleSelect({ clearable, onValueChange, option, value })

                          setOpen(false)
                        }
                      }}
                      value={option.label}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 opacity-0',
                          !multiple && value === option.value && 'opacity-100',
                          multiple &&
                            value?.map((val) => val.value)?.includes(option.value) &&
                            'opacity-100'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

Combobox.displayName = 'Combobox'
