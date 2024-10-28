'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { skipToken, useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Dot } from '@rag/ui/Dot'
import { EnhanceAIButton } from '@rag/ui/EnhanceAIButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Gauge } from '@rag/ui/Gauge'
import { Input } from '@rag/ui/Input'
import { InputChips } from '@rag/ui/InputChips'
import { MonthDatePicker } from '@rag/ui/MonthDatePicker'
import { NumberInput } from '@rag/ui/NumberInput'
import { PhoneNumberInput } from '@rag/ui/PhoneNumberInput'
import { Popover, PopoverContent, PopoverTrigger } from '@rag/ui/Popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { SortableList } from '@rag/ui/SortableList'
import { Switch } from '@rag/ui/Switch'
import { TTiptapRef, Tiptap } from '@rag/ui/Tiptap'
import { Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'
import { WarningTooltip } from '@rag/ui/WarningTooltip'
import { cn } from '@rag/ui/utils'
import { extractListItemEl } from '@rag/utils'
import { AsteriskSimple, DownloadSimple, Info } from '@phosphor-icons/react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { usePreventScroll } from 'react-aria'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Document, Page, pdfjs } from 'react-pdf'

import {
  FieldMessageType,
  ResumeBuilder_CreateResumeUnauthenticatedDocument,
  ResumeBuilder_GetClientResumeDocument,
  ResumeBuilder_GetResumeDocument,
  ResumeBuilder_GetResumeQuery,
  ResumeBuilder_GetResumeUnauthenticatedDocument,
  ResumeBuilder_GetResumeUnauthenticatedQuery,
  ResumeBuilder_ScoreResumeDocument,
  ResumeBuilder_UpdateResumeDocument,
  ResumeBuilder_UpdateResumeUnauthenticatedDocument,
  ResumeDocumentType,
  ResumeSortableSections,
  ResumesScoreType,
  ResumesTemplateColorEnum,
  ResumesTemplateEnum,
  ResumesWorkExperienceInputObject,
  ResumesWorkPositionInputObject,
} from '@gql/graphql'

import { useDevStore } from '@/__dev__/store'
import { ArchivedBanner } from '@/components/ArchivedBanner'
import { EditorPanel } from '@/components/EditorPanel'
import { EnhanceAchievementDialog } from '@/components/dialogs/EnhanceAchievementDialog'
import { EnhanceSummaryDialog } from '@/components/dialogs/EnhanceSummaryDialog'
import { TailorResumeDialog } from '@/components/dialogs/TailorResumeDialog'
import { defaultValues, useResumeBuilderForm } from '@/forms/hooks/useResumeBuilderForm'
import { useResumeBuilderFormReset } from '@/forms/hooks/useResumeBuilderFormReset'
import { TResumeBuilderForm } from '@/forms/types'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'
import { useFormValues } from '@/hooks/useFormValues'
import { trackEvent } from '@/lib/utils/analytics'
import { resumeInitialValues, useResumeBuilderStoreId } from '@/store/resumeBuilderStore'
import { TPublicResume } from '@/store/resumeBuilderStore'

import { ResumeDocument } from './components/ResumeDocument'
import { SettingsPanel } from './components/SettingsPanel'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer))

interface IResumeBuilderProps {
  clientId?: string
  isPublic?: boolean
  resumeId?: string
  viewMode?: boolean
}

type TResume =
  | ResumeBuilder_GetResumeQuery['resumes'][0]
  | ResumeBuilder_GetResumeUnauthenticatedQuery['resumeUnauthenticated']
  | TPublicResume

