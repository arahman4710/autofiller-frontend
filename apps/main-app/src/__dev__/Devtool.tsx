'use client'

import { WarningOctagon } from '@phosphor-icons/react'
import { Switch } from '@rag/ui/Switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { cn } from '@rag/ui/utils/cn'

import { useStore } from '@/hooks/useStore'

import { useDevStore } from './store'

export const Devtool = () => {
  const { setMockingEnabled, setpdfViewerEnabled } = useDevStore()
  const pdfViewerEnabled = useStore(useDevStore, (state) => state.pdfViewerEnabled)
  const mockingEnabled = useStore(useDevStore, (state) => state.mockingEnabled)

  if (process.env.NODE_ENV !== 'development') return null

  const isTurboPackEnabled = process.env.NEXT_PUBLIC_TURBO_ENABLED === 'true'

  return (
    <div className={cn('my-4 block h-fit min-h-40 rounded-md bg-zinc-800 px-4 py-3')}>
      <div className="flex w-full flex-col gap-4">
        <ItemRow>
          <ItemTitle title="Enable PDF Viewer" />
          <Switch
            checked={Boolean(pdfViewerEnabled)}
            onCheckedChange={() => setpdfViewerEnabled(!pdfViewerEnabled)}
          />
        </ItemRow>
        <ItemRow>
          <ItemTitle
            error={
              isTurboPackEnabled
                ? 'TurboPack is currently enabled, restart the dev server without it to enable MSW'
                : null
            }
            subtitle="Requires page refresh to take effect"
            title="Enable GraphQL Mocks"
          />
          <Switch
            checked={Boolean(mockingEnabled)}
            onCheckedChange={() => setMockingEnabled(!mockingEnabled)}
          />
        </ItemRow>
      </div>
    </div>
  )
}

const ItemRow = ({ children, justify }: { children: React.ReactNode; justify?: string }) => {
  return (
    <div className={cn('flex items-center', justify ? `justify-${justify}` : 'justify-between')}>
      {children}
    </div>
  )
}

const ItemTitle = ({
  error,
  subtitle,
  title,
}: {
  error?: Maybe<string>
  subtitle?: string
  title: string
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {title}{' '}
        {error && (
          <Tooltip>
            <TooltipTrigger asChild>
              <WarningOctagon className="text-rose-500" />
            </TooltipTrigger>
            <TooltipContent>{error}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {subtitle && <span className="text-muted-foreground text-sm">{subtitle}</span>}
    </div>
  )
}
