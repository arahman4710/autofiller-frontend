import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Badge } from '@canyon/ui/Badge'
import { Button } from '@canyon/ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@canyon/ui/Carousel'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@canyon/ui/Sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@canyon/ui/Tooltip'
import { cn } from '@canyon/ui/utils/cn'
import Image from 'next/image'

import { ResumesTemplateColorEnum, ResumesTemplateEnum } from '@gql/graphql'
import { ResumeTemplateDrawer_UpdateTemplateDocument } from '@gql/graphql'

import { ProBadge } from '@/components/ProBadge'
import { proTemplates } from '@/constants/proTemplates'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const templateOptions: Record<ResumesTemplateEnum, string> = {
  [ResumesTemplateEnum.Bauhaus]: 'Bauhaus',
  [ResumesTemplateEnum.Harvard]: 'Harvard',
  [ResumesTemplateEnum.Neue]: 'Neue',
  [ResumesTemplateEnum.Oxford]: 'Oxford',
}

type TTemplateColor = {
  color: string
  label: string
  value: Maybe<ResumesTemplateColorEnum> | undefined
}

type TTemplate = {
  defaultTemplateColor: ResumesTemplateColorEnum | null
  description: string
  disabled?: boolean
  label: string
  src: null | string
  templateColors: TTemplateColor[]
  value: ResumesTemplateEnum
}

const templates: TTemplate[] = [
  {
    defaultTemplateColor: ResumesTemplateColorEnum.HarvardLight,
    description: '',
    label: 'Harvard',
    src: '/images/template-previews/harvard-resume-template.webp',
    templateColors: [],
    value: ResumesTemplateEnum.Harvard,
  },
  {
    defaultTemplateColor: ResumesTemplateColorEnum.NeueLight,
    description: '',
    label: 'Neue',
    src: '/images/template-previews/neue-resume-template.webp',
    templateColors: [
      {
        color: 'bg-white',
        label: 'Light',
        value: ResumesTemplateColorEnum.NeueLight,
      },
      {
        color: 'bg-cyan-500',
        label: 'Cyan',
        value: ResumesTemplateColorEnum.NeueCyan,
      },
      {
        color: 'bg-indigo-500',
        label: 'Indigo',
        value: ResumesTemplateColorEnum.NeueIndigo,
      },
      {
        color: 'bg-emerald-500',
        label: 'Emerald',
        value: ResumesTemplateColorEnum.NeueEmerald,
      },
    ],
    value: ResumesTemplateEnum.Neue,
  },
  {
    defaultTemplateColor: ResumesTemplateColorEnum.OxfordLight,
    description: '',
    label: 'Oxford',
    src: '/images/template-previews/oxford-resume-template.webp',
    templateColors: [
      {
        color: 'bg-white',
        label: 'Light',
        value: ResumesTemplateColorEnum.OxfordLight,
      },
      {
        color: 'bg-cyan-500',
        label: 'Cyan',
        value: ResumesTemplateColorEnum.OxfordCyan,
      },
      {
        color: 'bg-indigo-500',
        label: 'Indigo',
        value: ResumesTemplateColorEnum.OxfordIndigo,
      },
      {
        color: 'bg-emerald-500',
        label: 'Emerald',
        value: ResumesTemplateColorEnum.OxfordEmerald,
      },
    ],
    value: ResumesTemplateEnum.Oxford,
  },
  {
    defaultTemplateColor: ResumesTemplateColorEnum.BauhausLight,
    description: '',
    label: 'Bauhaus',
    src: '/images/template-previews/bauhaus-resume-template.webp',
    templateColors: [],
    value: ResumesTemplateEnum.Bauhaus,
  },
]

interface IResumeTemplateDrawerProps {
  initialSelectedTemplate: ResumesTemplateEnum
  initialSelectedTemplateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
  onSelectTemplate: (template: ResumesTemplateEnum) => void
  onSelectTemplateColorEnum: (
    templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
  ) => void
  resumeId: string
  selectedTemplate: ResumesTemplateEnum
  selectedTemplateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}

