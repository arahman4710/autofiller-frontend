import { forwardRef } from 'react'

import { IInputProps, Input } from './Input'

interface INumberInputProps extends IInputProps {}

export const NumberInput = forwardRef<HTMLInputElement, INumberInputProps>(({ ...props }, ref) => {
  return <Input {...props} ref={ref} step="0.1" type="number" />
})

NumberInput.displayName = 'NumberInput'
