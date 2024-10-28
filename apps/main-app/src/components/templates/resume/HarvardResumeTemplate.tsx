import { PropsWithChildren, createContext, useContext } from 'react'

import { formatDate, formatStartAndEndDates, trimUrl } from '@canyon/utils'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

import { ResumeSortableSections } from '@gql/graphql'

import { HtmlToPdf } from '@/components/HtmlToPdf'
import { TResumeBuilderForm } from '@/forms/types'
import { mergePdfStyles as merge } from '@/lib/utils'

import { common as cs, spacing } from '../common'
import { getWorkExperienceLocation } from '../utils'
import { ResumePage } from './ResumePage'

interface IHarvardResumeTemplate {
  formValues: TResumeBuilderForm
}

const FormContext = createContext<TResumeBuilderForm | undefined>(undefined)

export const HarvardResumeTemplate = ({ formValues }: IHarvardResumeTemplate) => {
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
      <CertificationsSection />
    ) : null,
    [ResumeSortableSections.Courseworks]: displayCourseworks ? <CourseworksSections /> : null,
    [ResumeSortableSections.Educations]: displayEducation ? <EducationSection /> : null,
    [ResumeSortableSections.Involvements]: displayInvolvements ? <InvolvementsSection /> : null,
    [ResumeSortableSections.Projects]: displayProjects ? <ProjectsSection /> : null,
    [ResumeSortableSections.Skills]: displaySkills ? <SkillsSection /> : null,
    [ResumeSortableSections.WorkExperiences]: displayWorkExperience ? (
      <WorkExperienceSection />
    ) : null,
  }

  return (
    <FormContext.Provider value={formValues}>
      <ResumePage style={merge([cs._PTSerifFontFamily])}>
        <Text style={styles.name}>
          {formValues?.firstName} {formValues.lastName}
        </Text>
        <View
          style={merge([
            cs.flexRow,
            cs.flexWrap,
            cs.columnGapXs,
            cs.marginYSm,
            cs.paddingXSm,
            cs.justifyCenter,
          ])}
        >
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
    <Section title="Summary">
      <HtmlToPdf htmlString={formValues?.professionalSummary ?? ''} />
    </Section>
  )
}

const SkillsSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Skills">
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

const WorkExperienceSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Work Experience">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.workExperiencesAttributes?.map((workExperience, index) => {
          const workExperienceLocation = getWorkExperienceLocation({ workExperience })

          return (
            <View key={index} style={merge([cs.flexColumn])}>
              <View style={merge([cs.flexRow, cs.justifyBetween])}>
                <Text style={merge([cs.bold])}>{workExperience.companyName ?? ''}</Text>
                <Text>{workExperienceLocation}</Text>
              </View>
              <View>
                <Text>{workExperience.companyDescription}</Text>
              </View>
              <View style={merge([cs.flexColumn, cs.gapXs])}>
                {workExperience?.workPositionsAttributes?.map((workPosition, index) => (
                  <View key={index} style={merge([cs.flexColumn, cs.gapXxs])}>
                    <View style={merge([cs.flexRow, cs.justifyBetween])}>
                      <Text style={merge([cs.bold])}>{workPosition.name}</Text>
                      <Text>
                        {formatStartAndEndDates({
                          endDate: workPosition.endDate,
                          present: workPosition.currentlyInPosition,
                          startDate: workPosition.startDate,
                        })}
                      </Text>
                    </View>
                    <View>{!workExperienceLocation && workPosition.location}</View>
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

const ProjectsSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Projects">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.projectsAttributes?.map((project, index) => (
          <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
            <View style={merge([cs.flexRow, cs.justifyBetween])}>
              <Text style={merge([cs.bold])}>{project.name}</Text>
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

const EducationSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Education">
      {formValues?.educationsAttributes?.map((education, index) => (
        <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
          <View style={merge([cs.flexRow, cs.justifyBetween])}>
            <Text style={merge([cs.bold])}>{education.institutionName}</Text>
            <Text>{education.location}</Text>
          </View>
          <View style={merge([cs.flexRow, cs.justifyBetween])}>
            <Text>{education.degree}</Text>
            <Text>
              {formatStartAndEndDates({
                endDate: education.endDate,
                present: education.currentlyInEducation,
                startDate: education.startDate,
              })}
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

const CourseworksSections = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Coursework">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.courseworksAttributes?.map((coursework, index) => (
          <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
            <View style={merge([cs.flexRow, cs.justifyBetween])}>
              <Text style={merge([cs.bold])}>{coursework.name}</Text>
              <Text>{formatDate(coursework?.endDate, 'MMMM, yyyy', { excludeTZ: true })}</Text>
            </View>
            <View>
              <Text>{coursework.institutionName}</Text>
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

const InvolvementsSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Involvements">
      <View style={merge([cs.flexColumn, cs.gapSm])}>
        {formValues?.involvementsAttributes?.map((involvement, index) => (
          <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
            <View style={merge([cs.flexRow, cs.justifyBetween])}>
              <Text style={merge([cs.bold])}>{involvement.name}</Text>
              <Text>
                {formatStartAndEndDates({
                  endDate: involvement.endDate,
                  present: involvement.currentlyWorkingOnInvolvement,
                  startDate: involvement.startDate,
                })}
              </Text>
            </View>
            <View>
              <Text>{involvement.organizationName}</Text>
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

const CertificationsSection = () => {
  const formValues = useContext(FormContext)

  return (
    <Section title="Certifications">
      {formValues?.certificationsAttributes?.map((certification, index) => (
        <View key={index} style={merge([cs.flexColumn, cs.gapXs])}>
          <View style={merge([cs.flexRow, cs.justifyBetween])}>
            <Text style={merge([cs.bold])}>{certification.name}</Text>
            <Text>{certification.provider}</Text>
          </View>
          <View>
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
  name: {
    borderBottom: '0.5px solid #000',
    fontSize: 16,
    paddingBottom: 14,
    textAlign: 'center',
  },
  title: {
    borderBottom: '0.5px solid #000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 4,
  },
})

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
