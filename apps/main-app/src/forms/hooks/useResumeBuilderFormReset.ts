import { useEffect, useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'

import { Resumes } from '@gql/graphql'

import { TResumeBuilderForm } from '@/forms/types'
import { TPublicResume } from '@/store/resumeBuilderStore'

interface IUseResumeBuilderFormResetParams {
  form: UseFormReturn<TResumeBuilderForm>
  resume: Resumes | TPublicResume | undefined
}

export const useResumeBuilderFormReset = ({ form, resume }: IUseResumeBuilderFormResetParams) => {
  const resumeValues = useMemo(
    () => ({
      certifications: resume?.certifications,
      courseworks: resume?.courseworks,
      educations: resume?.educations,
      email: resume?.email,
      firstName: resume?.firstName,
      groupedSkills: resume?.groupedSkills,
      hideCertifications: resume?.hideCertifications,
      hideCourseworks: resume?.hideCourseworks,
      hideEducations: resume?.hideEducations,
      hideInvolvements: resume?.hideInvolvements,
      hideProjects: resume?.hideProjects,
      hideSkills: resume?.hideSkills,
      hideSummary: resume?.hideSummary,
      hideWorkExperiences: resume?.hideWorkExperiences,
      involvements: resume?.involvements,
      lastName: resume?.lastName,
      linkedinUrl: resume?.linkedinUrl,
      location: resume?.location,
      name: resume?.name,
      phoneNumber: resume?.phoneNumber,
      professionalSummary: resume?.professionalSummary,
      projects: resume?.projects,
      sectionsOrder: resume?.sectionsOrder,
      template: resume?.template,
      website: resume?.website,
      workExperiences: resume?.workExperiences,
    }),
    [resume]
  )

  useEffect(() => {
    form.reset(
      {
        ...form.formState.defaultValues,
        certificationsAttributes:
          resumeValues?.certifications?.map((certification) => ({
            ...certification,
            provider: certification.provider ?? undefined,
          })) ?? [],
        courseworksAttributes:
          resumeValues?.courseworks?.map((coursework) => ({
            ...coursework,
            achievements: coursework.achievements,
            currentlyWorkingOnCourse: coursework.currentlyWorkingOnCourse,
            endDate: coursework.endDate,
            id: coursework.id,
            institutionName: coursework.institutionName ?? '',
            name: coursework.name ?? '',
          })) ?? [],
        educationsAttributes:
          resumeValues?.educations?.map((education) => ({
            ...education,
            additionalInformation: education.additionalInformation ?? undefined,
            degree: education.degree ?? undefined,
            endDate: education.endDate,
            gpa: education.gpa ?? undefined,
            location: education.location ?? undefined,
            startDate: education.startDate,
          })) ?? [],
        email: resumeValues?.email || '',
        firstName: resumeValues?.firstName || '',
        groupedSkillsAttributes: resumeValues?.groupedSkills?.map((groupedSkill) => ({
          ...groupedSkill,
          category: groupedSkill.category ?? undefined,
        })),
        hideCertifications: resumeValues?.hideCertifications,
        hideCourseworks: resumeValues?.hideCourseworks,
        hideEducations: resumeValues?.hideEducations,
        hideInvolvements: resumeValues?.hideInvolvements,
        hideProjects: resumeValues?.hideProjects,
        hideSkills: resumeValues?.hideSkills,
        hideSummary: resumeValues?.hideSummary,
        hideWorkExperiences: resumeValues?.hideWorkExperiences,
        involvementsAttributes:
          resumeValues?.involvements?.map((involvement) => ({
            ...involvement,
            achievements: involvement.achievements,
            currentlyWorkingOnInvolvement: involvement.currentlyWorkingOnInvolvement,
            endDate: involvement.endDate,
            id: involvement.id,
            name: involvement.name ?? '',
            organizationName: involvement.organizationName ?? '',
            startDate: involvement.startDate,
          })) ?? [],
        lastName: resumeValues?.lastName || '',
        linkedinUrl: resumeValues?.linkedinUrl ?? '',
        location: resumeValues?.location ?? '',
        name: resumeValues?.name ?? '',
        phoneNumber: resumeValues?.phoneNumber ?? '',
        professionalSummary: resumeValues?.professionalSummary ?? '',
        projectsAttributes:
          resumeValues?.projects?.map((project) => ({
            achievements: project.achievements,
            currentlyWorkingOnProject: project.currentlyWorkingOnProject,
            endDate: project.endDate,
            id: project.id,
            name: project.name,
            startDate: project.startDate,
          })) ?? [],
        sectionsOrder: resumeValues?.sectionsOrder ?? [],
        website: resumeValues?.website ?? '',
        workExperiencesAttributes: resumeValues?.workExperiences?.map(
          ({ workPositions, ...workExperience }) => ({
            companyDescription: workExperience.companyDescription ?? undefined,
            companyName: workExperience.companyName,
            id: workExperience.id,
            workPositionsAttributes: workPositions?.map((workPosition) => ({
              achievements: workPosition.achievements,
              currentlyInPosition: workPosition.currentlyInPosition,
              endDate: workPosition.endDate,
              id: workPosition.id,
              location: workPosition.location ?? undefined,
              name: workPosition.name,
              startDate: workPosition.startDate,
            })),
          })
        ),
      },
      {
        keepDefaultValues: true,
        keepDirty: true,
        keepDirtyValues: true,
      }
    )
  }, [resumeValues])
}
