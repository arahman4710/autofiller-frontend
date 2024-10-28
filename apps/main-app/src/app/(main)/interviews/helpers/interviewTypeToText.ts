import { InterviewsTypeEnum } from '@gql/graphql'

export const interviewTypeToText: Record<InterviewsTypeEnum, string> = {
  [InterviewsTypeEnum.IntroRecruiterScreen]: 'Intro Recruiter Screen',
  [InterviewsTypeEnum.JobInterviewBehavioralTechnical]: 'Technical Interview',
}
