/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogScreen,
  DialogScreenProvider,
} from '@rag/ui/Dialog'
import { EnhanceSelect } from '@rag/ui/EnhanceSelect'
import { InputChips } from '@rag/ui/InputChips'
import {
  VerticalGroup,
  VerticalGroupColumn,
  VerticalGroupDescription,
  VerticalGroupTitle,
} from '@rag/ui/VerticalGroup'
import { cn } from '@rag/ui/utils/cn'
import { ArrowClockwise, CheckCircle, Sparkle } from '@phosphor-icons/react'
import parse from 'html-react-parser'

import {
  EnhanceSummaryDialog_GenerateProfessionalSummaryDocument,
  UseCurrentUser_UsersDocument,
} from '@gql/graphql'

import { GenerateFieldWithAiButton } from '@/components/GenerateFieldWithAiButton'

export const EnhanceSummaryDialog = ({
  form,
  isDialogOpen,
  isPublic,
  onSubmit,
  resumeId,
  setIsDialogOpen,
  setShowUpgradePlanDialog,
  tipTapRef,
}) => {
  const [currentScreen, setCurrentScreen] = useState<number>(0)
  const [keywords, setKeywords] = useState<string[]>([])
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<string>()
  const [isOverwriteEnhancement, setIsOverwriteEnhancement] = useState(false)
  const [generateProfessionalSummary, { loading }] = useMutation(
    EnhanceSummaryDialog_GenerateProfessionalSummaryDocument,
    {
      refetchQueries: [UseCurrentUser_UsersDocument],
    }
  )

  const reset = () => {
    setAiGeneratedSummary(undefined)
    setKeywords([])
    setCurrentScreen(0)
  }

  const onGenerateClick = async () => {
    const { data } = await generateProfessionalSummary({
      variables: {
        keywords,
        resumeId: resumeId ?? '',
        useExisting: isOverwriteEnhancement == false,
      },
    })
    setAiGeneratedSummary(data?.generateProfessionalSummary)
    setCurrentScreen(1)
  }

  const applySummary = () => {
    form.setValue('professionalSummary', aiGeneratedSummary)
    tipTapRef.current?.refreshContent(aiGeneratedSummary)
    onSubmit()

    reset()

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
    })
    document.dispatchEvent(event)
  }

  useEffect(() => {
    if (isDialogOpen) {
      reset()
    }
  }, [isDialogOpen])

  const SummaryStyleComponent = ({ isSet, onClick, text }) => {
    return (
      <div
        className={cn(
          'flex w-1/2 cursor-pointer flex-row justify-between rounded-md border p-4',
          isSet ? 'border-border-secondary' : 'border-border-muted',
          !isSet && 'text-muted-foreground'
        )}
        onClick={onClick}
      >
        {text}
        {isSet && (
          <span className="flex items-center">
            <CheckCircle size={16} weight="fill" />
          </span>
        )}
        {!isSet && (
          <span className="border-border-muted flex h-[16px] w-[16px] items-center rounded-full border"></span>
        )}
      </div>
    )
  }

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogScreenProvider currentScreenIndex={currentScreen}>
        <DialogContent className="max-w-[700px]" title="Enhance Summary" titleIcon={<Sparkle />}>
          <DialogScreen screenNumber={0}>
            <div className="max-h-[600px] overflow-y-auto">
              <VerticalGroup className="gap-5">
                <EnhanceSelect
                  disabled={true}
                  headerText="Original Summary"
                  text={parse(form.getValues('professionalSummary') || '')}
                  variant="selected"
                />

                <div className="border-border-muted border-b"></div>
                <VerticalGroupColumn className="text-[12px]">
                  <VerticalGroupTitle>Keywords</VerticalGroupTitle>
                  <VerticalGroupDescription>
                    Add up to 5 keywords for the AI to try to include in the generated response.
                  </VerticalGroupDescription>
                  <InputChips
                    canAlwaysRemove={true}
                    chips={keywords}
                    disableDrag={true}
                    disabled={keywords.length >= 5}
                    onChange={setKeywords}
                    placeholder="Type a keyword and press enter to add"
                  />
                </VerticalGroupColumn>
                <VerticalGroupColumn className="text-[12px]">
                  <VerticalGroupTitle>Summary Creation Mode</VerticalGroupTitle>
                  <div className="flex flex-row justify-between gap-5">
                    <SummaryStyleComponent
                      isSet={!isOverwriteEnhancement}
                      onClick={() => setIsOverwriteEnhancement(false)}
                      text="Enhance Existing Summary"
                    />
                    <SummaryStyleComponent
                      isSet={isOverwriteEnhancement}
                      onClick={() => setIsOverwriteEnhancement(true)}
                      text="Generate New Summary"
                    />
                  </div>
                </VerticalGroupColumn>
              </VerticalGroup>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <GenerateFieldWithAiButton
                field="professionalSummary"
                isPublic={isPublic}
                loading={loading}
                onClick={onGenerateClick}
                setShowUpgradePlanDialog={setShowUpgradePlanDialog}
              />
            </DialogFooter>
          </DialogScreen>
          <DialogScreen screenNumber={1}>
            <VerticalGroup className="gap-4">
              <EnhanceSelect
                disabled={true}
                headerText="Original Summary"
                text={parse(form.getValues('professionalSummary') || '')}
                variant="selected"
              />
              <EnhanceSelect
                disabled={true}
                headerText="Enhanced Summary"
                text={parse(aiGeneratedSummary || '')}
                variant="success"
              />
            </VerticalGroup>
            <DialogFooter>
              <Button
                leftIcon={<ArrowClockwise />}
                onClick={() => setCurrentScreen(0)}
                variant="outline"
              >
                Try Again
              </Button>
              <Button onClick={applySummary} size="sm" variant="cta">
                Apply
              </Button>
            </DialogFooter>
          </DialogScreen>
        </DialogContent>
      </DialogScreenProvider>
    </Dialog>
  )
}
