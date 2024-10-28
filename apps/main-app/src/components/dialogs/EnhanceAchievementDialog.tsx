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
import { ArrowClockwise, Sparkle } from '@phosphor-icons/react'
import parse from 'html-react-parser'

import {
  EnhanceAchievementDialog_GenerateOneJobAchievementDocument,
  UseCurrentUser_UsersDocument,
} from '@gql/graphql'

import { GenerateFieldWithAiButton } from '@/components/GenerateFieldWithAiButton'

export const EnhanceAchievementDialog = ({
  form,
  formName,
  isDialogOpen,
  isPublic,
  onSubmit,
  setIsDialogOpen,
  setShowUpgradePlanDialog,
  tipTapRef,
  workExperience,
  workPosition,
}) => {
  const [currentScreen, setCurrentScreen] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
  const [keywords, setKeywords] = useState<string[]>([])
  const [aiGeneratedAchievement, setAiGeneratedAchievement] = useState<string>()
  const [generateOneJobAchievement, { loading }] = useMutation(
    EnhanceAchievementDialog_GenerateOneJobAchievementDocument,
    {
      refetchQueries: [UseCurrentUser_UsersDocument],
    }
  )

  const reset = () => {
    setAiGeneratedAchievement(undefined)
    setSelectedIndex(null)
    setKeywords([])
    setCurrentScreen(0)
  }

  const onGenerateClick = async () => {
    if (selectedIndex == undefined) {
      return
    }

    const { data } = await generateOneJobAchievement({
      variables: {
        index: selectedIndex,
        keywords,
        workPositionId: workPosition.id,
      },
    })

    const achievement = data?.generateOneJobAchievement
    setAiGeneratedAchievement(achievement)
    setCurrentScreen(1)
  }

  const applyAchievement = () => {
    if (selectedIndex == undefined) {
      return
    }

    const newAchievements = workPosition?.achievements
    newAchievements[selectedIndex] = aiGeneratedAchievement
    const formValueAchievements = `<ul>${newAchievements?.join('')}</ul>`
    form.setValue(formName, newAchievements)
    tipTapRef.current?.refreshContent(formValueAchievements)
    onSubmit()

    reset()

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
    })
    document.dispatchEvent(event)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      reset()
    }
  }, [isDialogOpen])

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogScreenProvider currentScreenIndex={currentScreen}>
        <DialogContent
          className="max-w-[700px]"
          title="Enhance Achievement"
          titleIcon={<Sparkle />}
        >
          <DialogScreen screenNumber={0}>
            <div className="max-h-[600px] overflow-y-auto">
              <VerticalGroup className="gap-5">
                <div className="flex gap-2 text-base">
                  <span className="font-bold"> {workExperience?.companyName} </span>
                  <span className="text-muted-foreground"> {workPosition?.name}</span>
                </div>
                {workPosition?.achievements?.length == 0 ||
                (workPosition?.achievements?.length == 1 &&
                  isEmptyAchievementString(workPosition?.achievements[0])) ? (
                  <span className="text-[12px]">Add an achievement first to enhance it.</span>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 text-[11px]">
                      {(workPosition?.achievements || []).map((achievement, index) => (
                        <EnhanceSelect
                          key={`${workPosition.id}.${index}`}
                          onClick={() => setSelectedIndex(index)}
                          text={parse(achievement)}
                          variant={index === selectedIndex ? 'selected' : 'default'}
                        />
                      ))}
                    </div>
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
                  </>
                )}
              </VerticalGroup>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <GenerateFieldWithAiButton
                disabled={selectedIndex == undefined}
                field="achievements"
                isPublic={isPublic}
                loading={loading}
                onClick={onGenerateClick}
                setShowUpgradePlanDialog={setShowUpgradePlanDialog}
              />
            </DialogFooter>
          </DialogScreen>
          <DialogScreen screenNumber={1}>
            <VerticalGroup className="gap-10">
              <div>
                <div className="mb-4 flex gap-2 text-base">
                  <span className="font-bold"> {workExperience?.companyName} </span>
                  <span className="text-muted-foreground"> {workPosition?.name}</span>
                </div>
                <div className="flex flex-col gap-4 text-[11px]">
                  <EnhanceSelect
                    headerText="Original Text"
                    text={
                      selectedIndex != undefined && parse(workPosition?.achievements[selectedIndex])
                    }
                    variant="selected"
                  />
                  <EnhanceSelect
                    headerText="Enhanced Text"
                    text={parse(aiGeneratedAchievement || '')}
                    variant="success"
                  />
                </div>
              </div>
            </VerticalGroup>
            <DialogFooter>
              <Button
                leftIcon={<ArrowClockwise />}
                onClick={() => setCurrentScreen(0)}
                variant="outline"
              >
                Try Again
              </Button>
              <Button onClick={applyAchievement} size="sm" variant="cta">
                Apply
              </Button>
            </DialogFooter>
          </DialogScreen>
        </DialogContent>
      </DialogScreenProvider>
    </Dialog>
  )
}

const isEmptyAchievementString = (achievement) => {
  return achievement == '<li><p></p></li>'
}
