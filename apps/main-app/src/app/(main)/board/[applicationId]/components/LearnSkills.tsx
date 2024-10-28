'use client'

import { useRef, useState } from 'react'

import { useMutation, useSubscription } from '@apollo/client'
import { useToast } from '@canyon/ui/useToast'
import Markdown from 'react-markdown'

import {
  ApplicationContent_UsersJobsDocument,
  LearnSkills_LearnSkillsDocument,
  LearnSkillsPayload,
  LearnSkillsSubscriptionDocument,
  SubscriptionPlanEnum,
} from '@gql/graphql'

import { Upsell } from '@/components/Upsell'

interface ILearnSkillsProps {
  applicationId: string
  plan?: SubscriptionPlanEnum
  token?: number
}

export const LearnSkills = ({ applicationId, plan, token }: ILearnSkillsProps) => {
  const refLearnSkillsArray = useRef<LearnSkillsPayload[]>([])
  const [learnSkills, setLearnSkills] = useState('')
  const [learnSkillsRequestId, setLearnSkillsRequestId] = useState('')
  const { errorToast } = useToast()

  const [learnSkillsMutation, { loading }] = useMutation(LearnSkills_LearnSkillsDocument, {
    refetchQueries: [ApplicationContent_UsersJobsDocument],
  })

  const compareSubscriptionData = (a: LearnSkillsPayload, b: LearnSkillsPayload) => {
    return (a.i || 0) - (b.i || 0)
  }

  useSubscription(LearnSkillsSubscriptionDocument, {
    onData: ({ data: { data } }) => {
      if (data?.learnSkills?.initial == true) {
        setLearnSkills('')
        setLearnSkillsRequestId(data?.learnSkills?.requestId)
      }
      if (
        data?.learnSkills?.content &&
        data?.learnSkills.usersJobId == applicationId &&
        data?.learnSkills.requestId == learnSkillsRequestId
      ) {
        refLearnSkillsArray.current.push(data.learnSkills)
        refLearnSkillsArray.current.sort(compareSubscriptionData)
        setLearnSkills(refLearnSkillsArray.current.map((c) => c.content).join(''))
      }
    },
    variables: {},
  })

  const fetchLearnSkills = async () => {
    try {
      const result = await learnSkillsMutation({
        variables: {
          usersJobId: applicationId,
        },
      })
      if (result?.data?.learnSkills?.isSync == true) {
        setLearnSkills(result?.data?.learnSkills?.result)
      }
    } catch {
      errorToast()
    }
  }

  return (
    <>
      <h2 className="mb-[8px] text-[16px] font-medium">
        {' '}
        Lesson plan related to your application{' '}
      </h2>
      {!learnSkills ? (
        <>
          <div className="mb-[16px] text-sm">
            Generate a lesson plan to learn skills for the job. Fill out the role and job
            description for the most accurate data.
          </div>
          <div className="">
            <Upsell
              buttonText="Generate lesson plan"
              loading={loading}
              onClick={fetchLearnSkills}
              plan={plan}
              token={token}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col whitespace-pre-wrap [&>h1]:mb-4 [&>h2]:mb-2 [&>ul]:list-decimal [&>ul]:pl-4 [&_a]:text-blue-500 [&_a]:underline">
          {learnSkills ? <Markdown>{learnSkills}</Markdown> : null}
        </div>
      )}
    </>
  )
}
