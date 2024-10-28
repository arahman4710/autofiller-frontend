'use client'

import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@canyon/ui/Button'
import { IconText } from '@canyon/ui/IconText'
import { Toolbar } from '@canyon/ui/Toolbar'
import { useToast } from '@canyon/ui/useToast'
import { CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  ApplicationToolbar_UpdateUsersJobArchiveDocument,
  ApplicationToolbar_UsersJobsArchivedDocument,
  Applications_UsersJobsDocument,
} from '@/gql/__generated__/graphql'

export const ApplicationToolbar = () => {
  const params = useParams()
  const applicationId = String(params?.applicationId)

  const { errorToast } = useToast()
  const [isArchivingLoading, setIsArchivingLoading] = useState<boolean>(false)

  const { data } = useQuery(ApplicationToolbar_UsersJobsArchivedDocument, {
    variables: {
      usersJobIds: [applicationId],
    },
  })

  const isApplicationArchived = data?.usersJobs[0].archived

  const [archiveApplication] = useMutation(ApplicationToolbar_UpdateUsersJobArchiveDocument, {
    refetchQueries: [Applications_UsersJobsDocument],
  })

  const handleArchiveApplication = async () => {
    setIsArchivingLoading(true)

    try {
      await archiveApplication({
        variables: {
          archive: isApplicationArchived ? false : true,
          id: applicationId,
        },
      })
    } catch {
      errorToast()
    } finally {
      setIsArchivingLoading(false)
    }
  }

  return (
    <Toolbar>
      <Link className="text-muted-foreground" href="/board">
        <IconText leftIcon={<CaretLeft />}>Applications</IconText>
      </Link>
      <Button loading={isArchivingLoading} onClick={handleArchiveApplication}>
        {isApplicationArchived ? 'Restore' : 'Archive'}
      </Button>
    </Toolbar>
  )
}
