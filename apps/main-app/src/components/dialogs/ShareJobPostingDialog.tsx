'use client'

import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { Combobox, IComboboxOption } from '@canyon/ui/Combobox'
import { Dialog, DialogContent, DialogFooter } from '@canyon/ui/Dialog'
import { Label } from '@canyon/ui/Label'
import { ScrollArea } from '@canyon/ui/ScrollArea'
import { useToast } from '@canyon/ui/useToast'
import { ShareFat } from '@phosphor-icons/react'

import {
  JobPostingsList_JobPostingsDocument,
  JobPostingsList_JobPostingsQuery,
  ShareJobPostingDialog_ClientGroupsDocument,
  ShareJobPostingDialog_ClientsDocument,
  ShareJobPostingDialog_ShareJobWithClientsDocument,
  ShareJobPostingDialog_UsersJobsDocument,
} from '@gql/graphql'

interface IShareJobPostingDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  usersJobIds: string[]
}

export const ShareJobPostingDialog = ({
  open,
  setOpen,
  usersJobIds,
}: IShareJobPostingDialogProps) => {
  const { successToast } = useToast()
  const [clientsToShareWith, setClientsToShareWith] = useState<IComboboxOption[]>([])
  const [clientGroupsToShareWith, setClientGroupsToShareWith] = useState<IComboboxOption[]>([])

  const resetState = () => {
    setClientsToShareWith([])
  }

  useEffect(() => {
    if (!open) {
      resetState()
    }
  }, [open])

  const { data: usersJobsData } = useQuery(ShareJobPostingDialog_UsersJobsDocument, {
    variables: {
      ids: usersJobIds,
    },
  })

  const usersJobs = usersJobsData?.usersJobs

  const { data } = useQuery(ShareJobPostingDialog_ClientsDocument, {
    variables: {},
  })

  const { data: clientGroupsData } = useQuery(ShareJobPostingDialog_ClientGroupsDocument)

  const clients = data?.clients?.data
  const clientsList = clients?.map((client) => {
    return {
      label: `${client.user.firstName} ${client.user.lastName}`,
      value: client.id,
    }
  })
  const clientsGroupsList = clientGroupsData?.clientGroups?.map((clientGroup) => {
    return {
      label: clientGroup.name,
      value: clientGroup.id,
    }
  })

  const [shareJob, { loading: shareJobLoading }] = useMutation(
    ShareJobPostingDialog_ShareJobWithClientsDocument,
    {
      refetchQueries: [JobPostingsList_JobPostingsDocument],
    }
  )

  const handleShareJobPosting = async () => {
    Promise.all(
      (usersJobs ?? []).map((usersJob) => {
        return shareJob({
          variables: {
            clientGroupIds: clientGroupsToShareWith.map((option) => option.value),
            userIds: clientsToShareWith.map((option) => option.value),
            usersJobId: usersJob.id,
          },
        })
      })
    )

    successToast({
      title: 'Job postings have been shared with clients',
    })

    resetState()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent title="Share Job Posting" titleIcon={<ShareFat />}>
        <div className="flex flex-col gap-3 px-3">
          {usersJobs?.map((usersJob) => (
            <div key={usersJob.id}>
              <Label>
                {usersJob.position} ({usersJob.companyName})
              </Label>
            </div>
          ))}
          <Label className="text-muted-foreground mt-2">Clients to share with</Label>
          <Combobox
            clearable={true}
            multiple={true}
            onValueChange={(options) => {
              setClientsToShareWith(options)
            }}
            options={clientsList || []}
            searchPlaceholder="Select clients"
            selectPlaceholder="Select clients to share"
            value={clientsToShareWith}
          />
          <Label className="text-muted-foreground mt-2">Groups to share with</Label>
          <Combobox
            clearable={true}
            multiple={true}
            onValueChange={(options) => {
              setClientGroupsToShareWith(options)
            }}
            options={clientsGroupsList || []}
            searchPlaceholder="Select groups"
            selectPlaceholder="Select groups to share"
            value={clientGroupsToShareWith}
          />
          {/* <div className="mt-2 flex flex-col gap-2">
            <Label className="text-muted-foreground">Clients shared with</Label>
            <ScrollArea className="h-[200px]">
              {existingClientsShared?.map((client) => (
                <div key={client.id}>
                  {client.firstName} {client.user.lastName}
                </div>
              ))}
              {existingClientsShared?.length === 0 && (
                <div>This job hasn't been shared with any clients</div>
              )}
            </ScrollArea>
          </div> */}
        </div>
        <DialogFooter>
          <Button
            disabled={clientsToShareWith.length == 0 && clientGroupsToShareWith.length == 0}
            loading={shareJobLoading}
            onClick={handleShareJobPosting}
            variant="cta"
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
