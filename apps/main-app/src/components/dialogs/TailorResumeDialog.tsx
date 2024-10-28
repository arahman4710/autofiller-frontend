import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Alert, AlertDescription, AlertTitle } from '@canyon/ui/Alert'
import { Button } from '@canyon/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogScreen,
  DialogScreenProvider,
} from '@canyon/ui/Dialog'
import { InputChips } from '@canyon/ui/InputChips'
import {
  VerticalGroup,
  VerticalGroupColumn,
  VerticalGroupDescription,
  VerticalGroupRow,
  VerticalGroupTitle,
} from '@canyon/ui/VerticalGroup'
import { useToast } from '@canyon/ui/useToast'
import { AsteriskSimple, Info } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  ResumesList_ResumesDocument,
  TailorResumeDialog_CreateUsersJobDocument,
  TailorResumeDialog_FetchJobKeywordsDocument,
  TailorResumeDialog_FetchMissingSkillsOfJobResumeDocument,
  TailorResumeDialog_OptimizeResumeForJobDocument,
} from '@gql/graphql'

import { ApplicationSelect } from '@/components/ApplicationSelect'
import { ResumesSelect } from '@/components/ResumesSelect'
import { SuggestedChips } from '@/components/SuggestedChips'
import {
  CONDENSED_APPLICATION_FORM_ID,
  CondensedApplicationForm,
} from '@/forms/CondensedApplicationForm'
import { useApplicationForm } from '@/forms/hooks/useApplicationForm'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import { ATSInfoTooltip } from '../info-tooltips/ATSInfoTooltip'

interface ITailorResumeDialogProps {
  applicationId?: string
  open: boolean
  resumeId?: string
  setOpen: (open: boolean) => void
  showResumeSelection?: boolean
}

