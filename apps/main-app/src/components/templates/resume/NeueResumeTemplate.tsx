import { PropsWithChildren, createContext, useContext } from 'react'

import { formatDate, formatStartAndEndDates, trimUrl } from '@canyon/utils'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

import { ResumeSortableSections, ResumesTemplateColorEnum } from '@gql/graphql'

import { HtmlToPdf } from '@/components/HtmlToPdf'
import { TResumeBuilderForm } from '@/forms/types'
import { mergePdfStyles as merge } from '@/lib/utils'

import { common as cs, spacing } from '../common'
import { ResumePage } from './ResumePage'

interface INeueResumeTemplate {
  formValues: TResumeBuilderForm
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}

const FormContext = createContext<TResumeBuilderForm | undefined>(undefined)

export const NeueResumeTemplate = ({ formValues, templateColorEnum }: INeueResumeTemplate) => {
  if (!formValues) {
    return null
  }

  const sectionsOrder = formValues?.sectionsOrder
  const displaySummary = formValues?.professionalSummary && !formValues?.hideSummary
  const displaySkills = formValues?.groupedSkillsAttributes?.length && !formValues?.hideSkills
  const displayProjects = formValues?.projectsAttributes?.length && !formValues?.hideProjects
  const displayEducation = formValues?.educationsAttributes?.length && !formValues?.hideEducations
  const displayWorkExperience =
    formValues?.workExperiencesAttributes?.length && !formValues?.hideWorkExperiences
  const displayCertifications =
    formValues?.certificationsAttributes?.length && !formValues?.hideCertifications
  const displayCourseworks =
    formValues?.courseworksAttributes?.length && !formValues?.hideCourseworks
  const displayInvolvements =
    formValues?.involvementsAttributes?.length && !formValues?.hideInvolvements

  const sectionsOrderMap: Record<ResumeSortableSections, React.ReactNode | null> = {
    [ResumeSortableSections.Certifications]: displayCertifications ? (
      <CertificationsSection templateColorEnum={templateColorEnum} />
    ) : null,
    [ResumeSortableSections.Courseworks]: displayCourseworks ? (
      <CourseworksSections templateColorEnum={templateColorEnum} />
    ) : null,
    [ResumeSortableSections.Educations]: displayEducation ? (
      <EducationSection templateColorEnum={templateColorEnum} />
    ) : null,
    [ResumeSortableSections.Involvements]: displayInvolvements ? (
      <InvolvementsSection templateColorEnum={templateColorEnum} />
    ) : null,
    [ResumeSortableSections.Projects]: displayProjects ? (
      <ProjectsSection templateColorEnum={templateColorEnum} />
    ) : null,
    [ResumeSortableSections.Skills]: displaySkills ? <SkillsSection /> : null,
    [ResumeSortableSections.WorkExperiences]: displayWorkExperience ? (
      <WorkExperienceSection templateColorEnum={templateColorEnum} />
    ) : null,
  }

  return (
    <FormContext.Provider value={formValues}>
      <ResumePage style={merge([cs._OpenSansFontFamily])}>
        <Text style={merge([styles.name, ...templateColorStyle(templateColorEnum)])}>
          {formValues?.firstName} {formValues.lastName}
        </Text>
        <View style={merge([styles.subHeader, cs.lightSubheader])}>
          {formValues?.location ? <Text>{formValues.location}</Text> : null}

          {formValues?.location && formValues?.email ? <Text>•</Text> : null}
          {formValues?.email ? <Text>{formValues.email}</Text> : null}

          {(formValues?.location || formValues?.email) && formValues?.phoneNumber ? (
            <Text>•</Text>
          ) : null}
          {formValues?.phoneNumber ? <Text>{formValues.phoneNumber}</Text> : null}

          {(formValues?.location || formValues?.email || formValues?.phoneNumber) &&
          formValues?.website ? (
            <Text>•</Text>
          ) : null}
          {formValues?.website ? <Text>{trimUrl(formValues.website)}</Text> : null}

          {(formValues?.location ||
            formValues?.email ||
            formValues?.phoneNumber ||
            formValues?.website) &&
          formValues?.linkedinUrl ? (
            <Text>•</Text>
          ) : null}
          {formValues?.linkedinUrl ? <Text>{trimUrl(formValues.linkedinUrl)}</Text> : null}
        </View>
        <View style={merge([cs.flexColumn, cs.gapMd])}>
          {displaySummary ? <SummarySection /> : null}

          {sectionsOrder?.map((section) => sectionsOrderMap[section])}
        </View>
      </ResumePage>
    </FormContext.Provider>
  )
}

