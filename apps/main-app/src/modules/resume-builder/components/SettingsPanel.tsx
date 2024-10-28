import { FormControl, FormField, FormItem, FormMessage } from '@canyon/ui/Form'
import { Input } from '@canyon/ui/Input'
import { Gear } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'

import { ResumesTemplateColorEnum, ResumesTemplateEnum } from '@gql/graphql'

import { ResumeTemplateDrawer } from '@/components/drawers/ResumeTemplateDrawer'
import { TResumeBuilderForm } from '@/forms/types'

interface ISettingsPanelProps {
  initialTemplate: ResumesTemplateEnum
  initialTemplateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
  isPublic: boolean
  onChangeTemplate: (template: ResumesTemplateEnum) => void
  onChangeTemplateColorEnum: (
    templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
  ) => void
  resumeId: string
  template: ResumesTemplateEnum
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}

export const SettingsPanel = ({
  initialTemplate,
  initialTemplateColorEnum,
  isPublic,
  onChangeTemplate,
  onChangeTemplateColorEnum,
  resumeId,
  template,
  templateColorEnum,
}: ISettingsPanelProps) => {
  const form = useFormContext<TResumeBuilderForm>()

  return (
    <div className="border-background/80 bg-background flex h-fit flex-col rounded-md border px-6 py-3">
      <div className="border-background/40 text-muted-foreground flex flex-row items-center gap-2 border-b pb-3 text-sm">
        <Gear className="text-lg" />
        <h2>Configuration</h2>
      </div>
      <div className="flex flex-col gap-4 py-3 text-sm">
        <SettingsPanelRow subtitle="Choose your preferred template" title="Template">
          <ResumeTemplateDrawer
            initialSelectedTemplate={initialTemplate}
            initialSelectedTemplateColorEnum={initialTemplateColorEnum}
            onSelectTemplate={onChangeTemplate}
            onSelectTemplateColorEnum={onChangeTemplateColorEnum}
            resumeId={resumeId}
            selectedTemplate={template}
            selectedTemplateColorEnum={templateColorEnum}
          />
        </SettingsPanelRow>
        {!isPublic && (
          <SettingsPanelRow subtitle="The title for this resume" title="Title">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-120">
                  <FormControl>
                    <Input {...field} maxLength={90} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsPanelRow>
        )}
      </div>
    </div>
  )
}

interface ISettingsPanelRowProps {
  children: React.ReactNode
  subtitle?: string
  title: string
}

const SettingsPanelRow = ({ children, subtitle, title }: ISettingsPanelRowProps) => {
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
