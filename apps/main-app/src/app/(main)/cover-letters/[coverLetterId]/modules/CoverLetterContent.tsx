'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@canyon/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@canyon/ui/Form'
import { Input } from '@canyon/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@canyon/ui/Select'
import { TTiptapRef, Tiptap } from '@canyon/ui/Tiptap'
import { DownloadSimple } from '@phosphor-icons/react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

import {
  CoverLetterContent_CoverLetterUpsertDocument,
  CoverLetterContent_CoverLettersDocument,
  CoverLetterContent_GenerateCoverLetterDocument,
  CoverLetterLengthEnum,
  CoverLetterToneEnum,
  CoverLettercontent_ResumesDocument,
  UseCurrentUser_UsersDocument,
} from '@gql/graphql'

import { useDevStore } from '@/__dev__/store'
import { ArchivedBanner } from '@/components/ArchivedBanner'
import { EditorPanel } from '@/components/EditorPanel'
import { SettingsEditorPanel, SettingsEditorPanelRow } from '@/components/SettingsEditorPanel'
import { useCoverLetterConfigForm } from '@/forms/hooks/useCoverLetterConfigForm'
import { useCoverLetterForm } from '@/forms/hooks/useCoverLetterForm'
import { useCoverLetterFormReset } from '@/forms/hooks/useCoverLetterFormReset'
import { TCoverLetterForm } from '@/forms/types'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'
import { trackEvent } from '@/lib/utils/analytics'

import { CoverLetterDocument } from '../components/CoverLetterDocument'

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer))

interface ICoverLetterContentProps {
  coverLetterId: string
}

