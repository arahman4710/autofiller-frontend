import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ResumeSortableSections } from '@gql/graphql'
import { ResumesInputObjectSchema } from '@gql/zod'

import { TResumeBuilderForm } from '@/forms/types'

interface IUseResumeBuilderFormParams {
  preloadedValues?: Partial<TResumeBuilderForm>
}

export const defaultValues: TResumeBuilderForm = {
  certificationsAttributes: [
    {
      completionDate: null,
      name: '',
      provider: '',
    },
  ],
  courseworksAttributes: [
    {
      achievements: [],
      currentlyWorkingOnCourse: false,
      endDate: null,
      institutionName: '',
      name: '',
    },
  ],
  educationsAttributes: [
    {
      additionalInformation: '',
      currentlyInEducation: false,
      degree: '',
      endDate: null,
      gpa: '',
      institutionName: '',
      location: '',
      startDate: null,
    },
  ],
  email: '',
  firstName: '',
  groupedSkillsAttributes: [
    {
      category: '',
      skills: [],
    },
  ],
  involvementsAttributes: [
    {
      achievements: [],
      currentlyWorkingOnInvolvement: false,
      endDate: null,
      name: '',
      organizationName: '',
      startDate: null,
    },
  ],
  lastName: '',
  linkedinUrl: '',
  location: '',
  name: '',
  phoneNumber: '',
  professionalSummary: '',
  projectsAttributes: [
    {
      achievements: [],
      currentlyWorkingOnProject: false,
      endDate: null,
      name: '',
      startDate: null,
    },
  ],
  sectionsOrder: [
    ResumeSortableSections.Skills,
    ResumeSortableSections.WorkExperiences,
    ResumeSortableSections.Projects,
    ResumeSortableSections.Educations,
    ResumeSortableSections.Certifications,
    ResumeSortableSections.Courseworks,
    ResumeSortableSections.Involvements,
  ],
  website: '',
  workExperiencesAttributes: [
    {
      companyName: '',
      workPositionsAttributes: [
        {
          achievements: [],
          currentlyInPosition: false,
          name: '',
        },
      ],
    },
  ],
}

export const useResumeBuilderForm = ({ preloadedValues }: IUseResumeBuilderFormParams = {}) => {
  const form = useForm<TResumeBuilderForm>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(ResumesInputObjectSchema()),
    values: { ...defaultValues, ...preloadedValues },
  })

  return {
    ...form,
    form,
  }
}
