import { Button, IButtonProps } from '@autofiller/ui/Button'

interface IEmptyPageView {
  button?: IButtonProps
  subtitle?: string
  title: string
}

export const EmptyPageView = ({ button, subtitle, title }: IEmptyPageView) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-medium">{title}</div>
        {subtitle && <div className="text-muted-foreground">{subtitle}</div>}
      </div>
      {button && (
        <div>
          <Button variant="cta" {...button}>
            {button.children}
          </Button>
        </div>
      )}
    </div>
  )
}
