'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'

import {
  CreateResumeDocument,
  NewResumeDialog_ResumesDocument,
  ResumesList_ResumesDocument,
  UseUploadResume_ResumesDocument,
} from '@gql/graphql'

import { generateResumeTitle } from '../utils/generateResumeTitle'

interface IUseCreateResumeParams {
  redirectToResume?: boolean
  title?: string
}

export const useCreateResume = ({ redirectToResume, title }: IUseCreateResumeParams = {}) => {
  const router = useRouter()

  const { data: resumesData } = useQuery(UseUploadResume_ResumesDocument)
  const resumes = resumesData?.resumes || []

  const resumeTitle = title ?? generateResumeTitle({ existingResumes: resumes })

  const [createResume, { data, loading }] = useMutation(CreateResumeDocument, {
    onCompleted: (data) => {
      if (redirectToResume) {
        router.replace(`/resumes/${data.createResume.id}`)
      }
    },
    refetchQueries: [ResumesList_ResumesDocument, NewResumeDialog_ResumesDocument],
    variables: {
      name: resumeTitle,
    },
  })

  return {
    createResume,
    data,
    loading,
  }
}
