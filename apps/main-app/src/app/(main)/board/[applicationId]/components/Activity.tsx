import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '@canyon/ui/Timeline'
import { formatDate } from '@canyon/utils'

import {
  UserJobsActivityFragment,
  UsersJobsInterviewStepEnum,
  UsersJobsRejectedStageEnum,
} from '@gql/graphql'

import { TabContentContainer } from './TabContentContainer'

interface IActivityProps {
  application: UserJobsActivityFragment
}

type TActivityType = 'applied' | 'created' | 'interview' | 'offer' | 'rejected'

export const Activity = ({ application }: IActivityProps) => {
  const interviewStepText: Record<UsersJobsInterviewStepEnum, string> = {
    [UsersJobsInterviewStepEnum.IntroScreen]: 'Intro Screen',
    [UsersJobsInterviewStepEnum.Onsite]: 'Onsite',
    [UsersJobsInterviewStepEnum.PhoneScreen]: 'Phone Screen',
  }

  const rejectedStageText: Record<UsersJobsRejectedStageEnum, string> = {
    [UsersJobsRejectedStageEnum.Application]: 'Application',
    [UsersJobsRejectedStageEnum.Interview]: 'Interview',
    [UsersJobsRejectedStageEnum.Reference]: 'Reference',
  }

  const activityItems: { date: string; title: string; type: TActivityType }[] = [
    {
      date: application.createdAt,
      title: 'Created Application',
      type: 'created',
    },
    {
      date: application.interviewedAt,
      title: application.interviewStep
        ? `Interview – ${interviewStepText[application.interviewStep]}`
        : 'Interview',
      type: 'interview',
    },
    {
      date: application.offerAt,
      title: 'Offer',
      type: 'offer',
    },
    {
      date: application.rejectedAt,
      title: application.rejectedStage
        ? `Rejected – ${rejectedStageText[application.rejectedStage]}`
        : 'Rejected',
      type: 'rejected',
    },
    {
      date: application.appliedAt,
      title: 'Applied',
      type: 'applied',
    },
  ]

  const sortedActivityItems = activityItems
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .filter((item) => item.date)

  return (
    <TabContentContainer title="Activity Timeline">
      <Timeline>
        {sortedActivityItems.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === sortedActivityItems.length - 1

          return (
            <TimelineItem key={`${item.date}-${item.type}`}>
              <TimelineHeading>{item.title}</TimelineHeading>
              <TimelineDot status={isFirst ? 'current' : 'default'} />
              {!isLast && <TimelineLine />}
              <TimelineContent className="text-sm">
                {formatDate(item.date, 'MMMM d, yyyy')}
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </TabContentContainer>
  )
}
