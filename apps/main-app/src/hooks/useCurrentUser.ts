import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import { SubscriptionPlanEnum, UseCurrentUser_UsersDocument, UsersRoleEnum } from '@gql/graphql'

export type TTokenTypes =
  | 'achievements'
  | 'coverLetter'
  | 'interview'
  | 'interviewQuestions'
  | 'jobMatch'
  | 'learnSkills'
  | 'professionalSummary'
  | 'salaryInsights'

type TTokens = { [key in TTokenTypes]: number | undefined }

export const useCurrentUser = () => {
  const { data, loading } = useQuery(UseCurrentUser_UsersDocument)
  const user = data?.user
  const paidPlans = [SubscriptionPlanEnum.Pro, SubscriptionPlanEnum.ProQuarterly]
  const isPaidPlan = user?.plan ? paidPlans.includes(user.plan) : false
  const isLifetimePaidUser = isPaidPlan && !user?.hasSubscription

  const isAdvisoryOrgAccount = Boolean(user?.isAdvisoryOrgAccount)
  const isAdvisoryClient = Boolean(user?.isAdvisoryClient)
  const isAdvisor = user?.role === UsersRoleEnum.Advisor
  const isAdvisorAdmin = user?.role === UsersRoleEnum.Admin

  const tokens: TTokens = {
    achievements: user?.tokenAchievements,
    coverLetter: user?.tokenCoverLetter,
    interview: user?.tokenInterview,
    interviewQuestions: user?.tokenInterviewQuestions,
    jobMatch: user?.tokenJobMatch,
    learnSkills: user?.tokenLearnSkills,
    professionalSummary: user?.tokenProfessionalSummary,
    salaryInsights: user?.tokenSalaryInsights,
  }

  return {
    isAdvisor,
    isAdvisorAdmin,
    isAdvisoryClient,
    isAdvisoryOrgAccount,
    isLifetimePaidUser,
    isPaidPlan,
    loading,
    plan: user?.plan,
    role: user?.role,
    tokens,
    usedChromeExtension: user?.usedChromeExtension,
    user,
  }
}
