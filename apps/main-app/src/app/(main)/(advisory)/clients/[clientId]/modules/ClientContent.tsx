'use client'

import { useSuspenseQuery } from '@apollo/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@rag/ui/Tabs'
import { DotsNine, Files } from '@phosphor-icons/react'
import { useQueryState } from 'nuqs'

import { ClientContent_ClientDocument } from '@gql/graphql'

import { ClientBoard } from './ClientBoard'
import { ClientResumes } from './ClientResumes'

interface IClientContentProps {
  clientId: string
}

type TTabQueryParam = 'applications' | 'resumes'

export const ClientContent = ({ clientId }: IClientContentProps) => {
  const [tab, setTab] = useQueryState('tab', {
    defaultValue: 'applications',
  })

  const { data } = useSuspenseQuery(ClientContent_ClientDocument, {
    variables: {
      clientId,
    },
  })

  const client = data?.client
  const activeResumesCount = client?.activeResumes?.length ?? 0
  const activeApplicationsCount = client?.usersJobs?.filter((job) => !job.archived).length ?? 0

  return (
    <div className="py-2">
      <Tabs defaultValue={tab} onValueChange={(value) => setTab(value as TTabQueryParam)}>
        <TabsList className="pl-6">
          <TabsTrigger count={activeApplicationsCount} icon={<DotsNine />} value="applications">
            Applications
          </TabsTrigger>
          <TabsTrigger count={activeResumesCount} icon={<Files />} value="resumes">
            Resumes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <ClientBoard clientId={clientId} />
        </TabsContent>
        <TabsContent value="resumes">
          <ClientResumes clientId={clientId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
