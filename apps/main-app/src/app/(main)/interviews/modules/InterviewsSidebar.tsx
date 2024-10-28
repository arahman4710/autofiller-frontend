'use client'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Gauge } from '@canyon/ui/Gauge'
import { Skeleton } from '@canyon/ui/Skeleton'
import { cn } from '@canyon/ui/utils/cn'
import { useParams, useRouter } from 'next/navigation'

import { InterviewsSidebar_InterviewsDocument } from '@gql/graphql'

import { interviewTypeToText } from '../helpers/interviewTypeToText'

export const InterviewsSidebar = () => {
  const { data, loading } = useQuery(InterviewsSidebar_InterviewsDocument)
  const params = useParams<{ interviewId: string }>()
  const interviewId = params?.interviewId ?? ''

  const router = useRouter()

  if (loading) {
    return <InterviewSidebarSkeleton />
  }

  const handleInterviewClick = (interviewId: string) => {
    router.push(`/interviews/${interviewId}`)
  }

  const interviews = data?.interviews ?? []

  return (
    <Shell>
      {interviews?.length ? (
        <ul>
          {interviews.map(({ id, interviewType, jobTitle, score }) => (
            <li
              className={cn(
                'hover:bg-background/40 flex flex-row gap-3 rounded-md px-4 py-2',
                id === interviewId && 'bg-background/60'
              )}
              key={id}
              onClick={() => handleInterviewClick(id)}
            >
              {score ? <Gauge value={score} /> : <div className="w-[35px]" />}
              <div className="flex flex-col">
                <div>{jobTitle}</div>
                <div className="text-muted-foreground">{interviewTypeToText[interviewType]}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground px-4 py-2">No interviews.</div>
      )}
    </Shell>
  )
}

const Shell = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="border-border h-full min-w-80 cursor-pointer overflow-y-auto border-r px-2 py-3">
    {children}
  </div>
)

export const InterviewSidebarSkeleton = () => {
  const interviews = Array(5).fill(null)

  return (
    <Shell>
      <div className="px-4">
        {interviews.map((_, index) => (
          <Skeleton className="my-6 h-8 w-[75%]" key={index} />
        ))}
      </div>
    </Shell>
  )
}
