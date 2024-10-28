import { UsersJobsInterviewStepEnum } from '@gql/graphql'

/* eslint-disable perfectionist/sort-objects */
export const interviewStepOptions: Record<UsersJobsInterviewStepEnum, string> = {
  [UsersJobsInterviewStepEnum.IntroScreen]: 'Intro screen',
  [UsersJobsInterviewStepEnum.PhoneScreen]: 'Phone screen',
  [UsersJobsInterviewStepEnum.Onsite]: 'Onsite',
}
/* eslint-enable perfectionist/sort-objects */
