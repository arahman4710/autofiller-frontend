import { Plus, Sparkle } from '@phosphor-icons/react'
import { Chip, ChipsContainer } from '@autofiller/ui/Chip'
import { IconText } from '@autofiller/ui/IconText'
import { cn } from '@autofiller/ui/utils/cn'

interface ISuggestedChipsProps {
  chips: string[]
  className?: string
  emptyMessage?: string
  onSelect: (chip: string) => void
  title: string
}

export const SuggestedChips = ({
  chips,
  className,
  emptyMessage = 'No suggestions available.',
  onSelect,
  title = 'Suggestions',
}: ISuggestedChipsProps) => {
  return (
    <div
      className={cn(
        'border-border-secondary line-clamp-1 flex flex-col flex-wrap gap-4 rounded-lg border p-4',
        className
      )}
    >
      <IconText leftIcon={<Sparkle className="text-violet-400" size={16} weight="fill" />}>
        {title}
      </IconText>
      {chips.length === 0 && <p className="text-text-muted">{emptyMessage}</p>}
      <ChipsContainer>
        {chips.map((chip, index) => (
          <Chip key={index} onClick={() => onSelect(chip)} variant="ai">
            {chip} <Plus />
          </Chip>
        ))}
      </ChipsContainer>
    </div>
  )
}
