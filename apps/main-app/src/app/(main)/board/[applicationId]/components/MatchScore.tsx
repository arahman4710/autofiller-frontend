import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@canyon/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@canyon/ui/Select'
import { useToast } from '@canyon/ui/useToast'
import { cn } from '@canyon/ui/utils/cn'
import { CaretDown, CaretUp, CheckCircle, XCircle } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  ApplicationContent_UsersJobsDocument,
  FieldMessageType,
  MatchScore_MatchScoreDocument,
  MatchScore_ResumesDocument,
  SubscriptionPlanEnum,
  UsersJobsMatch,
} from '@gql/graphql'

import { Upsell } from '@/components/Upsell'

interface IMatchScoreProps {
  applicationId: string
  changeToLearnSkillsTab: () => void
  matchScoreData: Maybe<UsersJobsMatch>
  plan?: SubscriptionPlanEnum
  setMatchScoreData: (matchScoreData: Maybe<UsersJobsMatch>) => void
  token?: number
}

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}

const formatMatchField = (string) => {
  return string
    .split('_')
    .map((s) => capitalizeFirstLetter(s))
    .join(' ')
}

const successMessage = {
  education: 'Your education qualifies you for the minimum education listed on the job description',
  hard_skills:
    'Atleast one of your hard skills matches the hard skills listed on the job description',
  position: 'Your previous work experience qualifies you for this job title',
}

const MatchLevelIcon = ({ matchLevel }: { matchLevel: string }) => {
  return (
    <div className="flex items-center">
      <p className="mr-1"> {capitalizeFirstLetter(matchLevel.toLowerCase())} </p>
    </div>
  )
}

const MatchesIcon = ({ match }: { match: FieldMessageType }) => {
  if (match.errorMessage) {
    return <XCircle className="text-red-500" size={20} />
  } else {
    return <CheckCircle className="text-green-500" size={20} />
  }
}

const MatchPanel = ({
  children,
  match,
  title,
}: {
  children: React.ReactNode
  match: FieldMessageType
  title: string
}) => {
  const [open, setOpen] = useState(false)

  const handlePanelOpenToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <div className="bg-background-secondary flex h-fit flex-col rounded-md border border-transparent">
      <div
        className={cn(
          'flex flex-row justify-between px-6 py-3 text-sm',
          open ? 'border-border-secondary border-b' : null
        )}
      >
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="flex items-center">
            <h2>{title}</h2>
            <span className="ml-1">
              <MatchesIcon match={match} />
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <Button onClick={handlePanelOpenToggle} size="icon" variant="ghost">
            {open ? <CaretUp /> : <CaretDown />}
          </Button>
        </div>
      </div>
      {open ? <div className="flex flex-col px-6 pb-6 pt-4 text-sm">{children}</div> : null}
    </div>
  )
}

export const MatchScore = ({
  applicationId,
  changeToLearnSkillsTab,
  matchScoreData,
  plan,
  setMatchScoreData,
  token,
}: IMatchScoreProps) => {
  const [resumeId, setResumeId] = useState('')
  const { errorToast } = useToast()
  const router = useRouter()

  const { data: resumesData } = useQuery(MatchScore_ResumesDocument, {
    variables: {
      archived: false,
    },
  })
  const resumes = resumesData?.resumes ?? []
  if (!resumeId && resumes.length > 0) {
    setResumeId(resumes[0]?.id)
  }

  const [matchScoreMutation, { loading }] = useMutation(MatchScore_MatchScoreDocument, {
    refetchQueries: [ApplicationContent_UsersJobsDocument],
  })

  const fetchMatchScore = async () => {
    try {
      const result = await matchScoreMutation({
        variables: {
          resumeId: resumeId,
          usersJobId: applicationId,
        },
      })
      if (result?.data?.matchScore) {
        setMatchScoreData(result?.data?.matchScore)
      }
    } catch {
      errorToast()
    }
  }

  return (
    <>
      {!matchScoreData ? (
        <>
          <h2 className="mb-[8px] text-[16px] font-medium">
            {' '}
            ATS match score related to your application{' '}
          </h2>
          <div className="mb-[16px] text-sm">
            Our match tool simulates an ATS (applicant tracking system) to calculate the match score
            between your resume and this application.
            <br /> <br />
            {resumes.length > 0
              ? 'Choose a resume to get started.'
              : 'Create a resume first to use this feature.'}
          </div>
          {resumes.length === 0 ? (
            <div>
              <Button onClick={() => router.push('/resumes')} variant="cta">
                Create Resume
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Select onValueChange={setResumeId} value={resumeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resume to get started" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="">
                <Upsell
                  buttonText="Calculate match score"
                  disabled={resumes.length == 0}
                  loading={loading}
                  onClick={fetchMatchScore}
                  plan={plan}
                  token={token}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <div className="mb-4 flex items-center text-lg">
            <p className="pr-2"> Match level: </p>
            <MatchLevelIcon matchLevel={matchScoreData?.matchLevel} />
          </div>
          <div className="flex flex-col gap-4">
            {matchScoreData.matches.map((match) => (
              <MatchPanel key={match.field} match={match} title={formatMatchField(match.field)}>
                <div>
                  <span>
                    {!match.errorMessage ? successMessage[match.field] : match.errorMessage}
                  </span>
                  {match.field == 'hard_skills' && match.errorMessage && (
                    <span>
                      . Check out the{' '}
                      <a
                        className="cursor-pointer text-blue-500 underline"
                        onClick={changeToLearnSkillsTab}
                      >
                        Learn Skills
                      </a>{' '}
                      tab for more resources to learn
                      {matchScoreData.hardSkills.length > 0
                        ? ' the missing skills'
                        : ' relevant skills'}
                    </span>
                  )}
                  {match.field == 'position' && match.errorMessage && (
                    <p className="mt-2">
                      Even if you may not have the experience required, you can make up for it by
                      acing your interview!{' '}
                      <Link className="text-blue-500 underline" href="/interviews">
                        Practice a mock interview
                      </Link>
                      .
                    </p>
                  )}
                  {match.field == 'education' && match.errorMessage && (
                    <p className="mt-2">
                      Even if you may not have the experience required, you can make up for it by
                      acing your interview!{' '}
                      <Link className="text-blue-500 underline" href="/interviews">
                        Practice a mock interview
                      </Link>
                      .
                    </p>
                  )}
                  {match.field == 'hard_skills' && (
                    <>
                      <div className="mt-2">
                        Hard skills on job description:{' '}
                        {matchScoreData.hardSkills.length > 0
                          ? matchScoreData.hardSkills.join(', ')
                          : 'None'}
                      </div>
                      <div className="mt-2">
                        Skills on resume:{' '}
                        {resumes
                          .find((resume) => resume.id === resumeId)
                          ?.groupedSkills.flatMap((groupedSkill) => groupedSkill.skills)
                          .join(', ')}
                      </div>
                    </>
                  )}
                </div>
              </MatchPanel>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
