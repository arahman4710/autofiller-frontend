import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { Combobox, IComboboxOption } from '@rag/ui/Combobox'
import { Label } from '@rag/ui/Label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@rag/ui/Sheet'

import {
  AdvisorSheet_AssignClientToAdvisorDocument,
  AdvisorSheet_ClientsDocument,
  Users,
  UsersJobs,
  UsersRoleEnum,
} from '@gql/graphql'

interface IAdvisorSheetProps {
  advisor?: {
    id: string
    jobsShared: Pick<UsersJobs, 'id' | 'numClientsApplied' | 'numClientsShared'>[]
    user: Pick<Users, 'firstName' | 'lastName' | 'role'>
  }
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const AdvisorSheet = ({ advisor, onOpenChange, open }: IAdvisorSheetProps) => {
  const [selectedClientIds, setSelectedClientIds] = useState<IComboboxOption[]>([])

  const { id = '', jobsShared = [], user } = advisor || {}
  const { firstName, lastName, role } = user || {}

  const [assignClientToAdvisor, { loading: assignClientToAdvisorLoading }] = useMutation(
    AdvisorSheet_AssignClientToAdvisorDocument,
    {
      refetchQueries: [AdvisorSheet_ClientsDocument],
    }
  )

  const { data } = useQuery(AdvisorSheet_ClientsDocument, {
    variables: {
      advisorIds: [],
      page: 1,
      perPage: 100,
    },
  })

  const { data: advisorData } = useQuery(AdvisorSheet_ClientsDocument, {
    variables: {
      advisorIds: [id],
      page: 1,
      perPage: 100,
    },
  })

  const allClients = data?.clients.data || []
  const advisorClients = advisorData?.clients.data || []

  const clients = allClients.filter(
    (client) => !advisorClients.find((c) => c.user.id === client.user.id)
  )

  const clientsOptions = clients.map((client) => ({
    label: `${client.user.firstName} ${client.user.lastName}`,
    value: client.user.id,
  }))

  const handleAssignClientsToAdvisor = async () => {
    try {
      const result = await assignClientToAdvisor({
        variables: { advisorId: id, clientIds: selectedClientIds.map((c) => c.value) },
      })

      resetState()
    } catch (error) {
      console.error(error)
    }
  }

  const resetState = () => {
    setSelectedClientIds([])
  }

  useEffect(() => {
    if (!open) {
      resetState()
    }
  }, [open])

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-blue-300">Advisor</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Name</Label>
            <span>
              {firstName} {lastName}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Num. Jobs Shared</Label>
            <span>{jobsShared.length || 'None'}</span>
          </div>
          {role == UsersRoleEnum.Advisor && (
            <>
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Assign Clients</Label>
                <Combobox
                  clearable={true}
                  multiple={true}
                  onValueChange={(options) => {
                    setSelectedClientIds(options)
                  }}
                  options={clientsOptions}
                  value={selectedClientIds}
                />
                <Button
                  disabled={!selectedClientIds.length}
                  fullWidth={true}
                  loading={assignClientToAdvisorLoading}
                  onClick={handleAssignClientsToAdvisor}
                  variant="cta"
                >
                  Assign
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-muted-foreground">Assigned Clients</Label>
                <div>
                  {advisorClients.map((client) => (
                    <div key={client.user.id}>
                      {client.user.firstName} {client.user.lastName}
                    </div>
                  ))}
                  {advisorClients.length === 0 && <div>No clients assigned</div>}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
