import { forwardRef } from 'react'

import { IInputProps, Input } from './Input'

interface IPhoneNumberInputProps extends IInputProps {}

export const PhoneNumberInput = forwardRef<HTMLInputElement, IPhoneNumberInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleOnChange = (event) => {
      const value = event.target.value.replace(/[^0-9+\-().\s]/g, '')
      onChange?.(value)
    }

    return (
      <Input
        {...props}
        className={className}
        maxLength={16}
        onChange={handleOnChange}
        ref={ref}
        type="tel"
      />
    )
  }
)

PhoneNumberInput.displayName = 'PhoneNumberInput'
