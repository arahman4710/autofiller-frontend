'use client'

import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Combobox, IComboboxOption } from '@rag/ui/Combobox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogScreen,
  DialogScreenProvider,
} from '@rag/ui/Dialog'
import { Input } from '@rag/ui/Input'
import { Label } from '@rag/ui/Label'
import { useToast } from '@rag/ui/useToast'

import {
  CreateClientGroupDialog_AddUsersToClientGroupDocument,
  CreateClientGroupDialog_ClientsDocument,
  CreateClientGroupDialog_CreateClientGroupDocument,
  Navigation_ClientGroupsDocument,
} from '@gql/graphql'

interface ICreateClientGroupProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CreateClientGroupDialog = ({ open, setOpen }: ICreateClientGroupProps) => {
  const { errorToast, successToast } = useToast()

  const [currentScreen, setCurrentScreen] = useState(0)
  const [clientGroupName, setClientGroupName] = useState('')
  const [clientGroupId, setClientGroupId] = useState('')
  const [clientIds, setClientIds] = useState<IComboboxOption[]>([])

  const reset = () => {
    setClientGroupName('')
    setCurrentScreen(0)
    setClientGroupId('')
    setClientIds([])
  }

  const { data: clients } = useQuery(CreateClientGroupDialog_ClientsDocument)
  const clientsList = clients?.clients.data.map((client) => ({
    label: `${client.user.firstName} ${client.user.lastName}`,
    value: client.id,
  }))

  const [createClientGroup, { loading: createClientGroupLoading }] = useMutation(
    CreateClientGroupDialog_CreateClientGroupDocument,
    {
      refetchQueries: [Navigation_ClientGroupsDocument],
    }
  )

  const [addUsersToClientGroup, { loading: addUsersToClientGroupLoading }] = useMutation(
    CreateClientGroupDialog_AddUsersToClientGroupDocument
  )

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      reset()
    }

    setOpen(open)
  }

  const handleCreateClientGroup = async () => {
    const { data } = await createClientGroup({ variables: { name: clientGroupName } })

    if (data && data.createClientGroup) {
      setCurrentScreen(1)
      setClientGroupId(data.createClientGroup.id)

      successToast({
        description: 'Client group created',
        title: 'Success',
      })
    } else {
      errorToast({
        description: 'Please try again',
        title: 'Error creating client group',
      })
    }
  }

  const handleAddUsersToClientGroup = async () => {
    if (clientIds.length === 0) {
      setOpen(false)
      reset()

      return
    }

    const { data } = await addUsersToClientGroup({
      variables: { clientGroupId, userIds: clientIds.map((client) => client.value) },
    })

    if (data && data.addUsersToClientGroup) {
      successToast({
        description: `Clients added to client group: ${clientGroupName}`,
        title: 'Success',
      })

      setOpen(false)
      reset()
    } else {
      errorToast({
        description: 'Please try again',
        title: 'Error adding clients to client group',
      })
    }
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange} open={open}>
      <DialogScreenProvider currentScreenIndex={currentScreen}>
        <DialogContent className="max-w-[500px]" title="Create Client Group">
          <DialogScreen screenNumber={0}>
            <div className="flex flex-col gap-4">
              <Label>Group Name</Label>
              <Input
                className="w-full"
                onChange={(e) => setClientGroupName(e.target.value)}
                placeholder="Enter a name for the client group"
                value={clientGroupName}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Create</Button>
              </DialogClose>
              <Button
                disabled={!clientGroupName}
                loading={createClientGroupLoading}
                onClick={handleCreateClientGroup}
                type="submit"
                variant="cta"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogScreen>
          <DialogScreen screenNumber={1}>
            <div className="flex flex-col gap-3">
              <div>
                <Label>{`Add Clients to ${clientGroupName}`}</Label>
                <Combobox
                  clearable={true}
                  multiple={true}
                  onValueChange={(options) => setClientIds(options)}
                  options={clientsList || []}
                  searchPlaceholder="Search for clients"
                  value={clientIds}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                loading={addUsersToClientGroupLoading}
                onClick={handleAddUsersToClientGroup}
                variant="cta"
              >
                Add Clients
              </Button>
            </DialogFooter>
          </DialogScreen>
        </DialogContent>
      </DialogScreenProvider>
    </Dialog>
  )
}