export const ResumeTemplateDrawer = ({
  initialSelectedTemplate,
  initialSelectedTemplateColorEnum,
  onSelectTemplate,
  onSelectTemplateColorEnum,
  resumeId,
  selectedTemplate,
  selectedTemplateColorEnum,
}: IResumeTemplateDrawerProps) => {
  const { isPaidPlan } = useCurrentUser()
  const upgradePlanDialog = useUpgradePlanDialog()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [shouldResetToInitialTemplate, setShouldResetToInitialTemplate] = useState(true)

  const handleTemplateClick = (template: TTemplate) => {
    if (!template.disabled) {
      if (template.value != selectedTemplate) {
        onSelectTemplateColorEnum(template.defaultTemplateColor)
      }
      onSelectTemplate(template.value)
    }
  }

  const handleTemplateColorEnumClick = (template: TTemplate, templateColor: TTemplateColor) => {
    if (!template.disabled && templateColor.value) {
      onSelectTemplateColorEnum(templateColor.value)
      onSelectTemplate(template.value)
    }
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open && initialSelectedTemplate !== selectedTemplate && shouldResetToInitialTemplate) {
      onSelectTemplate(initialSelectedTemplate)
    }

    if (
      !open &&
      initialSelectedTemplateColorEnum !== selectedTemplateColorEnum &&
      shouldResetToInitialTemplate
    ) {
      onSelectTemplateColorEnum(initialSelectedTemplateColorEnum)
    }

    setIsDrawerOpen(open)
  }

  const [updateTemplate] = useMutation(ResumeTemplateDrawer_UpdateTemplateDocument, {
    variables: {
      resumeId,
      template: selectedTemplate,
      templateColorEnum: selectedTemplateColorEnum,
    },
  })

  const handleSaveChanges = () => {
    const isSelectedTemplateFree = !proTemplates.includes(selectedTemplate)

    if (isPaidPlan || isSelectedTemplateFree) {
      onSelectTemplate(selectedTemplate)
      setShouldResetToInitialTemplate(false)

      setIsDrawerOpen(false)

      if (isPaidPlan) {
        updateTemplate()
      }

      return
    }

    upgradePlanDialog.setOpen(true)
  }

  return (
    <Sheet onOpenChange={handleOnOpenChange} open={isDrawerOpen}>
      <Button onClick={() => setIsDrawerOpen(true)} variant="secondary">
        {templateOptions[selectedTemplate]}
      </Button>
      <SheetContent className="min-h-[200px]" side="bottom">
        <div className="mx-auto w-full max-w-fit">
          <SheetHeader className="-ml-4 flex flex-row justify-between">
            <div>
              <SheetTitle>Resume Template</SheetTitle>
              <SheetDescription>
                Select a template to preview its layout and styles.
              </SheetDescription>
            </div>
            <Button className="mr-8" onClick={handleSaveChanges} variant="outline">
              Save Changes
            </Button>
          </SheetHeader>
          <Carousel className="-ml-8 mt-8 w-full max-w-[1200px]" opts={{ align: 'start' }}>
            <CarouselContent>
              {templates.map((template) => (
                <>
                  <CarouselItem className="basis-1/3 pl-8" key={template.value}>
                    <div
                      className={cn('mb-2', !template.disabled && 'cursor-pointer')}
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className={cn('mb-2 flex items-center justify-between')}>
                        <div className="flex items-center gap-1.5">
                          <span>{template.label}</span>
                          {proTemplates.includes(template.value) && <ProBadge />}
                        </div>
                        {selectedTemplate === template.value && (
                          <Badge
                            className="border-0.5 cursor-default text-xs font-medium uppercase"
                            variant="discount"
                          >
                            Selected
                          </Badge>
                        )}
                      </div>
                      {template.src ? (
                        <Image
                          alt={template.label}
                          className="rounded-md object-cover"
                          height={250}
                          src={template.src}
                          width={400}
                        />
                      ) : (
                        <TemplatePlaceholder />
                      )}
                    </div>
                    <div className="my-4 flex justify-center gap-2">
                      {template.templateColors.map((templateColor) => (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                'flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded',
                                templateColor.value ==
                                  (selectedTemplateColorEnum || template.defaultTemplateColor) &&
                                  'bg-amber-500'
                              )}
                              onClick={() => handleTemplateColorEnumClick(template, templateColor)}
                            >
                              <div
                                className={cn(
                                  'h-[14px] w-[14px] rounded bg-amber-500',
                                  templateColor.color
                                )}
                              ></div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{templateColor.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const TemplatePlaceholder = () => {
  return <div className="bg-background-secondary h-[402px] w-[100%] rounded-md"></div>
}
