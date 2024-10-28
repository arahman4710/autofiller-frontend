import { Document, StyleSheet } from '@react-pdf/renderer'

import { ResumesTemplateColorEnum } from '@gql/graphql'

import { BauhausResumeTemplate } from '@/components/templates/resume/BauhausResumeTemplate'
import { HarvardResumeTemplate } from '@/components/templates/resume/HarvardResumeTemplate'
import { NeueResumeTemplate } from '@/components/templates/resume/NeueResumeTemplate'
import { OxfordResumeTemplate } from '@/components/templates/resume/OxfordResumeTemplate'
import { TResumeBuilderForm } from '@/forms/types'
import { ResumesTemplateEnum } from '@/gql/__generated__/graphql'

/*
  Resume's form values have to be manually passed down because values won't
  propagate correctly to @react-pdf/renderer when Context is used


  WARNING: Do not upgrade @react-pdf/renderer beyond v3.1.14 or remove any of its co-dependency overrides in ~/package.json.
  It will cause issues with bolded text.
*/
export const ResumeDocument = ({
  formValues,
  template,
  templateColorEnum,
}: {
  formValues: TResumeBuilderForm
  template?: ResumesTemplateEnum
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  return (
    <Document style={DocumentStyles.document}>
      {template == ResumesTemplateEnum.Harvard && <HarvardResumeTemplate formValues={formValues} />}
      {template == ResumesTemplateEnum.Neue && (
        <NeueResumeTemplate formValues={formValues} templateColorEnum={templateColorEnum} />
      )}
      {template == ResumesTemplateEnum.Oxford && (
        <OxfordResumeTemplate formValues={formValues} templateColorEnum={templateColorEnum} />
      )}
      {template == ResumesTemplateEnum.Bauhaus && (
        <BauhausResumeTemplate formValues={formValues}/>
      )}
    </Document>
  )
}

const DocumentStyles = StyleSheet.create({
  document: {
    width: '100%',
  },
})