const Section = ({ children, title }: { title: string } & PropsWithChildren) => {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <View style={merge([cs.flexColumn])}>
      <Text style={styles.title}>{capitalizedTitle}</Text>
      {children}
    </View>
  )
}

const SummarySection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="SUMMARY">
      <HtmlToPdf htmlString={formValues?.professionalSummary ?? ''} />
    </Section>
  )
}

const SkillsSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="SKILLS">
      {formValues?.groupedSkillsAttributes?.map((groupedSkill, index) => (
        <View key={index}>
          <View style={merge([cs.flexRow])}>
            {groupedSkill.category ? (
              <Text
                style={merge([
                  cs.bold,
                  {
                    marginRight: spacing.xs,
                  },
                ])}
              >
                {groupedSkill.category}:&nbsp;
              </Text>
            ) : null}
            <View style={merge([cs.flexRow, cs.flexWrap, cs.gapXxs])}>
              {groupedSkill?.skills?.map((skill, index) => (
                <Text key={index}>
                  {skill}
                  {groupedSkill?.skills?.length && index !== groupedSkill?.skills?.length - 1
                    ? ','
                    : null}
                  &nbsp;
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </Section>
  )
}

const WorkExperienceSection = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="WORK EXPERIENCE">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.workExperiencesAttributes?.map((workExperience, index) => {
          return (
            <View key={index} style={merge([cs.flexColumn])}>
              <View style={merge([cs.flexRow, cs.justifyBetween])}>
                <Text style={merge([cs.bold])}>{workExperience.companyName ?? ''}</Text>
              </View>
              <View>
                <Text>{workExperience.companyDescription}</Text>
              </View>
              <View style={merge([cs.flexColumn, cs.gapXs])}>
                {workExperience?.workPositionsAttributes?.map((workPosition, index) => (
                  <View key={index} style={merge([cs.flexColumn, cs.gapXxs])}>
                    <View
                      style={merge([
                        cs.flexRow,
                        cs.justifyBetween,
                        ...templateColorStyle(templateColorEnum),
                      ])}
                    >
                      <Text>{workPosition.name}</Text>
                    </View>
                    <View style={merge([styles.dateLocation, cs.lightSubheader])}>
                      <Text>
                        {formatStartAndEndDates({
                          endDate: workPosition.endDate,
                          present: workPosition.currentlyInPosition,
                          startDate: workPosition.startDate,
                        })}
                        {(workPosition.endDate || workPosition.startDate) &&
                          workPosition.location &&
                          ', '}
                        {workPosition.location}
                      </Text>
                    </View>
                    <View>
                      {workPosition.achievements?.map((achievement, index) => (
                        <HtmlToPdf
                          htmlString={achievement}
                          key={index}
                          stylesheet={achievementsStylesheet}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )
        })}
      </View>
    </Section>
  )
}

const ProjectsSection = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="PROJECTS">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.projectsAttributes?.map((project, index) => (
          <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
            <View style={merge([cs.flexRow, cs.justifyBetween])}>
              <Text style={merge([cs.bold, ...templateColorStyle(templateColorEnum)])}>
                {project.name}
              </Text>
            </View>
            <View style={merge([styles.dateLocation, cs.lightSubheader])}>
              <Text>
                {formatStartAndEndDates({
                  endDate: project.endDate,
                  present: project.currentlyWorkingOnProject,
                  startDate: project.startDate,
                })}
              </Text>
            </View>
            <View>
              {project.achievements?.map((achievement, index) => (
                <HtmlToPdf
                  htmlString={achievement}
                  key={index}
                  stylesheet={achievementsStylesheet}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </Section>
  )
}

const EducationSection = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="EDUCATION">
      {formValues?.educationsAttributes?.map((education, index) => (
        <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
          <View>
            <Text style={merge([cs.bold])}>
              <Text style={merge(templateColorStyle(templateColorEnum))}>{education.degree}</Text>
              {education.degree && education.institutionName && ' | '}
              {education.institutionName}
            </Text>
          </View>
          <View style={merge([styles.dateLocation, cs.lightSubheader])}>
            <Text>
              {formatStartAndEndDates({
                endDate: education.endDate,
                present: education.currentlyInEducation,
                startDate: education.startDate,
              })}
              {(education.endDate || education.startDate) && education.location && ', '}
              {education.location}
            </Text>
          </View>
          <View>
            <Text>{education.gpa ? `${education.gpa} GPA` : null}</Text>
          </View>
        </View>
      ))}
    </Section>
  )
}

const CourseworksSections = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="COURSEWORK">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.courseworksAttributes?.map((coursework, index) => (
          <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
            <View>
              <Text style={merge([cs.bold])}>
                <Text style={merge(templateColorStyle(templateColorEnum))}>{coursework.name}</Text>
                {coursework.name && coursework.institutionName && ' | '}
                {coursework.institutionName}
              </Text>
            </View>
            <View style={merge([styles.dateLocation, cs.lightSubheader])}>
              <Text>{formatDate(coursework?.endDate, 'MMMM, yyyy', { excludeTZ: true })}</Text>
            </View>
            <View>
              {coursework.achievements?.map((achievement, index) => (
                <HtmlToPdf
                  htmlString={achievement}
                  key={index}
                  stylesheet={achievementsStylesheet}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </Section>
  )
}

const InvolvementsSection = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="INVOLVEMENT">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.involvementsAttributes?.map((involvement, index) => (
          <View key={index} style={merge([cs.flexColumn])}>
            <View>
              <Text style={merge([cs.bold])}>
                <Text style={merge(templateColorStyle(templateColorEnum))}>{involvement.name}</Text>
                {involvement.name && involvement.organizationName && ' | '}
                {involvement.organizationName}
              </Text>
            </View>
            <View style={merge([styles.dateLocation, cs.lightSubheader])}>
              <Text>
                {formatStartAndEndDates({
                  endDate: involvement.endDate,
                  present: involvement.currentlyWorkingOnInvolvement,
                  startDate: involvement.startDate,
                })}
              </Text>
            </View>
            <View>
              {involvement.achievements?.map((achievement, index) => (
                <HtmlToPdf
                  htmlString={achievement}
                  key={index}
                  stylesheet={achievementsStylesheet}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </Section>
  )
}

const CertificationsSection = ({
  templateColorEnum,
}: {
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
}) => {
  const formValues = useContext(FormContext)

  return (
    <Section title="CERTIFICATIONS">
      {formValues?.certificationsAttributes?.map((certification, index) => (
        <View key={index} style={merge([cs.flexColumn])}>
          <View>
            <Text style={merge([cs.bold])}>
              <Text style={merge(templateColorStyle(templateColorEnum))}>{certification.name}</Text>
              {certification.name && certification.provider && ' | '}
              {certification.provider}
            </Text>
          </View>
          <View style={merge([styles.dateLocation, cs.lightSubheader])}>
            <Text>
              {formatDate(certification?.completionDate, 'MMMM, yyyy', { excludeTZ: true })}
            </Text>
          </View>
        </View>
      ))}
    </Section>
  )
}

const styles = StyleSheet.create({
  cyan: {
    color: '#06b6d4',
  },
  dateLocation: {
    fontSize: 10,
  },
  emerald: {
    color: '#10b981',
  },
  indigo: {
    color: '#6366f1',
  },
  name: {
    fontSize: 18,
    paddingBottom: 2,
  },
  subHeader: {
    columnGap: 4,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    marginBottom: 12,
  },
  title: {
    borderTop: '0.5px solid #d4d4d4',
    fontSize: 11,
    fontWeight: 'bold',
    paddingBottom: 4,
    paddingTop: 8,
  },
})

const templateColorStyle = (templateColorEnum) => {
  const templateColorStyles = {
    [ResumesTemplateColorEnum.NeueCyan]: [styles.cyan],
    [ResumesTemplateColorEnum.NeueEmerald]: [styles.emerald],
    [ResumesTemplateColorEnum.NeueIndigo]: [styles.indigo],
    [ResumesTemplateColorEnum.NeueLight]: [],
  }
  return templateColorEnum ? templateColorStyles[templateColorEnum] || [] : []
}

const achievementsStylesheet: { [key: string]: Style } = {
  ['li']: {
    fontSize: 11,
    marginBottom: 2,
    marginLeft: 4,
    marginTop: 2,
    paddingLeft: 0,
    paddingRight: 10,
  },
  ['p']: {
    marginBottom: 0,
  },
}
