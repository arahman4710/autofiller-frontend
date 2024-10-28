'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Alert, AlertDescription, AlertTitle } from '@rag/ui/Alert'
import { Loader } from '@rag/ui/Loader'
import { Tabs, TabsContent } from '@rag/ui/Tabs'
import { useToast } from '@rag/ui/useToast'
import parse from 'html-react-parser'

import {
  ApplicationContent_UpdateUsersJobDocument,
  ApplicationContent_UsersJobsDocument,
  UsersJobsMatch,
  UsersJobsStatusEnum,
} from '@gql/graphql'

import { ArchivedBanner } from '@/components/ArchivedBanner'
import { FormSaveStatus } from '@/components/FormSaveStatus'
import { ApplicationForm } from '@/forms/ApplicationForm'
import { useApplicationForm } from '@/forms/hooks/useApplicationForm'
import { useApplicationFormReset } from '@/forms/hooks/useApplicationFormReset'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'
import { useQueryParams } from '@/hooks/useQueryParams'

import { Activity } from '../components/Activity'
import { LearnSkills } from '../components/LearnSkills'
import { MatchScore } from '../components/MatchScore'
import { OptimizeResume } from '../components/OptimizeResume'
import { SalaryInsights } from '../components/SalaryInsights'
import { TabsNavigation } from '../components/TabsNavigation'

interface IApplicationContentProps {
  applicationId: string
}

const Shell = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className="mt-[-0.5rem] flex h-full min-h-screen w-full flex-auto flex-row">
    {children}
  </div>
)

const AiTabContainer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="max-w-[600px] rounded-md p-6 text-white">
    <div className="flex flex-col text-sm">{children}</div>
  </div>
)

export const ApplicationContent = ({ applicationId }: IApplicationContentProps) => {
  const { isAdvisoryClient } = useCurrentUser()
  const { errorToast, successToast } = useToast()

  const { queryParams, setQueryParams } = useQueryParams()
  const [tabValue, setTabValue] = useState(queryParams?.get('tab') || 'activity')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [matchScoreData, setMatchScoreData] = useState<Maybe<UsersJobsMatch>>(null)
  const [salaryInsights, setSalaryInsights] = useState('')

  const [updateUsersJob] = useMutation(ApplicationContent_UpdateUsersJobDocument)
  const { data } = useSuspenseQuery(ApplicationContent_UsersJobsDocument, {
    variables: {
      usersJobIds: [applicationId],
    },
  })

  const application = data?.usersJobs[0]
  const userPlan = data?.user?.plan
  const resumes = data?.resumes || []
  const tokenSalaryInsights = data?.user?.tokenSalaryInsights
  const tokenJobMatch = data?.user?.tokenJobMatch
  const tokenLearnSkills = data?.user?.tokenLearnSkills

  const {
    form,
    helpers: { sanitizedSalary },
    onChangeHandlers: { salaryOnChange },
    onKeyDownHandlers: { salaryOnKeyDown },
  } = useApplicationForm()

  useApplicationFormReset({ application, form })

  if (!application)
    return (
      <Shell>
        <Loader />
      </Shell>
    )

  const handleOnSubmit = async () => {
    setIsLoading(true)

    const formValues = form.getValues()

    const rejectedStage =
      formValues.status === UsersJobsStatusEnum.Rejected ? formValues.rejectedStage : null

    const interviewStep =
      formValues.status === UsersJobsStatusEnum.Interview ? formValues.interviewStep : null

    try {
      const { data } = await updateUsersJob({
        variables: {
          companyName: formValues.company,
          id: applicationId,
          interviewStep,
          isRemote: formValues.isRemote,
          jobDetails: formValues.jobDetails,
          location: formValues.location,
          notes: formValues.notes,
          payPeriod: formValues.payPeriod,
          position: formValues.position,
          rejectedStage,
          resumeId: formValues.resumeId,
          salaryMax: sanitizedSalary()['max'],
          salaryMin: sanitizedSalary()['min'],
          status: formValues.status,
          url: formValues.url,
        },
      })
    } catch (e) {
      errorToast()
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const { hasErrored, hasSubmitted, isSubmitting } = useFormAutoSave({
    defaultValues: application,
    form,
    onSubmit: handleOnSubmit,
  })

  const changeToLearnSkillsTab = () => {
    changeToTab('learnSkills')
  }

  const changeToTab = (tab) => {
    setTabValue(tab)
    setQueryParams({ tab })
  }

  const isApplicationArchived = application?.archived
  const applicationInstructions = application?.applicationInstructions
  const applicationPartner = `${application?.partnerCreatedByUser?.firstName} ${application?.partnerCreatedByUser?.lastName}`

  return (
    <Shell>
      <div className={`hidden w-[62%] flex-row py-2 md:flex`}>
        <Tabs className="w-full" onValueChange={(tab) => changeToTab(tab)} value={tabValue}>
          <TabsNavigation />
          <TabsContent value="salaryInsights">
            <AiTabContainer>
              <SalaryInsights
                applicationId={applicationId}
                plan={userPlan}
                salaryInsights={salaryInsights}
                setSalaryInsights={setSalaryInsights}
                token={tokenSalaryInsights}
              />
            </AiTabContainer>
          </TabsContent>
          <TabsContent value="learnSkills">
            <AiTabContainer>
              <LearnSkills applicationId={applicationId} plan={userPlan} token={tokenLearnSkills} />
            </AiTabContainer>
          </TabsContent>
          <TabsContent value="matchScore">
            <AiTabContainer>
              <MatchScore
                applicationId={applicationId}
                changeToLearnSkillsTab={changeToLearnSkillsTab}
                matchScoreData={matchScoreData}
                plan={userPlan}
                setMatchScoreData={setMatchScoreData}
                token={tokenJobMatch}
              />
            </AiTabContainer>
          </TabsContent>
          <TabsContent value="optimizeResume">
            <AiTabContainer>
              <OptimizeResume applicationId={applicationId} plan={userPlan} />
            </AiTabContainer>
          </TabsContent>
          <TabsContent value="activity">
            <Activity application={application} />
          </TabsContent>
        </Tabs>
      </div>
      <div
        className={`border-border flex h-fit w-[38%] min-w-[250px] flex-auto flex-col border-l px-6 pb-6 pt-3 md:h-full`}
      >
        <div className="mb-3 flex items-center gap-2">
          Application Details
          <FormSaveStatus hasErrored={hasErrored} hasSaved={hasSubmitted} isSaving={isSubmitting} />
        </div>
        <div className="min-w-full">
          {isApplicationArchived ? (
            <ArchivedBanner>
              This application has been archived. Restore it to make it active and editable.
            </ArchivedBanner>
          ) : null}
          {application?.partnerCreatedByUser && (
            <Alert className="my-2">
              <AlertTitle className="text-muted-foreground">
                <span className="font-semibold text-white">{applicationPartner}</span> shared this
                job posting with you.
              </AlertTitle>
            </Alert>
          )}
          {isAdvisoryClient && applicationInstructions && (
            <Alert className="my-2 max-h-[200px] overflow-y-auto" variant="information">
              <AlertTitle>How to Apply</AlertTitle>
              <AlertDescription className="prose prose-invert prose-sm prose-slate leading-none">
                {parse(applicationInstructions)}
              </AlertDescription>
            </Alert>
          )}
          <ApplicationForm
            form={form}
            isArchived={isApplicationArchived}
            isUpdating={true}
            onSubmit={handleOnSubmit}
            resumes={resumes}
            salaryOnChange={salaryOnChange}
            salaryOnKeyDown={salaryOnKeyDown}
          />
        </div>
      </div>
    </Shell>
  )
}
