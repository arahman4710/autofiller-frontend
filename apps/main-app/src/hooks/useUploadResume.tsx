'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'

import {
  NewResumeDialog_ResumesDocument,
  ResumesList_ResumesDocument,
  UploadResumeDocument,
  UseUploadResume_ResumesDocument,
} from '@gql/graphql'

interface IUseUploadResumeParams {
  redirectToResume?: boolean
  title?: string
}

export const useUploadResume = ({ redirectToResume }: IUseUploadResumeParams) => {
  const router = useRouter()

  const { data: resumesData } = useQuery(UseUploadResume_ResumesDocument)
  const resumes = resumesData?.resumes || []

  const [uploadResume, { data, loading }] = useMutation(UploadResumeDocument, {
    onCompleted: (data) => {
      if (redirectToResume) {
        router.replace(`/resumes/${data.uploadResume.id}`)
      }
    },
    refetchQueries: [ResumesList_ResumesDocument, NewResumeDialog_ResumesDocument],
  })

  return {
    data,
    loading,
    uploadResume,
  }
}
