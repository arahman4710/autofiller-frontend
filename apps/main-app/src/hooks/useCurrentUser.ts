import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import { SubscriptionPlanEnum, UseCurrentUser_UsersDocument } from '@gql/graphql'

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
  const business = user?.business
  const paidPlans = [
    SubscriptionPlanEnum.Pro,
    SubscriptionPlanEnum.Basic,
    SubscriptionPlanEnum.Hobby,
  ]
  const isPaidPlan = business?.plan ? paidPlans.includes(business.plan) : false
  // const isLifetimePaidUser = isPaidPlan && !user?.hasSubscription

  const isAdvisor = false // user?.role === UsersRoleEnum.Advisor
  const isAdvisorAdmin = false //user?.role === UsersRoleEnum.Admin

  return {
    business,
    isAdvisor,
    isAdvisorAdmin,
    isPaidPlan,
    loading,
    plan: user?.business?.plan,
    // role: user?.role,
    user,
  }
}
