import { PropsWithChildren, ReactNode, createContext, useContext } from 'react'

import { formatDate, formatStartAndEndDates } from '@canyon/utils'
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

import { ResumeSortableSections } from '@gql/graphql'

import { HtmlToPdf } from '@/components/HtmlToPdf'
import { TResumeBuilderForm } from '@/forms/types'
import { mergePdfStyles as merge } from '@/lib/utils'

import { common as cs, spacing } from '../common'
import { getWorkExperienceLocation } from '../utils'
import { ResumePage } from './ResumePage'

interface IOxfordResumeTemplate {
  formValues: TResumeBuilderForm
}

const FormContext = createContext<TResumeBuilderForm | undefined>(undefined)

export const BauhausResumeTemplate = ({ formValues }: IOxfordResumeTemplate) => {
  if (!formValues) {
    return null
  }

  const sectionsOrder = (formValues?.sectionsOrder || []).filter(
    (section) => section !== ResumeSortableSections.Skills
  )
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
      <ResumePage style={merge([cs._MerriweatherFontFamily, { fontSize: 10 }])}>
        <Text style={merge([styles.name])}>
          {formValues?.firstName} {formValues.lastName}
        </Text>
        <View style={merge([styles.body, cs.gapLg])}>
          <View style={merge([styles.left])}>
            {displaySummary ? <SummarySection /> : null}
            <Section title="Contact">
              <View style={merge([cs.flexColumn, { marginBottom: spacing.md }])}>
                <ProfileField>
                  <Text>{formValues.location}</Text>
                </ProfileField>
                <ProfileField>
                  <Text>{formValues.email}</Text>
                </ProfileField>
                <ProfileField>
                  <Text>{formValues.phoneNumber}</Text>
                </ProfileField>
                <ProfileField>
                  <Text>{formValues.website}</Text>
                </ProfileField>
                <ProfileField>
                  <Text>{formValues.linkedinUrl}</Text>
                </ProfileField>
              </View>
            </Section>
            {displaySkills ? <SkillsSection /> : null}
          </View>
          <View style={merge([cs.flexColumn, cs.gapMd, styles.right])}>
            {sectionsOrder?.map((section) => sectionsOrderMap[section])}
          </View>
        </View>
      </ResumePage>
    </FormContext.Provider>
  )
}

const Section = ({ children, title }: { title: string } & PropsWithChildren) => {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <View style={merge([cs.flexColumn])}>
      <Text style={merge([styles.title])}>{capitalizedTitle}</Text>
      {children}
    </View>
  )
}

const ProfileField = ({ children }: { children: ReactNode }) => {
  return <View style={merge([cs.flexColumn, styles.profileField])}>{children}</View>
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
          <View style={merge([cs.flexColumn, cs.gapXxs])}>
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
              <View style={merge([cs.flexColumn, cs.gapSm])}>
                {workExperience?.workPositionsAttributes?.map((workPosition, index) => (
                  <View key={index} style={merge([cs.flexColumn, cs.gapXxs])}>
                    <View style={merge([cs.flexRow, cs.justifyBetween])}>
                      <Text style={merge([styles.secondary])}>{workPosition.name}</Text>
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
          <View key={index} style={merge([cs.flexColumn, cs.gapSm])}>
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
        <View key={index} style={merge([cs.flexColumn, cs.gapSm])}>
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
          <View key={index} style={merge([cs.flexColumn, cs.gapSm])}>
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
          <View key={index} style={merge([cs.flexColumn, cs.gapSm])}>
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
        <View key={index} style={merge([cs.flexColumn, cs.gapSm])}>
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
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  cyan: {
    color: '#06b6d4',
  },
  emerald: {
    color: '#10b981',
  },
  indigo: {
    color: '#6366f1',
  },
  left: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontSize: 8,
    gap: 12,
    maxWidth: '33%',
  },
  name: {
    borderBottom: '0.5px solid #000',
    fontSize: 40,
    marginBottom: 32,
  },
  profileField: {
    marginBottom: 2,
  },
  right: {
    flex: 2,
    maxWidth: '67%',
  },
  secondary: {
    color: '#010101',
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    paddingBottom: 3,
  },
})

const achievementsStylesheet: { [key: string]: Style } = {
  ['li']: {
    fontSize: 10,
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
