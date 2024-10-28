import omit from 'lodash/omit'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ResumesFragment, ResumesTemplateColorEnum, ResumesTemplateEnum } from '@gql/graphql'

import { defaultValues } from '@/forms/hooks/useResumeBuilderForm'
import { TResumeBuilderForm } from '@/forms/types'

export type TPublicResume = Pick<
  ResumesFragment,
  | 'aiGenerated'
  | 'archived'
  | 'certifications'
  | 'courseworks'
  | 'createdAt'
  | 'documentType'
  | 'documentUrl'
  | 'educations'
  | 'firstName'
  | 'groupedSkills'
  | 'id'
  | 'involvements'
  | 'lastName'
  | 'name'
  | 'projects'
  | 'showOriginalDocument'
  | 'simpleAnalysis'
  | 'suggestedSkills'
  | 'template'
  | 'templateColorEnum'
  | 'uniqueId'
  | 'updatedAt'
  | 'workExperiences'
> &
  TResumeBuilderForm

interface IUseResumeBuilderStoreId {
  clearResumeId: () => void
  resumeId?: string
  setResumeId: (resumeId: string) => void
}

export const resumeInitialValues: TPublicResume = {
  ...defaultValues,
  aiGenerated: false,
  archived: false,
  certifications: [],
  courseworks: [],
  createdAt: '',
  educations: [],
  firstName: '',
  groupedSkills: [],
  id: '',
  involvements: [],
  lastName: '',
  name: '',
  projects: [],
  showOriginalDocument: false,
  simpleAnalysis: [],
  suggestedSkills: [],
  template: ResumesTemplateEnum.Harvard,
  templateColorEnum: ResumesTemplateColorEnum.HarvardLight,
  uniqueId: '',
  updatedAt: '',
  workExperiences: [],
}

export const useResumeBuilderStoreId = create<IUseResumeBuilderStoreId>()(
  persist(
    (set) => ({
      clearResumeId: () => set((state) => omit(state, ['resumeId']), true),
      resumeId: undefined,
      setResumeId: (newResumeId) => set((state) => ({ resumeId: newResumeId })),
    }),
    {
      name: 'resume-builder-id',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
