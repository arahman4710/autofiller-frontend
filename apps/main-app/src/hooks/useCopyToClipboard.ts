import { useToast } from '@autofiller/ui/useToast'

export const useCopyToClipboard = () => {
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)

    toast({ title: 'Copied to clipboard' })
  }

  return { copyToClipboard }
}
