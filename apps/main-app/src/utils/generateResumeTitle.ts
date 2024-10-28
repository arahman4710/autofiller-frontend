'use client'

import { Resumes } from '@gql/graphql'

const removeFileExtension = (filename: string): string => {
  const dotIndex = filename.lastIndexOf('.')

  if (dotIndex === -1) {
    return filename // if there are no extensions return the filename as is
  }

  return filename.slice(0, dotIndex)
}

export const generateResumeTitle = ({
  existingResumes,
  uploadedResumeFileName,
}: {
  existingResumes: Pick<Resumes, 'name'>[]
  uploadedResumeFileName?: string
}): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = String(date.getDate()).padStart(2, '0')
  let title = uploadedResumeFileName
    ? removeFileExtension(uploadedResumeFileName)
    : `${year}-${month}-${day}-resume`

  const resumesWithExistingResumeTitle = existingResumes?.filter((resume) =>
    resume?.name?.includes(title)
  )

  if (resumesWithExistingResumeTitle?.length) {
    const lastResume = resumesWithExistingResumeTitle[resumesWithExistingResumeTitle.length - 1]
    const lastResumeTitle = lastResume.name
    const match = lastResumeTitle.match(/-(\d+)$/)

    if (match) {
      const number = parseInt(match[1], 10)
      title = `${lastResumeTitle.slice(0, match.index)}-${number + 1}`
    } else {
      title = `${lastResumeTitle}-1`
    }
  }

  return title
}
