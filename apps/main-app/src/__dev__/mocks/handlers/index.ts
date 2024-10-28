import { HttpResponse, graphql } from 'msw'

import {
  DashboardContent_ItemsDataDocument,
  MatchScore_ResumesDocument,
  Navigation_ItemsDataDocument,
  SubscriptionPlanEnum,
  UseCurrentUser_UsersDocument,
  UsersRoleEnum,
} from '@gql/graphql'

export const handlers = [
  graphql.query(UseCurrentUser_UsersDocument, async () => {
    return HttpResponse.json({
      data: {
        user: {
          email: 'faye@webster.com',
          firstName: 'Faye',
          hasSubscription: false,
          id: '1',
          isAdvisoryClient: false,
          isAdvisoryOrgAccount: false,
          lastName: 'Webster',
          numStartedInterviews: 2,
          numUploadedResumes: 0,
          plan: SubscriptionPlanEnum.Free,
          referralTokens: 0,
          role: UsersRoleEnum.Jobseeker,
          tokenAchievements: 2,
          tokenCoverLetter: 2,
          tokenInterview: 2,
          tokenInterviewQuestions: 2,
          tokenJobMatch: 2,
          tokenLearnSkills: 2,
          tokenProfessionalSummary: 2,
          tokenSalaryInsights: 2,
          uniqueId: 'unique-id',
          usedChromeExtension: false,
        },
      },
    })
  }),
  graphql.query(MatchScore_ResumesDocument, async () => {
    return HttpResponse.json({
      data: {
        resumes: [],
      },
    })
  }),
  graphql.query(DashboardContent_ItemsDataDocument, async () => {
    return HttpResponse.json({
      data: {
        resumes: [],
        user: {
          id: '1',
          numJobs: 0,
          usedChromeExtension: false,
          usedJobAiFeature: false,
          usedResumeAiFeature: true,
        },
      },
    })
  }),
  graphql.query(Navigation_ItemsDataDocument, async () => {
    return HttpResponse.json({
      data: {
        resumes: [],
        user: {
          id: '1',
          numJobs: 0,
          usedChromeExtension: false,
          usedJobAiFeature: false,
          usedResumeAiFeature: true,
        },
      },
    })
  }),
]
