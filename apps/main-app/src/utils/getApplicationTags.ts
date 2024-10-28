import { formatMinMaxSalary } from '@rag/utils'

import { UsersJobs, UsersJobsStatusEnum } from '@gql/graphql'

import { interviewStepOptions } from '@/constants/usersJobInterviewStep'
import { rejectedStageOptions } from '@/constants/usersJobRejectedStage'

type TTagProperty = {
  children: React.ReactNode
  className: string
}

export const getApplicationTags = (
  application: {
    partnerCreatedByUser?: Partial<UsersJobs['partnerCreatedByUser']>
  } & Pick<
    UsersJobs,
    | 'interviewStep'
    | 'isRemote'
    | 'location'
    | 'partnerArchived'
    | 'rejectedStage'
    | 'salaryMax'
    | 'salaryMin'
    | 'status'
  >
) => {
  const tags: TTagProperty[] = []

  const {
    interviewStep,
    isRemote,
    location,
    partnerArchived,
    partnerCreatedByUser,
    rejectedStage,
    salaryMax,
    salaryMin,
    status,
  } = application

  const hasRejectedStage = status === UsersJobsStatusEnum.Rejected && rejectedStage
  const hasInterviewStep = status === UsersJobsStatusEnum.Interview && interviewStep
  const formattedSalary = formatMinMaxSalary(salaryMin, salaryMax)

  if (location) {
    tags.push({
      children: `📍 ${location}`,
      className: 'bg-indigo-600',
    })
  }

  if (isRemote) {
    tags.push({
      children: `🏠 Remote`,
      className: 'bg-orange-600',
    })
  }

  if (formattedSalary) {
    tags.push({
      children: `💰 ${formattedSalary}`,
      className: 'bg-green-700',
    })
  }

  if (hasRejectedStage) {
    tags.push({
      children: `🚫 ${rejectedStageOptions[rejectedStage || '']}`,
      className: 'bg-cyan-600',
    })
  }

  if (hasInterviewStep) {
    tags.push({
      children: `💬 ${interviewStepOptions[interviewStep || '']}`,
      className: 'bg-emerald-600',
    })
  }

  if (partnerArchived) {
    tags.push({
      children: `Archived by ${partnerCreatedByUser?.firstName} ${partnerCreatedByUser?.lastName}`,
      className: 'bg-red-700',
    })
  }

  if (partnerCreatedByUser) {
    tags.push({
      children: `Shared with you from ${partnerCreatedByUser?.firstName} ${partnerCreatedByUser?.lastName}`,
      className: 'bg-amber-500',
    })
  }

  return tags
}
