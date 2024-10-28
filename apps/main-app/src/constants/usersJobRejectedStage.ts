import { UsersJobsRejectedStageEnum } from '@gql/graphql'

/* eslint-disable perfectionist/sort-objects */
export const rejectedStageOptions: Record<UsersJobsRejectedStageEnum, string> = {
  [UsersJobsRejectedStageEnum.Application]: 'Application stage',
  [UsersJobsRejectedStageEnum.Reference]: 'Reference stage',
  [UsersJobsRejectedStageEnum.Interview]: 'Interview stage',
}
/* eslint-enable perfectionist/sort-objects */
