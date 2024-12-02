'use client'

import { type VariantProps, cva } from 'class-variance-authority'
import { useState } from 'react'

import {
  CaretDown,
  CaretUp,
  Eye,
  EyeSlash,
  Info,
  Plus,
  Sparkle,
  Trash,
} from '@phosphor-icons/react'
import { Button } from '@rag/ui/Button'
import { IconText } from '@rag/ui/IconText'
import { DragHandle } from '@rag/ui/SortableItem'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { WarningTooltip } from '@rag/ui/WarningTooltip'
import { cn } from '@rag/ui/utils/cn'

import { DestroyAlertDialog } from '@/components/dialogs/DestroyAlertDialog'

const editorPanelVariants = cva('flex h-fit flex-col rounded-md border', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'border-border-secondary bg-background-contrast',
      secondary: 'border-transparent bg-background-secondary',
    },
  },
})

interface IEditorPanelProps extends VariantProps<typeof editorPanelVariants> {
  addNewTooltip?: string
  children: React.ReactNode
  disableActions: boolean
  emptyStateMessage?: string
  infoMessage?: Maybe<string>
  isPanelOpen?: boolean
  onAddNew?: () => void
  onRemove?: () => void
  onVisibilityToggle?: () => void
  removeTooltip?: string
  showAiIndicator?: boolean
  showDragHandle?: boolean
  subtitle?: string
  title: string
  visible?: boolean
  warningMessage?: Maybe<string>
}

export const EditorPanel = ({
  addNewTooltip,
  children,
  disableActions = false,
  emptyStateMessage,
  infoMessage,
  isPanelOpen,
  onAddNew,
  onRemove,
  onVisibilityToggle,
  removeTooltip,
  showAiIndicator,
  showDragHandle = true,
  subtitle,
  title,
  variant,
  visible = true,
  warningMessage,
}: IEditorPanelProps) => {
  const [open, setOpen] = useState<boolean>(isPanelOpen || false)
  const [showDestroyAlertDialog, setShowDestroyAlertDialog] = useState(false)

  const handlePanelOpenToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <div className={cn(editorPanelVariants({ variant }))}>
      <div
        className={cn(
          'relative flex cursor-pointer select-none flex-row justify-between px-6 py-3 text-sm',
          open
            ? `border-b ${variant === 'secondary' ? 'border-border-secondary' : 'border-secondary'}`
            : null
        )}
        onClick={handlePanelOpenToggle}
      >
        <div className="flex flex-row items-center gap-2">
          {showDragHandle && <DragHandle />}
          <div className="flex flex-col justify-center overflow-hidden">
            <div className="flex flex-row items-center">
              <h2>{title}</h2>
              {infoMessage && (
                <div className="mx-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="text-md" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{infoMessage}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
              <WarningTooltip warningMessage={warningMessage ?? ''} />
            </div>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          {showAiIndicator && (
            <Tooltip>
              <TooltipTrigger asChild>
                <IconText
                  className="rounded-md bg-stone-600 px-3 py-1"
                  leftIcon={<Sparkle className="text-violet-400" weight="fill" />}
                >
                  AI
                </IconText>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">Enhance with AI</div>
              </TooltipContent>
            </Tooltip>
          )}
          {onRemove && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={disableActions}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDestroyAlertDialog(true)
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <Trash />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{removeTooltip ?? 'Remove item'}</TooltipContent>
            </Tooltip>
          )}
          {onAddNew && open && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={disableActions}
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddNew()
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{addNewTooltip ?? 'Add new item'}</TooltipContent>
            </Tooltip>
          )}
          {onVisibilityToggle && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={cn(!visible && 'w-auto p-1')}
                  onClick={(e) => {
                    e.stopPropagation()
                    onVisibilityToggle()
                  }}
                  size="icon"
                  variant="ghost"
                >
                  {visible ? (
                    <Eye />
                  ) : (
                    <div className="bg-background-secondary inline-flex flex-row items-center justify-center gap-2 rounded-full px-3 py-1 text-sm">
                      Hidden <EyeSlash />
                    </div>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{visible ? 'Hide section' : 'Un-hide section'}</TooltipContent>
            </Tooltip>
          )}
          <Button size="icon" variant="ghost">
            {open ? <CaretUp /> : <CaretDown />}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="flex flex-col px-6 pb-6 pt-4 text-sm">
          {emptyStateMessage ? <EmptyState message={emptyStateMessage} /> : children}
        </div>
      ) : null}
      {onRemove && (
        <DestroyAlertDialog
          onConfirm={onRemove}
          onOpenChange={setShowDestroyAlertDialog}
          open={showDestroyAlertDialog}
        />
      )}
    </div>
  )
}

const EmptyState = ({ message }: { message: string }) => {
  return <div className="mt-2 flex items-center justify-center">{message}</div>
}