export const TailorResumeDialog = ({
  applicationId,
  open,
  resumeId,
  setOpen,
  showResumeSelection,
}: ITailorResumeDialogProps) => {
  const router = useRouter()
  const { errorToast, toast } = useToast()
  const { isPaidPlan } = useCurrentUser()
  const upgradePlanDialog = useUpgradePlanDialog()

  const [selectedResumeId, setSelectedResumeId] = useState<string>(resumeId ?? '')
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>(applicationId ?? '')
  const [currentScreen, setCurrentScreen] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [suggestedJobKeywords, setSuggestedJobKeywords] = useState<string[]>([])
  const [selectedJobKeywords, setSelectedJobKeywords] = useState<string[]>([])

  const [missingSkills, setMissingSkills] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])

  const { form, resetForm } = useApplicationForm()

  const reset = () => {
    resetForm()
    setSelectedApplicationId(applicationId ?? '')
    setSelectedResumeId(resumeId ?? '')
    setCurrentScreen(0)

    setSelectedJobKeywords([])
    setSuggestedJobKeywords([])
    setMissingSkills([])
    setSkills([])
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      reset()
    }

    setOpen(open)
  }

  const isCreateNewApplication = selectedApplicationId === 'create'
  const [createApplication] = useMutation(TailorResumeDialog_CreateUsersJobDocument, {
    variables: {
      companyName: form.getValues().company,
      jobDetails: form.getValues().jobDetails,
      position: form.getValues().position,
      status: form.getValues().status,
    },
  })

  const [fetchJobKeywords] = useMutation(TailorResumeDialog_FetchJobKeywordsDocument)
  const [fetchMissingSkillsOfJobResume] = useMutation(
    TailorResumeDialog_FetchMissingSkillsOfJobResumeDocument
  )

  const handleFetchJobKeywordsAndMissingSkills = async ({
    applicationId,
  }: {
    applicationId: string
  }) => {
    try {
      const { data: keywordsData } = await fetchJobKeywords({
        variables: {
          usersJobId: applicationId,
        },
      })

      const { data: missingSkillsData } = await fetchMissingSkillsOfJobResume({
        variables: {
          resumeId: selectedResumeId,
          usersJobId: applicationId,
        },
      })

      setSuggestedJobKeywords(keywordsData?.fetchJobKeywords ?? [])
      setMissingSkills(missingSkillsData?.fetchMissingSkillsOfJobResume ?? [])
    } catch (error) {
      errorToast({ description: 'There was an error fetching job keywords and missing skills.' })
    }
  }

  const handleCreationApplicationSubmit = async () => {
    setIsLoading(true)

    try {
      const { data } = await createApplication()

      if (data?.createUsersJob) {
        toast({ title: 'New job application created 🎉' })

        await handleFetchJobKeywordsAndMissingSkills({
          applicationId: data?.createUsersJob.id ?? '',
        })

        setCurrentScreen(1)
        resetForm()
      }
    } catch (error) {
      errorToast({ description: 'There was an error creating the application.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInitialScreenSubmit = async () => {
    setIsLoading(true)

    try {
      await handleFetchJobKeywordsAndMissingSkills({ applicationId: selectedApplicationId })

      setCurrentScreen(1)
    } finally {
      setIsLoading(false)
    }
  }

  const enableApplicationScreenContinueButton =
    (isCreateNewApplication && form.formState.isValid) ||
    (selectedApplicationId !== '' && selectedResumeId !== '')

  const [optimizeResumeForJob] = useMutation(TailorResumeDialog_OptimizeResumeForJobDocument, {
    refetchQueries: [
      {
        query: ResumesList_ResumesDocument,
        variables: {
          aiGenerated: true,
          archived: false,
        },
      },
    ],
  })

  const handleOptimizeResumeForJob = async () => {
    if (!isPaidPlan) {
      upgradePlanDialog.setOpen(true)
      return
    }

    setIsLoading(true)

    try {
      const { data } = await optimizeResumeForJob({
        variables: {
          keywords: selectedJobKeywords,
          resumeId: selectedResumeId,
          skills,
          usersJobId: selectedApplicationId,
        },
      })

      if (data?.optimizeResumeForJob) {
        handleDialogOpenChange(false)
        router.push(`/resumes/${data?.optimizeResumeForJob?.id}`)
      }
    } catch (error) {
      errorToast({ description: 'There was an error optimizing your resume.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedKeywordAdd = (keyword: string) => {
    setSelectedJobKeywords([...selectedJobKeywords, keyword])
    setSuggestedJobKeywords(
      suggestedJobKeywords.filter((suggestedKeyword) => suggestedKeyword !== keyword)
    )
  }

  const handleSuggestedSkillAdd = (skill: string) => {
    setSkills([...skills, skill])
    setMissingSkills(missingSkills.filter((suggestedSkill) => suggestedSkill !== skill))
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange} open={open}>
      <DialogScreenProvider currentScreenIndex={currentScreen}>
        <DialogContent
          className="max-w-[700px]"
          title="Optimize Resume for Job Application"
          titleIcon={<AsteriskSimple />}
        >
          <DialogScreen screenNumber={0}>
            <div className="max-h-[600px] overflow-y-auto">
              <Alert className="mb-4" variant="information">
                <Info size={16} />
                <AlertTitle>Improve Your Odds</AlertTitle>
                <AlertDescription>
                  <span>
                    20% of resumes get filtered out of <ATSInfoTooltip plural variant="info" /> due
                    to missing keywords.
                  </span>
                </AlertDescription>
              </Alert>
              <VerticalGroup className="gap-10">
                {showResumeSelection && (
                  <VerticalGroupRow>
                    <VerticalGroupColumn>
                      <VerticalGroupTitle>Base Resume</VerticalGroupTitle>
                      <VerticalGroupDescription>
                        Choose which resume to use as the source to tailor your resume to.
                      </VerticalGroupDescription>
                    </VerticalGroupColumn>
                    <VerticalGroupColumn className="w-[40%]">
                      <ResumesSelect
                        onValueChange={setSelectedResumeId}
                        optimizedResumes={false}
                        value={selectedResumeId}
                      />
                    </VerticalGroupColumn>
                  </VerticalGroupRow>
                )}
                <VerticalGroupColumn>
                  <VerticalGroupTitle>Job Application Source</VerticalGroupTitle>
                  <VerticalGroupDescription>
                    Choose which job application to tailor your resume to. Applications with job
                    descriptions will be best suited for optimization.
                  </VerticalGroupDescription>
                  <div className="text-muted-foreground mt-4 flex flex-row items-center gap-2 text-sm">
                    <MissingDescriptionDot />
                    <span>– Denotes an application without a job description filled</span>
                  </div>
                  <ApplicationSelect
                    className="mt-2"
                    onValueChange={setSelectedApplicationId}
                    selectItemAppend={(application) =>
                      !application.jobDetails?.length ? (
                        <MissingDescriptionDot />
                      ) : (
                        <DescriptionAvailableDot />
                      )
                    }
                    value={selectedApplicationId}
                  />
                </VerticalGroupColumn>
                {isCreateNewApplication && (
                  <CondensedApplicationForm
                    form={form}
                    onSubmit={handleCreationApplicationSubmit}
                  />
                )}
              </VerticalGroup>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {isCreateNewApplication ? (
                <Button
                  disabled={!enableApplicationScreenContinueButton}
                  form={CONDENSED_APPLICATION_FORM_ID}
                  loading={isLoading}
                  type="submit"
                  variant="cta"
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={!enableApplicationScreenContinueButton}
                  loading={isLoading}
                  onClick={handleInitialScreenSubmit}
                  variant="cta"
                >
                  Next
                </Button>
              )}
            </DialogFooter>
          </DialogScreen>
          <DialogScreen screenNumber={1}>
            <VerticalGroup className="max-h-[600px] gap-8 overflow-y-auto">
              <VerticalGroupColumn>
                <VerticalGroupTitle>Job Keywords</VerticalGroupTitle>
                <VerticalGroupDescription>
                  Add keywords from the job description to your resume
                </VerticalGroupDescription>
                <InputChips
                  chips={selectedJobKeywords}
                  disableDrag={true}
                  onChange={setSelectedJobKeywords}
                  placeholder="Type a keyword and press enter to add"
                />
                <SuggestedChips
                  chips={suggestedJobKeywords}
                  className={selectedJobKeywords?.length > 0 ? 'mt-2' : ''}
                  emptyMessage={'No keyword suggestions available.'}
                  onSelect={handleSuggestedKeywordAdd}
                  title="Keyword Suggestions"
                />
              </VerticalGroupColumn>
              {missingSkills?.length > 0 && (
                <VerticalGroupColumn>
                  <VerticalGroupTitle>Missing Skills</VerticalGroupTitle>
                  <VerticalGroupDescription>
                    Skills found in the job description that are missing from your resume
                  </VerticalGroupDescription>
                  <InputChips
                    chips={skills}
                    disableDrag={true}
                    onChange={setSkills}
                    placeholder="Type a skill and press enter to add"
                  />
                  <SuggestedChips
                    chips={missingSkills}
                    className={skills?.length > 0 ? 'mt-2' : ''}
                    emptyMessage="No missing skill suggestions remaining."
                    onSelect={handleSuggestedSkillAdd}
                    title="Missing Skill Suggestions"
                  />
                </VerticalGroupColumn>
              )}
            </VerticalGroup>
            <DialogFooter>
              <Button onClick={() => setCurrentScreen(0)} variant="outline">
                Back
              </Button>
              <Button loading={isLoading} onClick={handleOptimizeResumeForJob} variant="cta">
                Optimize Resume
              </Button>
            </DialogFooter>
          </DialogScreen>
        </DialogContent>
      </DialogScreenProvider>
    </Dialog>
  )
}

const MissingDescriptionDot = () => <div className="h-1 w-1 rounded-full bg-yellow-400" />
const DescriptionAvailableDot = () => <div className="h-1 w-1 rounded-full bg-green-400" />
