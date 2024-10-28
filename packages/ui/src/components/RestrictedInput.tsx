import { restrictKeyInput } from '@canyon/utils'

import { IInputProps, Input } from './Input'

export enum ERestrictions {
  ALPHABETIC,
  NUMERIC,
  DASH,
  SPACE,
}

interface IRestrictedInputProps extends IInputProps {
  allowedCharacters: ERestrictions[]
}

export const RestrictedInput = ({ allowedCharacters, ...props }: IRestrictedInputProps) => {
  const regExMap = {
    [ERestrictions.ALPHABETIC]: 'a-zA-Z',
    [ERestrictions.DASH]: '-',
    [ERestrictions.NUMERIC]: '0-9',
    [ERestrictions.SPACE]: ' ',
  }

  const regEx = new RegExp(`^[${allowedCharacters.map((char) => regExMap[char]).join('')}]$`)

  const handleOnKeyDown = (event) => restrictKeyInput(event, regEx)

  return <Input onKeyDown={handleOnKeyDown} {...props} />
}
