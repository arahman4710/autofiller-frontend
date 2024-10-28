import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useToast } from '@rag/ui/useToast'

import {
  ApplicationContent_UsersJobsDocument,
  SalaryInsights_SalaryInsightsDocument,
  SubscriptionPlanEnum,
} from '@gql/graphql'

import { Upsell } from '@/components/Upsell'

interface ISalaryInsightsProps {
  applicationId: string
  plan?: SubscriptionPlanEnum
  salaryInsights: string
  setSalaryInsights: (salaryInsights: string) => void
  token?: number
}

export const SalaryInsights = ({
  applicationId,
  plan,
  salaryInsights,
  setSalaryInsights,
  token,
}: ISalaryInsightsProps) => {
  const { errorToast } = useToast()

  const [salaryInsightsMutation, { loading }] = useMutation(SalaryInsights_SalaryInsightsDocument, {
    refetchQueries: [ApplicationContent_UsersJobsDocument],
  })

  const fetchSalaryInsights = async () => {
    try {
      const result = await salaryInsightsMutation({
        variables: {
          usersJobId: applicationId,
        },
      })
      if (result?.data?.salaryInsights) {
        setSalaryInsights(result?.data?.salaryInsights)
      }
    } catch {
      errorToast()
    }
  }

  return (
    <>
      <h2 className="mb-[8px] text-[16px] font-medium">
        {' '}
        Salary insights related to your application{' '}
      </h2>
      {!salaryInsights ? (
        <>
          <div className="mb-[16px] text-sm">
            Generate salary insights to figure out if you&apos;re being underpaid, your earning
            potential, and highest paying skills. Fill out the role and location for the most
            accurate data.
          </div>
          <div className="">
            <Upsell
              buttonText="Generate Salary Insights"
              loading={loading}
              onClick={fetchSalaryInsights}
              plan={plan}
              token={token}
            />
          </div>
        </>
      ) : (
        <div className="whitespace-pre-wrap">{salaryInsights}</div>
      )}
    </>
  )
}
