import { Clipboard } from '@phosphor-icons/react'
import { Button } from '@rag/ui/Button'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

interface IClipboardButtonProps {
  className?: string
  text: string
}

export const ClipboardButton = ({ className, text }: IClipboardButtonProps) => {
  const { copyToClipboard } = useCopyToClipboard()

  return (
    <Button
      className={className}
      leftIcon={<Clipboard />}
      onClick={() => copyToClipboard(text)}
      size="sm"
    >
      hey
    </Button>
  )
}
