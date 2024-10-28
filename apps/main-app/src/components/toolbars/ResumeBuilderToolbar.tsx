'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button } from '@rag/ui/Button'
import { IconText } from '@rag/ui/IconText'
import { Toolbar } from '@rag/ui/Toolbar'
import { ArchiveBox, CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  ResumeBuilder_GetResumeDocument,
  ResumeBuilderToolbar_ArchiveResumeDocument,
  ResumeBuilderToolbar_GetResumeDocument,
} from '@gql/graphql'

export const ResumeBuilderToolbar = () => {
  const params = useParams()
  const resumeId = String(params?.resumeId)

  const [archiveResume, { loading: archiveResumeLoading }] = useMutation(
    ResumeBuilderToolbar_ArchiveResumeDocument,
    {
      refetchQueries: [ResumeBuilder_GetResumeDocument],
    }
  )

  const { data } = useQuery(ResumeBuilderToolbar_GetResumeDocument, { variables: { id: resumeId } })
  const resume = data?.resumes[0]
  const isArchived = resume?.archived

  const handleArchiveResumeToggle = async () => {
    await archiveResume({ variables: { archived: isArchived ? false : true, id: resumeId } })
  }

  return (
    <Toolbar borderBottom={true}>
      <Link className="text-muted-foreground" href="/resumes">
        <IconText leftIcon={<CaretLeft />}>Resumes</IconText>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <Button
          className="flex items-center gap-2"
          loading={archiveResumeLoading}
          onClick={handleArchiveResumeToggle}
          size="sm"
        >
          {!isArchived ? <ArchiveBox className="text-lg" /> : null}
          {isArchived ? 'Restore' : 'Archive'}
        </Button>
      </div>
    </Toolbar>
  )
}