export const ResumeBuilder = ({
  clientId,
  isPublic = false,
  resumeId,
  viewMode = false,
}: IResumeBuilderProps) => {
  usePreventScroll()

  const form = useResumeBuilderForm()
  const router = useRouter()
  const {
    clearResumeId,
    resumeId: storedResumeIdStorage,
    setResumeId: setStoredResumeIdStorage,
  } = useResumeBuilderStoreId((state) => ({
    clearResumeId: state.clearResumeId,
    resumeId: state.resumeId,
    setResumeId: state.setResumeId,
  }))

  const [isTailorResumeDialogOpen, setIsTailorResumeDialogOpen] = useState<boolean>(false)
  const [isPDFDownloading, setIsPDFDownloading] = useState<boolean>(false)
  const [showOriginalViewMode, setShowOriginalViewMode] = useState<string>('builder')
  const storedResumeIdRef = useRef<string | undefined>(undefined)
  const upgradePlanDialog = useUpgradePlanDialog()
  const { isPaidPlan } = useCurrentUser()
  const [selectedTemplate, setSelectedTemplate] = useState<ResumesTemplateEnum>(
    ResumesTemplateEnum.Harvard
  )
  const [selectedTemplateColorEnum, setSelectedTemplateColorEnum] = useState<
    Maybe<ResumesTemplateColorEnum> | undefined
  >(ResumesTemplateColorEnum.HarvardLight)

  if (storedResumeIdStorage) {
    storedResumeIdRef.current = storedResumeIdStorage
  }

  const { data: session } = useSession()
  const user = session?.user

  const { data: getResumeAuthData } = useSuspenseQuery(
    ResumeBuilder_GetResumeDocument,
    !isPublic && !viewMode
      ? {
          variables: { resumeId: [resumeId ?? ''] },
        }
      : skipToken
  )

  const { data: getResumeUnauthData } = useSuspenseQuery(
    ResumeBuilder_GetResumeUnauthenticatedDocument,
    isPublic && storedResumeIdStorage && !viewMode
      ? {
          variables: { id: storedResumeIdStorage },
        }
      : skipToken
  )

  const { data: getClientResumeData } = useSuspenseQuery(
    ResumeBuilder_GetClientResumeDocument,
    viewMode && clientId
      ? {
          variables: { clientId, resumeId: [resumeId ?? ''] },
        }
      : skipToken
  )

  const [updateResume] = useMutation(ResumeBuilder_UpdateResumeDocument)
  const [createResumeUnauthenticated] = useMutation(
    ResumeBuilder_CreateResumeUnauthenticatedDocument
  )
  const [updateResumeUnauthenticated] = useMutation(
    ResumeBuilder_UpdateResumeUnauthenticatedDocument,
    {
      onError: (err) => {
        clearResumeId()
        storedResumeIdRef.current = undefined
      },
    }
  )

  useEffect(() => {
    if (!resumeId && user) {
      router.push('/resumes')
    }
  }, [resumeId])

  const resume =
    (!isPublic ? getResumeAuthData?.resumes?.[0] : getResumeUnauthData?.resumeUnauthenticated) ||
    getClientResumeData?.clientResumes?.[0] ||
    resumeInitialValues
  const isArchived = isPublic ? false : resume?.archived ?? false
  const simpleAnalysis = isPublic ? [] : resume?.simpleAnalysis ?? []
  const disableSaving = isArchived || viewMode

  useResumeBuilderFormReset({ form, resume })

  const [getResumeScore, { data, loading: isResumeScoreLoading }] = useMutation(
    ResumeBuilder_ScoreResumeDocument,
    {
      variables: {
        id: resumeId ?? '',
      },
    }
  )

  const resumeScore = data?.scoreResume

  useEffect(() => {
    if (!isPublic && !viewMode) {
      getResumeScore()
      setSelectedTemplate(resume.template)
      setSelectedTemplateColorEnum(resume.templateColorEnum)
    }
  }, [resume, isPublic, viewMode])

  const onSubmit = async (state = {}) => {
    const formValues = form.getValues()
    const attributes = {
      certificationsAttributes: formValues.certificationsAttributes.map((certification, index) => ({
        ...certification,
        generatedId: undefined,
      })),
      courseworksAttributes: formValues.courseworksAttributes,
      educationsAttributes: formValues.educationsAttributes.map((education, index) => ({
        ...education,
        endDate: !formValues.educationsAttributes[index].currentlyInEducation
          ? education.endDate
          : null,
      })),
      email: formValues.email,
      firstName: formValues.firstName,
      groupedSkillsAttributes: formValues.groupedSkillsAttributes,
      hideCertifications: formValues.hideCertifications,
      hideCourseworks: formValues.hideCourseworks,
      hideEducations: formValues.hideEducations,
      hideInvolvements: formValues.hideInvolvements,
      hideProjects: formValues.hideProjects,
      hideSkills: formValues.hideSkills,
      hideSummary: formValues.hideSummary,
      hideWorkExperiences: formValues.hideWorkExperiences,
      involvementsAttributes: formValues.involvementsAttributes.map(
        (involvement, involvementIndex) => ({
          ...involvement,
          endDate: !formValues.involvementsAttributes[involvementIndex]
            .currentlyWorkingOnInvolvement
            ? involvement.endDate
            : null,
        })
      ),
      lastName: formValues.lastName,
      linkedinUrl: formValues.linkedinUrl,
      location: formValues.location,
      name: formValues.name,
      phoneNumber: formValues.phoneNumber,
      professionalSummary: formValues.professionalSummary,
      projectsAttributes: formValues.projectsAttributes.map((project, projectIndex) => ({
        ...project,
        endDate: !formValues.projectsAttributes[projectIndex].currentlyWorkingOnProject
          ? project.endDate
          : null,
      })),
      sectionsOrder: formValues.sectionsOrder,
      website: formValues.website,
      workExperiencesAttributes: formValues.workExperiencesAttributes.map(
        (workExperience, workExperienceIndex) => ({
          ...workExperience,
          workPositionsAttributes: workExperience.workPositionsAttributes.map(
            (position, positionIndex) => ({
              ...position,
              endDate: !formValues.workExperiencesAttributes[workExperienceIndex]
                .workPositionsAttributes[positionIndex].currentlyInPosition
                ? position.endDate
                : null,
            })
          ),
        })
      ),
      ...state,
    }

    if (isPublic) {
      const storedResumeId = storedResumeIdRef.current || storedResumeIdStorage
      if (!storedResumeId) {
        const createResumeUnauthenticatedResult = await createResumeUnauthenticated({
          variables: {
            attributes,
          },
        })
        const uniqueId =
          createResumeUnauthenticatedResult?.data?.createResumeUnauthenticated?.uniqueId
        if (uniqueId) {
          setStoredResumeIdStorage(uniqueId)
          storedResumeIdRef.current = uniqueId
          document.cookie = `resume-builder-id=${uniqueId}; SameSite=None; Secure`
        }
      } else {
        await updateResumeUnauthenticated({
          variables: {
            attributes,
            resumeUniqueId: storedResumeId,
          },
        })
      }
      return
    }

    await updateResume({
      variables: {
        attributes,
        resumeId: resumeId ?? '',
      },
    })
  }

  useFormAutoSave({
    defaultValues: resume,
    disabled: disableSaving,
    form,
    onSubmit,
  })

  const handleSectionVisibility = (
    fieldName:
      | 'hideCertifications'
      | 'hideCourseworks'
      | 'hideEducations'
      | 'hideInvolvements'
      | 'hideProjects'
      | 'hideSkills'
      | 'hideSummary'
      | 'hideWorkExperiences'
  ) => {
    const updatedState = !form.watch(fieldName)
    form.setValue(fieldName, updatedState)
    onSubmit()
  }

  const getSimplifiedAnalysis = (field: string) => {
    return simpleAnalysis.find((analysisField: FieldMessageType) => analysisField.field == field)
  }

  const downloadResumePDF = async (template, templateColorEnum) => {
    trackEvent('User clicked Download PDF button')

    if (isPublic) {
      return
    }

    setIsPDFDownloading(true)

    const blob = await pdf(
      <Form {...form}>
        <ResumeDocument
          formValues={form.getValues()}
          template={template}
          templateColorEnum={templateColorEnum}
        />
      </Form>
    ).toBlob()

    saveAs(blob, `${form.watch().name}.pdf`)

    setIsPDFDownloading(false)
  }

  const sectionsOrderPanelMap: Record<ResumeSortableSections, React.ReactNode> = {
    [ResumeSortableSections.Certifications]: (
      <CertificationFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideCertifications')}
        setIsSectionVisible={() => handleSectionVisibility('hideCertifications')}
      />
    ),
    [ResumeSortableSections.Courseworks]: (
      <CourseworkFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideCourseworks')}
        setIsSectionVisible={() => handleSectionVisibility('hideCourseworks')}
      />
    ),
    [ResumeSortableSections.Educations]: (
      <EducationFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideEducations')}
        setIsSectionVisible={() => handleSectionVisibility('hideEducations')}
      />
    ),
    [ResumeSortableSections.Involvements]: (
      <InvolvementFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideInvolvements')}
        setIsSectionVisible={() => handleSectionVisibility('hideInvolvements')}
      />
    ),
    [ResumeSortableSections.Projects]: (
      <ProjectFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideProjects')}
        setIsSectionVisible={() => handleSectionVisibility('hideProjects')}
      />
    ),
    [ResumeSortableSections.Skills]: (
      <SkillFieldPanel
        isArchived={isArchived}
        isSectionVisible={!form.watch('hideSkills')}
        setIsSectionVisible={() => handleSectionVisibility('hideSkills')}
      />
    ),
    [ResumeSortableSections.WorkExperiences]: (
      <WorkExperienceEditorPanel
        getSimplifiedAnalysis={getSimplifiedAnalysis}
        isArchived={isArchived}
        isPublic={isPublic}
        isSectionVisible={!form.watch('hideWorkExperiences')}
        onSubmit={onSubmit}
        resume={resume}
        setIsSectionVisible={() => handleSectionVisibility('hideWorkExperiences')}
        setShowUpgradePlanDialog={upgradePlanDialog.setOpen}
      />
    ),
  }

  const handleSectionsOrderChange = (newSectionsOrder: { id: string }[]) => {
    const order = newSectionsOrder.map((section) => section.id) as ResumeSortableSections[]

    form.setValue('sectionsOrder', order, { shouldDirty: true })
  }

  const handleTailorResumeOnClick = () => {
    setIsTailorResumeDialogOpen(true)
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          {isArchived ? (
            <ArchivedBanner className="mb-4">
              This resume has been archived. Restore it to make it active and editable.
            </ArchivedBanner>
          ) : null}
          <div className="mb-6 flex flex-row items-center justify-between gap-4 px-8">
            <div className="flex w-6/12 items-center justify-between overflow-hidden pr-4">
              <h1 className="truncate font-mono text-xl">{form.watch().name}</h1>
              {!isPublic && !viewMode && (
                <CanyonScore isLoading={isResumeScoreLoading} score={resumeScore} />
              )}
            </div>
            <div className="flex w-6/12 flex-row justify-end gap-2 pr-2">
              {!resume?.aiGenerated &&
                !viewMode &&
                (isPublic ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button leftIcon={<AsteriskSimple />} variant="outline">
                        Optimize Resume for Job
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[330px] px-4 py-6" side="top">
                      <SignUpPopoverComponent text="Sign up to tailor your resume to job and access the complete set of resume builder features." />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Button
                    leftIcon={<AsteriskSimple />}
                    onClick={handleTailorResumeOnClick}
                    variant="ai"
                  >
                    Optimize Resume for Job
                  </Button>
                ))}

              {viewMode &&
                resume?.documentUrl &&
                resume?.documentType == ResumeDocumentType.Pdf && (
                  <div>
                    <Select
                      defaultValue="builder"
                      onValueChange={setShowOriginalViewMode}
                      value={showOriginalViewMode}
                    >
                      <SelectTrigger className="select-none rounded-lg border-none bg-stone-700">
                        <SelectValue placeholder="Show builder PDF"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {<SelectItem value="original">Show original PDF</SelectItem>}
                        <SelectItem value="builder">Show builder PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              <Button
                leftIcon={<DownloadSimple />}
                loading={isPDFDownloading}
                onClick={() => downloadResumePDF(resume?.template, resume?.templateColorEnum)}
                size="sm"
                variant="cta"
              >
                <span className="lg:hidden">PDF</span>

                {isPublic ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <span className="hidden lg:inline">Download PDF</span>
                    </PopoverTrigger>
                    <PopoverContent className="w-[330px] px-4 py-6" side="top">
                      <SignUpPopoverComponent text="Sign up to download your resume and access the complete set of resume builder features." />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <span className="hidden lg:inline">Download PDF</span>
                )}
              </Button>
            </div>
          </div>
          <div
            className={cn(
              'flex h-[calc(100vh-170px)] w-full flex-row gap-10 overflow-y-auto px-8',
              viewMode ? 'justify-center' : 'justify-between'
            )}
          >
            {!viewMode && (
              <div className="flex w-6/12 flex-grow flex-col gap-4">
                <SettingsPanel
                  initialTemplate={resume.template}
                  initialTemplateColorEnum={resume.templateColorEnum}
                  isPublic={isPublic}
                  onChangeTemplate={setSelectedTemplate}
                  onChangeTemplateColorEnum={setSelectedTemplateColorEnum}
                  resumeId={resume.id ?? ''}
                  template={selectedTemplate}
                  templateColorEnum={selectedTemplateColorEnum}
                />
                <ProfileFieldPanel
                  getSimplifiedAnalysis={getSimplifiedAnalysis}
                  isArchived={isArchived}
                />
                <SummaryFieldPanel
                  getSimplifiedAnalysis={getSimplifiedAnalysis}
                  isArchived={isArchived}
                  isPublic={isPublic}
                  isSectionVisible={!form.watch('hideSummary')}
                  onSubmit={onSubmit}
                  resumeId={resumeId}
                  setIsSectionVisible={() => handleSectionVisibility('hideSummary')}
                  setShowUpgradePlanDialog={upgradePlanDialog.setOpen}
                />
                <SortableList
                  items={form.watch('sectionsOrder')?.map((section) => ({ id: section })) ?? []}
                  onChange={handleSectionsOrderChange}
                  renderItem={(item, isActive, index) => {
                    const section = form.watch('sectionsOrder')?.[index]

                    if (!section) return null

                    return (
                      <SortableList.Item id={item.id} isDraggableNode={false}>
                        {sectionsOrderPanelMap[section]}
                      </SortableList.Item>
                    )
                  }}
                />
              </div>
            )}
            <div className={cn('sticky top-0 flex justify-end', viewMode ? 'w-full' : 'w-6/12')}>
              <div className="w-full">
                <ResumeViewer
                  resume={resume}
                  showOriginalViewMode={showOriginalViewMode}
                  template={selectedTemplate}
                  templateColorEnum={selectedTemplateColorEnum}
                  viewMode={viewMode}
                />
              </div>
            </div>
            <button className="hidden" type="submit" />
          </div>
        </form>
      </Form>
      <TailorResumeDialog
        open={isTailorResumeDialogOpen}
        resumeId={resumeId ?? ''}
        setOpen={setIsTailorResumeDialogOpen}
      />
    </div>
  )
}

