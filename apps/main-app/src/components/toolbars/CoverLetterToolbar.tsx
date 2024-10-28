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
  CoverLetterToolbar_CoverLettersDocument,
  CoverLetterToolbar_UpdateArchivedCoverLetterDocument,
} from '@gql/graphql'

export const CoverLetterToolbar = () => {
  const params = useParams()
  const coverLetterId = String(params?.coverLetterId)
  const { errorToast } = useToast()

  const [isArchivingLoading, setIsArchivingLoading] = useState<boolean>(false)

  const { data } = useQuery(CoverLetterToolbar_CoverLettersDocument, {
    variables: {
      coverLetterId,
    },
  })

  const isCoverLetterArchived = data?.coverLetters[0]?.archived ?? false

  const [archiveApplication] = useMutation(CoverLetterToolbar_UpdateArchivedCoverLetterDocument)

  const handleArchiveApplication = async () => {
    setIsArchivingLoading(true)

    try {
      await archiveApplication({
        variables: {
          archived: isCoverLetterArchived ? false : true,
          coverLetterId,
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
      <Link className="text-muted-foreground" href="/cover-letters">
        <IconText leftIcon={<CaretLeft />}>Cover Letters</IconText>
      </Link>
      <Button loading={isArchivingLoading} onClick={handleArchiveApplication}>
        {isCoverLetterArchived ? 'Restore' : 'Archive'}
      </Button>
    </Toolbar>
  )
}
