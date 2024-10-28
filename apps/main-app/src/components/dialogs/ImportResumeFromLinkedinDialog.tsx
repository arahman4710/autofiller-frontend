'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@rag/ui/Dialog'
import { DropdownMenuItem } from '@rag/ui/DropdownMenu'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@rag/ui/Form'
import { Input } from '@rag/ui/Input'
import { useToast } from '@rag/ui/useToast'
import { LinkedinLogo } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  ImportResumeFromLinkedinDialog_CreateResumeFromLinkedinUrlDocument,
  ImportResumeFromLinkedinDialog_ResumesDocument,
  ResumesList_ResumesDocument,
} from '@gql/graphql'

import { LinkedInLogo } from '@/components/assets/LinkedInLogo'
import { useImportResumeFromLinkedinForm } from '@/forms/hooks/useImportResumeFromLinkedinForm'
import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const MAX_RESUMES = 3

export const ImportResumeFromLinkedinDialog = () => {
  const { errorToast, successToast } = useToast()
  const upgradePlanDialog = useUpgradePlanDialog()

  const { isPaidPlan, user } = useCurrentUser()
  const router = useRouter()

  const { form } = useImportResumeFromLinkedinForm()
  const linkedinProfileUrl = form.watch().linkedinProfileUrl

  const { data } = useQuery(ImportResumeFromLinkedinDialog_ResumesDocument)
  const resumes = data?.resumes ?? []

  const [createResumeFromLinkedinUrl, { loading }] = useMutation(
    ImportResumeFromLinkedinDialog_CreateResumeFromLinkedinUrlDocument,
    {
      refetchQueries: [ResumesList_ResumesDocument],
    }
  )

  const handleOnSubmit = async () => {
    if (resumes?.length && resumes.length >= MAX_RESUMES && !isPaidPlan) {
      upgradePlanDialog.setOpen(true)
      return
    }
    try {
      const response = await createResumeFromLinkedinUrl({
        variables: {
          linkedinProfileUrl: linkedinProfileUrl || '',
        },
      })
      successToast({ description: 'Your resume has been imported from LinkedIn.' })
      if (response?.data?.createResumeFromLinkedinUrl) {
        router.replace(`/resumes/${response.data.createResumeFromLinkedinUrl.id}`)
      }
    } catch (error) {
      errorToast({
        description:
          'There was an error importing your resume from LinkedIn. Please check your LinkedIn Profile URL.',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault()
          }}
        >
          Import resume from <LinkedInLogo className="ml-1 h-5 w-5" />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent title="Import Resume from LinkedIn" titleIcon={<LinkedinLogo />}>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleOnSubmit)}>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="linkedinProfileUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus={true}
                        className="placeholder:italic placeholder:text-stone-600"
                        placeholder="https://www.linkedin.com/in/your_profile_url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild disabled={loading}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button loading={loading} type="submit" variant="cta">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