interface IDateRangeFieldsProps {
  disableEndDateRange?: Maybe<boolean>
  disabled?: boolean
  endDateFieldName?: string
  endDateLabel?: string
  startDateFieldName?: string
  startDateLabel?: string
}

const DateRangeFields = ({
  disableEndDateRange,
  disabled,
  endDateFieldName,
  endDateLabel = 'End Date',
  startDateFieldName,
  startDateLabel = 'Start Date',
}: IDateRangeFieldsProps) => {
  const form = useFormContext()
  const formValues = useFormValues<TResumeBuilderForm>()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (endDateFieldName && disableEndDateRange && formValues[endDateFieldName]) {
      form.setValue(endDateFieldName, null, { shouldDirty: true })
    }
  }, [disableEndDateRange, formValues])

  return (
    <div className="flex flex-row gap-4">
      {startDateFieldName && (
        <FormField
          control={form.control}
          name={startDateFieldName}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{startDateLabel}</FormLabel>
              <FormControl>
                <MonthDatePicker
                  calendarProps={{
                    maxYear: currentYear + 2,
                  }}
                  date={field.value}
                  disabled={disabled}
                  setDate={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {endDateFieldName && (
        <FormField
          control={form.control}
          name={endDateFieldName}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{endDateLabel}</FormLabel>
              <FormControl>
                <MonthDatePicker
                  calendarProps={{
                    maxYear: currentYear + 2,
                  }}
                  date={!disableEndDateRange ? field.value : null}
                  disabled={disableEndDateRange || disabled}
                  setDate={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}

const ResumeViewer = ({
  resume,
  showOriginalViewMode,
  template,
  templateColorEnum,
  viewMode,
}: {
  resume: TResume
  showOriginalViewMode: string
  template: ResumesTemplateEnum
  templateColorEnum: Maybe<ResumesTemplateColorEnum> | undefined
  viewMode: boolean
}) => {
  const formValues = useFormValues<TResumeBuilderForm>()
  const { pdfViewerEnabled } = useDevStore()
  const [numPages, setNumPages] = useState<number>()

  if (pdfViewerEnabled) {
    return (
      <PDFViewer showToolbar={false} style={{ border: 0, height: '880px', width: '700px' }}>
        <ResumeDocument
          formValues={formValues}
          template={template}
          templateColorEnum={templateColorEnum}
        />
      </PDFViewer>
    )
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    // Temporary until multi page support is added
    setNumPages(1)
  }

  if (
    viewMode &&
    showOriginalViewMode == 'original' &&
    resume?.documentUrl &&
    resume?.documentType == ResumeDocumentType.Pdf
  ) {
    return (
      <Document file={{ url: resume.documentUrl }} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
      </Document>
    )
  }

  return (
    <ResumeDocument
      formValues={formValues}
      template={template}
      templateColorEnum={templateColorEnum}
    />
  )
}

const ProfileFieldPanel = ({
  getSimplifiedAnalysis,
  isArchived,
}: {
  getSimplifiedAnalysis: (field: string) => FieldMessageType | undefined
  isArchived: boolean
}) => {
  const form = useFormContext()

  const candidateNameWarningMessage = getSimplifiedAnalysis('candidateName')?.errorMessage
  const locationWarningMessage = getSimplifiedAnalysis('location')?.errorMessage
  const emailWarningMessage = getSimplifiedAnalysis('email')?.errorMessage

  const hasWarningMessage =
    candidateNameWarningMessage || locationWarningMessage || emailWarningMessage

  return (
    <EditorPanel
      disableActions={isArchived}
      showDragHandle={false}
      subtitle="Enter your profile and contact information"
      title="Profile"
      warningMessage={
        hasWarningMessage
          ? 'One or more profile fields are missing. Check specific fields for more information'
          : null
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center leading-5">
                  First Name
                  <WarningTooltip warningMessage={candidateNameWarningMessage ?? ''} />
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center leading-5">
                  Email
                  <WarningTooltip warningMessage={emailWarningMessage ?? ''} />
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneNumberInput {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center leading-5">
                  City, State
                  <WarningTooltip warningMessage={locationWarningMessage ?? ''} />
                </FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem className="w-1/2 pr-2">
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isArchived} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const SummaryFieldPanel = ({
  getSimplifiedAnalysis,
  isArchived,
  isPublic,
  isSectionVisible,
  onSubmit,
  resumeId,
  setIsSectionVisible,
  setShowUpgradePlanDialog,
}: {
  getSimplifiedAnalysis: (field: string) => FieldMessageType | undefined
  isArchived: boolean
  isPublic: boolean
  isSectionVisible: boolean
  onSubmit: () => void
  resumeId?: string
  setIsSectionVisible: () => void
  setShowUpgradePlanDialog: (boolean) => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const tipTapRef = useRef<TTiptapRef>(null)

  return (
    <EditorPanel
      disableActions={isArchived}
      infoMessage="Summaries are important for early career candidates and to explain career pivots"
      onVisibilityToggle={setIsSectionVisible}
      showAiIndicator={true}
      showDragHandle={false}
      subtitle="Enter a short summary about your professional experience"
      title="Summary"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="professionalSummary"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div className="flex h-[32px] justify-between leading-[32px]">
                  <p>Summary</p>
                  <div className="flex">
                    <SummaryEnhanceWithAiPopover
                      isPublic={isPublic}
                      onSubmit={onSubmit}
                      resumeId={resumeId ?? ''}
                      setShowUpgradePlanDialog={setShowUpgradePlanDialog}
                      tipTapRef={tipTapRef}
                    />
                  </div>
                </div>
              </FormLabel>
              <FormControl>
                <Tiptap
                  content={field.value ?? ''}
                  disabled={isArchived}
                  onChange={field.onChange}
                  ref={tipTapRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </EditorPanel>
  )
}

const CertificationFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendCertification,
    fields: certificationFields,
    remove: removeCertification,
    replace: replaceCertifications,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'certificationsAttributes',
  })

  const handleCertificationOnChange = (items: { id: string }[]) => {
    const certifications = items.map((item) => {
      const certification = certificationFields.find(
        (certification) => certification.id === item.id
      )

      return {
        ...certification,
        generatedId: undefined,
        name: certification?.name ?? '',
      }
    })

    replaceCertifications(certifications)
  }

  const handleAddNewCertification = () => {
    appendCertification(defaultValues.certificationsAttributes[0])
    setOpenPanelIndex(certificationFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add a new certification"
      disableActions={isArchived}
      emptyStateMessage={
        !certificationFields.length ? 'Click the + button to add a certification.' : undefined
      }
      onAddNew={handleAddNewCertification}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this certification"
      subtitle="Enter your certifications"
      title="Certifications"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={certificationFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
            onChange={handleCertificationOnChange}
            renderItem={(item, isActive, index) => (
              <SortableList.Item id={item.id} isDraggableNode={false}>
                <EditorPanel
                  disableActions={isArchived}
                  isPanelOpen={openPanelIndex === index}
                  onRemove={() => removeCertification(index)}
                  title={formValues?.certificationsAttributes?.[index]?.name || 'Certification'}
                  variant="secondary"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name={`certificationsAttributes.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Certification Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isArchived} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`certificationsAttributes.${index}.provider`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Provider/Organization</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isArchived} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-6/12">
                      <DateRangeFields
                        disabled={isArchived}
                        startDateFieldName={`certificationsAttributes.${index}.completionDate`}
                      />
                    </div>
                  </div>
                </EditorPanel>
              </SortableList.Item>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}
const SkillFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendSkill,
    fields: skillFields,
    remove: removeSkill,
    replace: replaceSkills,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'groupedSkillsAttributes',
  })

  const handleSkillOnChange = (items: { id: string }[]) => {
    const skills = items.map((item) => {
      const skill = skillFields.find((skill) => skill.id === item.id)

      return {
        ...skill,
        category: skill?.category ?? '',
        generatedId: undefined,
        skills: skill?.skills ?? [],
      }
    })

    return replaceSkills(skills)
  }

  const handleAddNewGroupedSkills = () => {
    appendSkill(defaultValues.groupedSkillsAttributes[0])
    setOpenPanelIndex(skillFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add a new skill category"
      disableActions={isArchived}
      emptyStateMessage={!skillFields.length ? 'Click the + button to add skills.' : undefined}
      onAddNew={handleAddNewGroupedSkills}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this skill category"
      subtitle="Categorize and enter your skills"
      title="Skills"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={skillFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
            onChange={handleSkillOnChange}
            renderItem={(item, isActive, index) => (
              <SortableList.Item id={item.id} isDraggableNode={false}>
                <EditorPanel
                  disableActions={isArchived}
                  isPanelOpen={openPanelIndex === index}
                  onRemove={() => removeSkill(index)}
                  title={formValues?.groupedSkillsAttributes?.[index]?.category || 'Category'}
                  variant="secondary"
                >
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name={`groupedSkillsAttributes.${index}.category`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isArchived}
                              {...field}
                              placeholder="Category name (optional)"
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`groupedSkillsAttributes.${index}.skills`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="inline-flex items-center gap-1">
                            Skills
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={16} />
                              </TooltipTrigger>
                              <TooltipContent>
                                Skills can be added in batches by separating each skill with a
                                comma. Press Enter to add skills.
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <InputChips
                              chips={field.value}
                              disabled={isArchived}
                              onChange={field.onChange}
                              placeholder="Type and press enter to add a skill"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </EditorPanel>
              </SortableList.Item>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const CourseworkFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendCoursework,
    fields: courseworkFields,
    remove: removeCoursework,
    replace: replaceCoursework,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'courseworksAttributes',
  })

  const handleCourseworkOnChange = (items: { id: string }[]) => {
    const courseworks = items.map((item) => {
      const coursework = courseworkFields.find((coursework) => coursework.id === item.id)

      return {
        ...coursework,
        achievements: coursework?.achievements ?? [],
        currentlyWorkingOnCourse: coursework?.currentlyWorkingOnCourse ?? false,
        generatedId: undefined,
        institutionName: coursework?.institutionName ?? '',
        name: coursework?.name ?? '',
      }
    })

    return replaceCoursework(courseworks)
  }

  const handleAddNewCoursework = () => {
    appendCoursework(defaultValues.courseworksAttributes[0])
    setOpenPanelIndex(courseworkFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add coursework"
      disableActions={isArchived}
      emptyStateMessage={
        !courseworkFields.length ? 'Click the + button to add a coursework.' : undefined
      }
      onAddNew={handleAddNewCoursework}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this coursework"
      subtitle="Enter your relevant courses"
      title="Coursework"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={courseworkFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
            onChange={handleCourseworkOnChange}
            renderItem={(item, isActive, index) => (
              <SortableList.Item id={item.id} isDraggableNode={false}>
                <EditorPanel
                  disableActions={isArchived}
                  isPanelOpen={openPanelIndex === index}
                  onRemove={() => removeCoursework(index)}
                  title={formValues?.courseworksAttributes?.[index]?.name || 'Course'}
                  variant="secondary"
                >
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name={`courseworksAttributes.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Course Name</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isArchived} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`courseworksAttributes.${index}.institutionName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              {...form.register(`courseworksAttributes.${index}.institutionName`)}
                              disabled={isArchived}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-6/12">
                      <DateRangeFields
                        disabled={isArchived}
                        startDateFieldName={`courseworksAttributes.${index}.endDate`}
                        startDateLabel={'Course completion date'}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name={`courseworksAttributes.${index}.achievements`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Achievements</FormLabel>
                            <FormControl>
                              <Tiptap
                                content={field.value.join('')}
                                disabled={isArchived}
                                forceBulletList={true}
                                onChange={(content) => field.onChange(extractListItemEl(content))}
                                placeholder="Add achievement"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </EditorPanel>
              </SortableList.Item>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const InvolvementFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendInvolvement,
    fields: involvementFields,
    remove: removeInvolvement,
    replace: replaceInvolvement,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'involvementsAttributes',
  })

  const handleInvolvementOnChange = (items: { id: string }[]) => {
    const involvements = items.map((item) => {
      const involvement = involvementFields.find((involvement) => involvement.id === item.id)

      return {
        ...involvement,
        achievements: involvement?.achievements ?? [],
        currentlyWorkingOnInvolvement: involvement?.currentlyWorkingOnInvolvement ?? false,
        generatedId: undefined,
        name: involvement?.name ?? '',
        organizationName: involvement?.organizationName ?? '',
      }
    })

    return replaceInvolvement(involvements)
  }

  const handleAddNewInvolvement = () => {
    appendInvolvement(defaultValues.involvementsAttributes[0])
    setOpenPanelIndex(involvementFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add involvement"
      disableActions={isArchived}
      emptyStateMessage={
        !involvementFields.length ? 'Click the + button to add an involvement.' : undefined
      }
      onAddNew={handleAddNewInvolvement}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this involvement"
      subtitle="Enter your involvements"
      title="Involvement"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={involvementFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
            onChange={handleInvolvementOnChange}
            renderItem={(item, isActive, index) => (
              <SortableList.Item id={item.id} isDraggableNode={false}>
                <EditorPanel
                  disableActions={isArchived}
                  isPanelOpen={openPanelIndex === index}
                  onRemove={() => removeInvolvement(index)}
                  title={formValues?.involvementsAttributes?.[index]?.name || 'Involvement'}
                  variant="secondary"
                >
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name={`involvementsAttributes.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isArchived} value={field.value ?? ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`involvementsAttributes.${index}.organizationName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              {...form.register(`involvementsAttributes.${index}.organizationName`)}
                              disabled={isArchived}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DateRangeFields
                      disableEndDateRange={
                        formValues?.involvementsAttributes?.[index]?.currentlyWorkingOnInvolvement
                      }
                      disabled={isArchived}
                      endDateFieldName={`involvementsAttributes.${index}.endDate`}
                      startDateFieldName={`involvementsAttributes.${index}.startDate`}
                    />
                    <div className="border-border-secondary mt-2 flex flex-col gap-4 rounded-md border px-4 py-3">
                      <FormField
                        control={form.control}
                        name={`involvementsAttributes.${index}.currentlyWorkingOnInvolvement`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="text-muted flex items-center justify-between">
                              <FormLabel>Currently at involvement</FormLabel>
                              <FormControl>
                                <Switch
                                  {...field}
                                  checked={field.value ?? false}
                                  disabled={isArchived}
                                  onCheckedChange={field.onChange}
                                  value={field?.value?.toString()}
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name={`involvementsAttributes.${index}.achievements`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Achievements</FormLabel>
                            <FormControl>
                              <Tiptap
                                content={field.value.join('')}
                                disabled={isArchived}
                                forceBulletList={true}
                                onChange={(content) => field.onChange(extractListItemEl(content))}
                                placeholder="Add achievement"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </EditorPanel>
              </SortableList.Item>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const EducationFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendEducation,
    fields: educationFields,
    remove: removeEducation,
    replace: replaceEducation,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'educationsAttributes',
  })

  const handleEducationOnChange = (items: { id: string }[]) => {
    const educations = items.map((item) => {
      const education = educationFields.find((education) => education.id === item.id)

      return {
        ...education,
        currentlyInEducation: education?.currentlyInEducation ?? false,
        degree: education?.degree ?? '',
        generatedId: undefined,
        institutionName: education?.institutionName ?? '',
      }
    })

    return replaceEducation(educations)
  }

  const handleAddNewEducation = () => {
    appendEducation(defaultValues.educationsAttributes[0])
    setOpenPanelIndex(educationFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add education"
      disableActions={isArchived}
      emptyStateMessage={
        !educationFields.length ? 'Click the + button to add education.' : undefined
      }
      onAddNew={handleAddNewEducation}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this education"
      subtitle="Enter your academic history"
      title="Education"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={educationFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
            onChange={handleEducationOnChange}
            renderItem={(item, isActive, index) => (
              <SortableList.Item id={item.id} isDraggableNode={false}>
                <EditorPanel
                  disableActions={isArchived}
                  isPanelOpen={openPanelIndex === index}
                  onRemove={() => removeEducation(index)}
                  title={
                    formValues?.educationsAttributes?.[index]?.institutionName || 'Institution'
                  }
                  variant="secondary"
                >
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name={`educationsAttributes.${index}.institutionName`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              {...form.register(`educationsAttributes.${index}.institutionName`)}
                              disabled={isArchived}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educationsAttributes.${index}.degree`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? ''}
                              {...form.register(`educationsAttributes.${index}.degree`)}
                              disabled={isArchived}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-row gap-4">
                      <FormField
                        control={form.control}
                        name={`educationsAttributes.${index}.location`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                {...form.register(`educationsAttributes.${index}.location`)}
                                disabled={isArchived}
                                value={field.value ?? ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`educationsAttributes.${index}.gpa`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>GPA</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                {...form.register(`educationsAttributes.${index}.gpa`)}
                                disabled={isArchived}
                                value={field.value ?? ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DateRangeFields
                      disableEndDateRange={
                        formValues?.educationsAttributes?.[index]?.currentlyInEducation
                      }
                      disabled={isArchived}
                      endDateFieldName={`educationsAttributes.${index}.endDate`}
                      startDateFieldName={`educationsAttributes.${index}.startDate`}
                    />
                    <div className="border-border-secondary mt-2 flex flex-col gap-4 rounded-md border px-4 py-3">
                      <FormField
                        control={form.control}
                        name={`educationsAttributes.${index}.currentlyInEducation`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="text-muted flex items-center justify-between">
                              <FormLabel>Currently Attending</FormLabel>
                              <FormControl>
                                <Switch
                                  {...field}
                                  checked={field.value ?? false}
                                  disabled={isArchived}
                                  onCheckedChange={field.onChange}
                                  value={field?.value?.toString()}
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </EditorPanel>
              </SortableList.Item>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const ProjectFieldPanel = ({
  isArchived,
  isSectionVisible,
  setIsSectionVisible,
}: {
  isArchived: boolean
  isSectionVisible: boolean
  setIsSectionVisible: () => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendProject,
    fields: projectFields,
    remove: removeProject,
    replace: replaceProjectFields,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'projectsAttributes',
  })

  const handleProjectOnChange = (items: { id: string }[]) => {
    const projects = items.map((item) => {
      const project = projectFields.find((project) => project.id === item.id)

      return {
        ...project,
        achievements: project?.achievements ?? [],
        currentlyWorkingOnProject: project?.currentlyWorkingOnProject ?? false,
        generatedId: undefined,
        name: project?.name ?? '',
      }
    })

    return replaceProjectFields(projects)
  }

  const handleAddNewProject = () => {
    appendProject(defaultValues.projectsAttributes[0])
    setOpenPanelIndex(projectFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add a new project"
      disableActions={isArchived}
      emptyStateMessage={!projectFields?.length ? 'Click the + button to add projects.' : undefined}
      onAddNew={handleAddNewProject}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this project"
      subtitle="Projects that you've worked on"
      title="Projects"
      visible={isSectionVisible}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={projectFields.map(({ generatedId, id }) => ({
              id: id ?? generatedId,
            }))}
            onChange={handleProjectOnChange}
            renderItem={(item, isActive, index) => {
              return (
                <SortableList.Item id={item.id} isDraggableNode={false}>
                  <EditorPanel
                    disableActions={isArchived}
                    isPanelOpen={openPanelIndex === index}
                    onRemove={() => removeProject(index)}
                    title={formValues?.projectsAttributes?.[index]?.name || 'Project'}
                    variant="secondary"
                  >
                    <div className="flex flex-col gap-4">
                      <div>
                        <FormField
                          control={form.control}
                          name={`projectsAttributes.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  {...form.register(`projectsAttributes.${index}.name`)}
                                  disabled={isArchived}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <DateRangeFields
                        disableEndDateRange={
                          formValues?.projectsAttributes?.[index]?.currentlyWorkingOnProject
                        }
                        disabled={isArchived}
                        endDateFieldName={`projectsAttributes.${index}.endDate`}
                        startDateFieldName={`projectsAttributes.${index}.startDate`}
                      />
                      <div className="border-border-secondary mt-2 flex flex-col gap-4 rounded-md border px-4 py-3">
                        <FormField
                          control={form.control}
                          name={`projectsAttributes.${index}.currentlyWorkingOnProject`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="text-muted flex items-center justify-between">
                                <FormLabel>Currently working on project</FormLabel>
                                <FormControl>
                                  <Switch
                                    {...field}
                                    checked={field.value ?? false}
                                    disabled={isArchived}
                                    onCheckedChange={field.onChange}
                                    value={field?.value?.toString()}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name={`projectsAttributes.${index}.achievements`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Achievements</FormLabel>
                              <FormControl>
                                <Tiptap
                                  content={field.value.join('')}
                                  disabled={isArchived}
                                  forceBulletList={true}
                                  onChange={(content) => field.onChange(extractListItemEl(content))}
                                  placeholder="Add achievement"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </EditorPanel>
                </SortableList.Item>
              )
            }}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const WorkExperienceEditorPanel = ({
  getSimplifiedAnalysis,
  isArchived,
  isPublic,
  isSectionVisible,
  onSubmit,
  resume,
  setIsSectionVisible,
  setShowUpgradePlanDialog,
}: {
  getSimplifiedAnalysis: (field: string) => FieldMessageType | undefined
  isArchived: boolean
  isPublic: boolean
  isSectionVisible: boolean
  onSubmit: () => void
  resume: TResume
  setIsSectionVisible: () => void
  setShowUpgradePlanDialog: (boolean) => void
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const workPositionRefs = useRef<TWorkPositionEditorPanelRef[]>([])

  const {
    append: appendWorkExperience,
    fields: workExperienceFields,
    remove: removeWorkExperience,
    replace: replaceWorkExperience,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: 'workExperiencesAttributes',
  })

  const warningMessage = getSimplifiedAnalysis('workExperiences')?.errorMessage

  const handleSortOnChange = (items: { id: string }[]) => {
    const workExperiences = items.map((item) => {
      const workExperience = workExperienceFields?.find(
        (workExperience) => workExperience.id == item.id
      )

      return {
        ...workExperience,
        companyName: workExperience?.companyName ?? '',
        generatedId: undefined,
        workPositionsAttributes: workExperience?.workPositionsAttributes || [],
      }
    })

    return replaceWorkExperience(workExperiences)
  }

  const handleAddNewWorkExperience = () => {
    appendWorkExperience(defaultValues.workExperiencesAttributes[0])
    setOpenPanelIndex(workExperienceFields.length)
  }

  return (
    <EditorPanel
      addNewTooltip="Add work experience"
      disableActions={isArchived}
      emptyStateMessage={
        !workExperienceFields?.length ? 'Click the + button to add work experience.' : undefined
      }
      onAddNew={handleAddNewWorkExperience}
      onVisibilityToggle={setIsSectionVisible}
      removeTooltip="Remove this work experience"
      showAiIndicator={true}
      subtitle="Enter your work experience and history"
      title="Work Experience"
      visible={isSectionVisible}
      warningMessage={warningMessage}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <SortableList
            items={workExperienceFields.map(({ generatedId, id }) => ({
              id: id || generatedId,
            }))}
            onChange={handleSortOnChange}
            renderItem={(item, isActive, index) => {
              return (
                <SortableList.Item id={item.id} isDraggableNode={false}>
                  <EditorPanel
                    addNewTooltip="Add work position"
                    disableActions={isArchived}
                    isPanelOpen={openPanelIndex === index}
                    onAddNew={() => workPositionRefs.current[index]?.appendWorkPosition()}
                    onRemove={() => removeWorkExperience(index)}
                    showAiIndicator={true}
                    title={formValues?.workExperiencesAttributes?.[index]?.companyName || 'Company'}
                    variant="secondary"
                    warningMessage={
                      resume &&
                      findFieldInSimpleAnalysis(
                        resume?.workExperiences?.[index]?.simpleAnalysis,
                        'workPositions'
                      )?.errorMessage
                    }
                  >
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={form.control}
                        name={`workExperiencesAttributes.${index}.companyName`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                {...form.register(`workExperiencesAttributes.${index}.companyName`)}
                                disabled={isArchived}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiencesAttributes.${index}.companyDescription`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Company Description</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                {...form.register(
                                  `workExperiencesAttributes.${index}.companyDescription`
                                )}
                                disabled={isArchived}
                                value={field.value ?? ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <WorkPositionEditorPanel
                        isArchived={isArchived}
                        isPublic={isPublic}
                        onSubmit={onSubmit}
                        ref={(el) => {
                          if (el) workPositionRefs.current[index] = el
                        }}
                        resume={resume}
                        setShowUpgradePlanDialog={setShowUpgradePlanDialog}
                        workExpIndex={index}
                      />
                    </div>
                  </EditorPanel>
                </SortableList.Item>
              )
            }}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

type TWorkPositionEditorPanelRef = {
  appendWorkPosition: () => void
}

interface IWorkPositionEditorPanelProps {
  isArchived: boolean
  isPublic: boolean
  onSubmit: () => void
  resume: TResume
  setShowUpgradePlanDialog: (boolean) => void
  workExpIndex: number
}

const WorkPositionEditorPanel = forwardRef<
  TWorkPositionEditorPanelRef,
  IWorkPositionEditorPanelProps
>(({ isArchived, isPublic, onSubmit, resume, setShowUpgradePlanDialog, workExpIndex }, ref) => {
  const form = useFormContext<TResumeBuilderForm>()
  const formValues = useFormValues<TResumeBuilderForm>()
  const tipTapRef = useRef<TTiptapRef>(null)
  const [openPanelIndex, setOpenPanelIndex] = useState<null | number>(null)

  const {
    append: appendWorkPosition,
    fields: workPositionFields,
    remove: removeWorkPosition,
    replace: replaceWorkPositions,
  } = useFieldArray({
    control: form.control,
    keyName: 'generatedId',
    name: `workExperiencesAttributes.${workExpIndex}.workPositionsAttributes`,
  })

  const workExperienceWatch = formValues?.workExperiencesAttributes?.[workExpIndex]
  const preexistingLocationWatch =
    workExperienceWatch?.workPositionsAttributes?.[workPositionFields?.length - 1]?.location

  const handleAddNewWorkPosition = () => {
    appendWorkPosition({
      ...defaultValues.workExperiencesAttributes[0].workPositionsAttributes[0],
      location: preexistingLocationWatch ?? '',
    })
    setOpenPanelIndex(workPositionFields.length)
  }

  useImperativeHandle(ref, () => ({
    appendWorkPosition: () => {
      handleAddNewWorkPosition()
    },
  }))

  const handleSortOnChange = (items: { id: string }[]) => {
    const workPositions = items.map((item) => {
      const workPosition = workPositionFields?.find((workPosition) => workPosition.id == item.id)

      return {
        ...workPosition,
        achievements: workPosition?.achievements ?? [],
        currentlyInPosition: workPosition?.currentlyInPosition ?? false,
        generatedId: undefined,
        name: workPosition?.name ?? '',
      }
    })

    return replaceWorkPositions(workPositions)
  }

  const achievementWarningMessage = (index) =>
    resume &&
    findFieldInSimpleAnalysis(
      resume.workExperiences?.[workExpIndex]?.workPositions?.[index]?.simpleAnalysis,
      'achievements'
    )?.errorMessage

  return (
    <div className="flex flex-col gap-4">
      <SortableList
        items={workPositionFields.map(({ generatedId, id }) => ({ id: id ?? generatedId }))}
        onChange={handleSortOnChange}
        renderItem={(item, isActive, index) => {
          return (
            <SortableList.Item id={item.id} isDraggableNode={false}>
              <EditorPanel
                disableActions={isArchived}
                isPanelOpen={openPanelIndex === index}
                onRemove={() => removeWorkPosition(index)}
                showAiIndicator={true}
                title={
                  formValues?.workExperiencesAttributes?.[workExpIndex]?.workPositionsAttributes?.[
                    index
                  ]?.name || 'Position'
                }
              >
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Position Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register(
                              `workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.name`
                            )}
                            disabled={isArchived}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.location`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center gap-1">
                          Location
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Location should only be added when its critical for the role</p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register(
                              `workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.location`
                            )}
                            disabled={isArchived}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DateRangeFields
                    disableEndDateRange={
                      formValues.workExperiencesAttributes?.[workExpIndex]
                        ?.workPositionsAttributes?.[index].currentlyInPosition
                    }
                    disabled={isArchived}
                    endDateFieldName={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.endDate`}
                    startDateFieldName={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.startDate`}
                  />
                  <div className="border-border-secondary mt-2 flex flex-col gap-4 rounded-md border px-4 py-3">
                    <FormField
                      control={form.control}
                      name={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.currentlyInPosition`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="text-muted flex items-center justify-between">
                            <FormLabel>Currently in position</FormLabel>
                            <FormControl>
                              <Switch
                                {...field}
                                checked={field.value ?? false}
                                disabled={isArchived}
                                onCheckedChange={field.onChange}
                                value={field?.value?.toString()}
                              />
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.achievements`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              Achievements
                              <WarningTooltip
                                warningMessage={achievementWarningMessage(index) ?? ''}
                              />
                            </div>
                            <WorkPositionEnhanceWithAiPopover
                              formName={`workExperiencesAttributes.${workExpIndex}.workPositionsAttributes.${index}.achievements`}
                              isPublic={isPublic}
                              onSubmit={onSubmit}
                              setShowUpgradePlanDialog={setShowUpgradePlanDialog}
                              tipTapRef={tipTapRef}
                              workExperience={formValues?.workExperiencesAttributes?.[workExpIndex]}
                              workPosition={
                                formValues?.workExperiencesAttributes?.[workExpIndex]
                                  ?.workPositionsAttributes?.[index]
                              }
                            />
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Tiptap
                            content={`<ul>${field.value.join('')}</ul>`}
                            disabled={isArchived}
                            forceBulletList={true}
                            onChange={(content) => field.onChange(extractListItemEl(content))}
                            placeholder="Add achievement"
                            ref={tipTapRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </EditorPanel>
            </SortableList.Item>
          )
        }}
      />
    </div>
  )
})

const SummaryEnhanceWithAiPopover = ({
  isPublic,
  onSubmit,
  resumeId,
  setShowUpgradePlanDialog,
  tipTapRef,
}: {
  isPublic: boolean
  onSubmit: () => void
  resumeId: string
  setShowUpgradePlanDialog: (boolean) => void
  tipTapRef: React.RefObject<TTiptapRef>
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  return (
    <>
      <EnhanceAIButton
        onClick={() => setIsDialogOpen(true)}
        size="sm"
        tooltipMessage="Enhance summary with AI"
      />
      <EnhanceSummaryDialog
        form={form}
        isDialogOpen={isDialogOpen}
        isPublic={isPublic}
        onSubmit={onSubmit}
        resumeId={resumeId}
        setIsDialogOpen={setIsDialogOpen}
        setShowUpgradePlanDialog={setShowUpgradePlanDialog}
        tipTapRef={tipTapRef}
      />
    </>
  )
}

const WorkPositionEnhanceWithAiPopover = ({
  formName,
  isPublic,
  onSubmit,
  setShowUpgradePlanDialog,
  tipTapRef,
  workExperience,
  workPosition,
}: {
  formName: string
  isPublic: boolean
  onSubmit: () => void
  setShowUpgradePlanDialog: (boolean) => void
  tipTapRef: React.RefObject<TTiptapRef>
  workExperience: ResumesWorkExperienceInputObject
  workPosition: ResumesWorkPositionInputObject
}) => {
  const form = useFormContext<TResumeBuilderForm>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  return (
    <>
      <EnhanceAIButton
        onClick={() => setIsDialogOpen(true)}
        size="sm"
        tooltipMessage="Enhance achievements with AI"
      />
      <EnhanceAchievementDialog
        form={form}
        formName={formName}
        isDialogOpen={isDialogOpen}
        isPublic={isPublic}
        onSubmit={onSubmit}
        setIsDialogOpen={setIsDialogOpen}
        setShowUpgradePlanDialog={setShowUpgradePlanDialog}
        tipTapRef={tipTapRef}
        workExperience={workExperience}
        workPosition={workPosition}
      />
    </>
  )
}

WorkPositionEditorPanel.displayName = 'WorkPositionEditorPanel'

const CanyonScore = ({
  isLoading,
  score,
}: {
  isLoading: boolean
  score?: Maybe<ResumesScoreType>
} & React.HTMLAttributes<HTMLDivElement>) => {
  if (!score) return <Gauge isLoading={true} value={0} />
  let timeoutId

  const [showPopover, setShowPopover] = useState<boolean>(false)

  const handleMouseEnter = () => {
    clearTimeout(timeoutId)
    setShowPopover(true)
  }
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setShowPopover(false), 250)
  }

  const { score: resumeScore } = score

  return (
    <Popover onOpenChange={setShowPopover} open={showPopover}>
      <PopoverTrigger
        className="focus:outline-none"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Gauge isLoading={isLoading} value={resumeScore} />
      </PopoverTrigger>
      <PopoverContent onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <CanyonScoreDetails score={score} />
      </PopoverContent>
    </Popover>
  )
}

const CanyonScoreDetails = ({ score }: { score?: Maybe<ResumesScoreType> }) => {
  if (!score) return null

  const resumeScore = score.score
  const scoreFields = score.scoreFields
  const passedFields = scoreFields?.filter((field) => field.didPass)
  const failedFields = scoreFields?.filter((field) => !field.didPass)

  return (
    <div className="mb-4 mt-2 flex h-[350px] w-full max-w-[820px] flex-col gap-3 overflow-auto">
      <div className="flex flex-col gap-3 rounded-lg p-6">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-white">Canyon Score</span>
            <p className="text-muted-foreground text-sm">
              Canyon Score represents the overall evaluation score of a resume based on various
              criteria.
            </p>
          </div>
          {resumeScore && <Gauge value={resumeScore} />}
        </div>
        {failedFields?.length ? (
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  Needs Improvement{' '}
                  <Dot borderColor="border-transparent" dotColor="bg-yellow-400" />
                </span>
                <p className="text-muted-foreground text-sm">
                  Update these fields based on our suggestions to improve your Canyon Score.
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-6">
                {failedFields?.map((field, index) => (
                  <div className="flex flex-row justify-start gap-2 text-sm" key={index}>
                    <div className="flex flex-col gap-2">
                      <span className="text-white/90">{field.header}</span>
                      <span className="text-muted-foreground whitespace-pre-line">
                        {field.errorMessage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const SignUpPopoverComponent = ({ text }: { text: string }) => {
  return (
    <>
      <p className="text-muted-foreground mb-4 text-base">{text}</p>
      <Link href="/auth/signup">
        <Button
          onClick={() => trackEvent(`User clicked Sign up button from popover with text ${text}`)}
          variant="cta"
        >
          Sign up
        </Button>
      </Link>
    </>
  )
}

const findFieldInSimpleAnalysis = (
  simpleAnalysis: FieldMessageType[],
  field: string
): FieldMessageType | undefined => {
  return simpleAnalysis?.find((analysisField: FieldMessageType) => analysisField.field == field)
}
