'use client'

import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@canyon/ui/Button'
import { Combobox, IComboboxOption } from '@canyon/ui/Combobox'
import { Dialog, DialogContent, DialogFooter } from '@canyon/ui/Dialog'
import { Input } from '@canyon/ui/Input'
import { Label } from '@canyon/ui/Label'
import { VerticalGroup, VerticalGroupColumn } from '@canyon/ui/VerticalGroup'

import {
  EditClientGroupDialog_ClientGroupsDocument,
  EditClientGroupDialog_ClientsDocument,
  EditClientGroupDialog_EditClientGroupDocument,
} from '@/gql/__generated__/graphql'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface IEditClientGroupDialogProps {
  clientGroupId: string
  open: boolean
  setOpen: (open: boolean) => void
}

export const EditClientGroupDialog = ({
  clientGroupId,
  open,
  setOpen,
}: IEditClientGroupDialogProps) => {
  const { user } = useCurrentUser()

  const [name, setName] = useState('')
  const [clients, setClients] = useState<IComboboxOption[]>([])

  const { data: clientGroupData, loading: clientGroupLoading } = useQuery(
    EditClientGroupDialog_ClientGroupsDocument,
    {
      onCompleted: (data) => {
        const clientGroup = data?.clientGroups[0]

        if (clientGroup?.name) {
          setName(clientGroup.name)
        }

        if (clientGroup?.clients.length > 0) {
          setClients(
            clientGroup.clients.map((client) => ({
              label: `${client.user.firstName} ${client.user.lastName}`,
              value: client.id,
            }))
          )
        }
      },
      skip: !open,
      variables: { clientGroupId },
    }
  )

  const { data: clientsData } = useQuery(EditClientGroupDialog_ClientsDocument, {})

  const clientsList = clientsData?.clients.data || []
  const advisorClientsList = clientsList.map((client) => ({
    label: `${client.user.firstName} ${client.user.lastName}`,
    value: client.id,
  }))

  const reset = () => {
    setName('')
    setClients([])
  }

  const [editClientGroup, { loading: isSaving }] = useMutation(
    EditClientGroupDialog_EditClientGroupDocument,
    {
      refetchQueries: [EditClientGroupDialog_ClientGroupsDocument],
    }
  )

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      reset()
    }

    setOpen(open)
  }

  const handleSave = async () => {
    const { data } = await editClientGroup({
      variables: { clientGroupId, name, userIds: clients.map((c) => c.value) },
    })

    if (data?.editClientGroup) {
      setOpen(false)

      reset()
    }
  }

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogContent className="min-w-[400px]" title="Edit Client Group">
        <VerticalGroup>
          <VerticalGroupColumn>
            <Label>Name</Label>
            <Input onChange={(e) => setName(e.target.value)} value={name} />
          </VerticalGroupColumn>
          <VerticalGroupColumn>
            <Label>Add Clients</Label>
            <Combobox
              clearable={true}
              multiple={true}
              onValueChange={(options) => setClients(options)}
              options={advisorClientsList}
              value={clients}
            />
          </VerticalGroupColumn>
          <VerticalGroupColumn>
            <Label>Clients</Label>
            {clients.map((client) => (
              <div key={client.value}>{client.label}</div>
            ))}
            {clients.length === 0 && (
              <span className="text-muted-foreground italic">No clients</span>
            )}
          </VerticalGroupColumn>
        </VerticalGroup>
        <DialogFooter>
          <Button loading={isSaving} onClick={handleSave} variant="cta">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
