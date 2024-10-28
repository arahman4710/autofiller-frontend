import { useState } from 'react'

import { Button } from '@canyon/ui/Button'
import { X } from '@phosphor-icons/react'

import { Chip, ChipsContainer } from './Chip'
import { Input } from './Input'
import { SortableList } from './SortableList'

interface IInputChipsProps {
  canAlwaysRemove?: boolean
  chips: string[]
  disableDrag?: boolean
  disabled?: boolean
  onChange: (chips: string[]) => void
  placeholder?: string
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>
}

export const InputChips = ({
  canAlwaysRemove,
  chips,
  disableDrag,
  disabled,
  onChange,
  placeholder,
}: IInputChipsProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!inputValue.trim()) return

      if (inputValue.includes(',')) {
        onChange([...chips, ...inputValue.split(',').filter((input) => input)])
      } else {
        onChange([...chips, inputValue])
      }

      setInputValue('')
    }
  }

  const handleRemoveChip = (index: number) => {
    onChange(chips.filter((_, i) => i !== index))
  }

  const handleOnChange = (items: { id: string }[]) => {
    return onChange(
      items.map((item) => {
        const index = parseInt(item.id)
        return chips[index]
      })
    )
  }

  return (
    <Wrapper>
      <Input
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={inputValue}
      />
      <ChipsContainer>
        <SortableList
          items={chips.map((_, index) => ({ id: index.toString() }))}
          onChange={handleOnChange}
          renderItem={(item) => {
            const index = parseInt(item.id)
            const chip = chips[index]

            const ListItem = disableDrag ? 'div' : SortableList.Item

            return (
              <ListItem id={item.id}>
                <Chip>
                  {chip}
                  {!disabled || canAlwaysRemove ? (
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveChip(index)
                      }}
                    >
                      <X size={12} />
                    </div>
                  ) : null}
                </Chip>
              </ListItem>
            )
          }}
        />
      </ChipsContainer>
    </Wrapper>
  )
}