export const CoverLetterContent = ({ coverLetterId }: ICoverLetterContentProps) => {
  const { isPaidPlan, tokens } = useCurrentUser()
  const upgradePlanDialog = useUpgradePlanDialog()

  const [isPDFDownloading, setIsPDFDownloading] = useState<boolean>(false)
  const [isGenerateCoverLetterLoading, setIsGenerateCoverLetterLoading] = useState<boolean>(false)

  const coverLetterBodyRef = useRef<TTiptapRef>(null)

  const { data: coverLetterData } = useSuspenseQuery(CoverLetterContent_CoverLettersDocument, {
    variables: { coverLetterId },
  })

  const coverLetter = coverLetterData?.coverLetters[0]
  const isArchived = coverLetter?.archived
  const application = coverLetter?.usersJob
  const titleString = `Cover Letter: ${application.position} – ${application.companyName}`

  const { form } = useCoverLetterForm()
  const { form: configForm } = useCoverLetterConfigForm()

  useCoverLetterFormReset({ coverLetter, form })

  useEffect(() => {
    if (coverLetter?.mostRecentUsedResumeForGenerate) {
      configForm.setValue('resumeId', coverLetter.mostRecentUsedResumeForGenerate.id)
    }
  }, [coverLetter?.mostRecentUsedResumeForGenerate])

  const { data: resumesData } = useSuspenseQuery(CoverLettercontent_ResumesDocument)
  const resumes = resumesData?.resumes ?? []

  const coverLetterLengthOptions: { id: CoverLetterLengthEnum; name: string }[] = [
    { id: CoverLetterLengthEnum.Short, name: 'Short' },
    { id: CoverLetterLengthEnum.Medium, name: 'Medium' },
    { id: CoverLetterLengthEnum.Long, name: 'Long' },
  ]

  const coverLetterToneOptions: { id: CoverLetterToneEnum; name: string }[] = [
    { id: CoverLetterToneEnum.Excited, name: 'Excited' },
    { id: CoverLetterToneEnum.Casual, name: 'Casual' },
    { id: CoverLetterToneEnum.Formal, name: 'Formal' },
    { id: CoverLetterToneEnum.Informational, name: 'Informational' },
  ]

  const [generateCoverLetter] = useMutation(CoverLetterContent_GenerateCoverLetterDocument)
  const handleGenerateCoverLetter = async () => {
    const insufficientTokens = !isPaidPlan && (tokens?.coverLetter ?? 0) < 1

    if (insufficientTokens) {
      upgradePlanDialog.setOpen(true)
      return
    }

    setIsGenerateCoverLetterLoading(true)

    const { data } = await generateCoverLetter({
      refetchQueries: [CoverLetterContent_CoverLettersDocument, UseCurrentUser_UsersDocument],
      variables: {
        coverLetterLength: configForm.getValues().coverLetterLength,
        coverLetterTone: configForm.getValues().coverLetterTone,
        resumeId: configForm.getValues().resumeId ?? '',
        usersJobId: application.id,
      },
    })

    if (data?.generateCoverLetter?.body) {
      coverLetterBodyRef?.current?.refreshContent(data?.generateCoverLetter?.body)
    }

    setIsGenerateCoverLetterLoading(false)
  }

  const [updateCoverLetter] = useMutation(CoverLetterContent_CoverLetterUpsertDocument)

  const handleCoverLetterUpdate = async () => {
    const formValues = form.getValues()

    const { data } = await updateCoverLetter({
      refetchQueries: [CoverLetterContent_CoverLettersDocument],
      variables: {
        attributes: {
          body: formValues.body,
          candidateAddress: formValues.candidateAddress,
          companyLocation: formValues.companyLocation,
          companyName: formValues.companyName,
          email: formValues.email,
          firstName: formValues.firstName,
          footer: formValues.footer,
          lastName: formValues.lastName,
          phoneNumber: formValues.phoneNumber,
        },
        usersJobId: application.id,
      },
    })
  }

  useFormAutoSave({ defaultValues: coverLetter, form, onSubmit: handleCoverLetterUpdate })

  const enableGenerateCoverLetter =
    configForm.getValues().resumeId !== '' && !isGenerateCoverLetterLoading

  const downloadCoverLetter = async () => {
    trackEvent('User clicked Download Cover Letter PDF Button')
    setIsPDFDownloading(true)

    const blob = await pdf(
      <Form {...form}>
        <CoverLetterDocument />
      </Form>
    ).toBlob()
    saveAs(blob, `${application.position} - ${application.companyName} Cover Letter.pdf`)

    setIsPDFDownloading(false)
  }

  return (
    <div className="flex w-full flex-col justify-center">
      {isArchived ? (
        <ArchivedBanner className="mb-4">
          This cover letter has been archived. Restore it to make it active.
        </ArchivedBanner>
      ) : null}
      <div className="mb-6 flex flex-row items-center justify-between gap-4 px-8">
        <h1 className="overflow-hidden overflow-ellipsis font-mono text-xl">{titleString}</h1>
        <div>
          <Button
            leftIcon={<DownloadSimple size={16} />}
            loading={isPDFDownloading}
            onClick={downloadCoverLetter}
            size="sm"
            variant="cta"
          >
            Download PDF
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-170px)] w-full flex-row justify-between gap-10 overflow-y-auto px-8">
        <div className="flex w-6/12 flex-grow flex-col gap-4">
          <Form {...configForm}>
            <SettingsEditorPanel>
              <SettingsEditorPanelRow title="Job Application Source">
                <Link
                  className="text-muted-foreground underline"
                  href={`/board/${application.id}`}
                  target="_blank"
                >
                  {application.position} – {application.companyName}
                </Link>
              </SettingsEditorPanelRow>
              <SettingsEditorPanelRow
                subtitle="Choose which resume to use as the source."
                title="Resume Source"
              >
                <FormField
                  control={configForm.control}
                  name="resumeId"
                  render={({ field }) => (
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="max-w-[40%] select-none rounded-lg border-none bg-stone-700">
                          <SelectValue placeholder="Select a resume" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {resumes.map((resume) => (
                            <SelectItem key={resume.id} value={resume.id}>
                              {resume.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
              </SettingsEditorPanelRow>
              <SettingsEditorPanelRow
                subtitle="Choose how long you'd like your cover letter to be."
                title="Cover Letter Length"
              >
                <FormField
                  control={configForm.control}
                  name="coverLetterLength"
                  render={({ field }) => (
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="max-w-[40%] select-none rounded-lg border-none bg-stone-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {coverLetterLengthOptions.map((length) => (
                            <SelectItem key={length.id} value={length.id}>
                              {length.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
              </SettingsEditorPanelRow>
              <SettingsEditorPanelRow
                subtitle="Choose which tone you'd like  to convey."
                title="Cover Letter Tone"
              >
                <FormField
                  control={configForm.control}
                  name="coverLetterTone"
                  render={({ field }) => (
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="max-w-[40%] select-none rounded-lg border-none bg-stone-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {coverLetterToneOptions.map((tone) => (
                            <SelectItem key={tone.id} value={tone.id}>
                              {tone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
              </SettingsEditorPanelRow>
              <div className="flex flex-row justify-end">
                <Button
                  className="my-2 bg-blue-600 text-white transition-all hover:bg-blue-600/80"
                  disabled={!enableGenerateCoverLetter}
                  loading={isGenerateCoverLetterLoading}
                  onClick={handleGenerateCoverLetter}
                  size="sm"
                >
                  {isGenerateCoverLetterLoading ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
              </div>
            </SettingsEditorPanel>
          </Form>
          <Form {...form}>
            <CoverLetterAddresseeEditorPanel />
            <CoverLetterProfileEditorPanel />
            <CoverLetterContentEditorPanel bodyRef={coverLetterBodyRef} />
          </Form>
        </div>
        <div className="sticky top-0 flex w-6/12 justify-end">
          <Form {...form}>
            <CoverLetterViewer />
          </Form>
        </div>
      </div>
    </div>
  )
}

const CoverLetterViewer = () => {
  const { pdfViewerEnabled } = useDevStore()

  if (pdfViewerEnabled) {
    return (
      <PDFViewer showToolbar={false} style={{ border: 0, height: '880px', width: '700px' }}>
        <CoverLetterDocument />
      </PDFViewer>
    )
  }

  return <CoverLetterDocument />
}

const CoverLetterProfileEditorPanel = () => {
  const form = useFormContext<TCoverLetterForm>()

  return (
    <EditorPanel
      disableActions={false}
      isPanelOpen={true}
      showDragHandle={false}
      title="Profile Info"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email Address" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone Number" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const CoverLetterAddresseeEditorPanel = () => {
  const form = useFormContext<TCoverLetterForm>()

  return (
    <EditorPanel
      disableActions={false}
      isPanelOpen={true}
      showDragHandle={false}
      title="Addressee Info"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Name" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Company Location" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}

const CoverLetterContentEditorPanel = ({ bodyRef }: { bodyRef: RefObject<TTiptapRef> }) => {
  const form = useFormContext<TCoverLetterForm>()

  return (
    <EditorPanel
      disableActions={false}
      isPanelOpen={true}
      showDragHandle={false}
      title="Cover Letter Content"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Tiptap content={field.value ?? ''} onChange={field.onChange} ref={bodyRef} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="footer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Footer</FormLabel>
                <FormControl>
                  <Tiptap content={field.value ?? ''} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </EditorPanel>
  )
}
