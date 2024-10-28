import { Gear } from '@phosphor-icons/react'
interface ISettingsEditorPanelProps {
  children?: React.ReactNode
  title?: string
}

export const SettingsEditorPanel = ({
  children,
  title = 'Configuration',
}: ISettingsEditorPanelProps) => {
  return (
    <div className="border-background/80 bg-background flex h-fit flex-col rounded-md border px-6 py-3">
      <div className="border-background/40 text-muted-foreground flex flex-row items-center gap-2 border-b pb-3 text-sm">
        <Gear className="text-lg" />
        <h2>{title}</h2>
      </div>
      <div className="flex flex-col gap-4 py-3 text-sm">{children}</div>
    </div>
  )
}
SettingsEditorPanel.displayName = 'SettingsEditorPanel'

interface ISettingsPanelRowProps {
  children: React.ReactNode
  subtitle?: string
  title: string
}

export const SettingsEditorPanelRow = ({ children, subtitle, title }: ISettingsPanelRowProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
SettingsEditorPanelRow.displayName = 'SettingsEditorPanelRow'
