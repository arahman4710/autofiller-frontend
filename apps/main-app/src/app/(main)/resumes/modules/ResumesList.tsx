'use client'

import { useMutation } from '@apollo/client'
import { useQuery, useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@canyon/ui/Tabs'
import { AsteriskSimple, CircleDashed } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import {
  ResumeList_DuplicateResumeDocument,
  ResumeList_UpdateArchivedResumeDocument,
  ResumesList_AllResumesDocument,
  ResumesList_ResumesDocument,
} from '@gql/graphql'

import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { ListContent } from '../components/ListContent'
import { ListEmpty } from '../components/ListEmpty'
import { ListHeader, ListHeaderSkeleton } from '../components/ListHeader'
import { ListResumeRow, ListResumeRowSkeleton } from '../components/ListResumeRow'

const MAX_RESUMES = 3

export const ResumesList = () => {
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const router = useRouter()
  const viewQueryParam = queryParams?.get('view')
  const upgradePlanDialog = useUpgradePlanDialog()
  const { isPaidPlan } = useCurrentUser()

  const { data: allResumesData } = useQuery(ResumesList_AllResumesDocument)
  const allResumes = allResumesData?.resumes ?? []

  const { data } = useSuspenseQuery(ResumesList_ResumesDocument, {
    variables: {
      aiGenerated: false,
      archived: viewQueryParam === 'archived',
    },
  })
  const resumes = data?.resumes ?? []

  const { data: aiGeneratedResumesData } = useQuery(ResumesList_ResumesDocument, {
    variables: {
      aiGenerated: true,
      archived: viewQueryParam === 'archived',
    },
  })
  const aiGeneratedResumes = aiGeneratedResumesData?.resumes ?? []

  const [archiveResume] = useMutation(ResumeList_UpdateArchivedResumeDocument)
  const [duplicateResume] = useMutation(ResumeList_DuplicateResumeDocument)

  const handleArchiveResume = async ({ id }: { id: string }) => {
    await archiveResume({
      refetchQueries: [ResumesList_ResumesDocument],
      variables: { archived: true, id },
    })
  }

  const handleRestoreResume = async ({ id }: { id: string }) => {
    await archiveResume({
      refetchQueries: [ResumesList_ResumesDocument],
      variables: { archived: false, id },
    })
  }

  const handleDuplicateResume = async ({ id }: { id: string }) => {
    if (allResumes?.length && allResumes.length >= MAX_RESUMES && !isPaidPlan) {
      upgradePlanDialog.setOpen(true)
      return
    }

    const response = await duplicateResume({
      refetchQueries: [ResumesList_ResumesDocument, ResumesList_AllResumesDocument],
      variables: { id },
    })

    if (response?.data?.duplicateResume?.id) {
      router.replace(`/resumes/${response?.data?.duplicateResume.id}`)
    }
  }

  const title = viewQueryParam === 'archived' ? 'Archived' : 'Active'

  return (
    <Shell>
      <Tabs defaultValue="base">
        <TabsList className="pl-6">
          <TabsTrigger count={resumes?.length} icon={<CircleDashed />} value="base">
            Base Resumes
          </TabsTrigger>
          <TabsTrigger
            count={aiGeneratedResumes?.length}
            icon={<AsteriskSimple />}
            value="optimized"
          >
            Job Optimized Resumes
          </TabsTrigger>
        </TabsList>
        <ListHeader isFirst={true} title={title} />
        <TabsContent value="base">
          <ListContent center={!resumes.length}>
            {!resumes?.length ? (
              <ListEmpty />
            ) : (
              <div>
                {resumes.map((resume, index) => (
                  <ListResumeRow
                    archiveResume={() => handleArchiveResume({ id: resume.id })}
                    createdAt={resume.createdAt}
                    duplicateResume={() => handleDuplicateResume({ id: resume.id })}
                    isArchived={resume.archived}
                    isLast={index === resumes.length - 1}
                    key={resume.id}
                    restoreResume={() => handleRestoreResume({ id: resume.id })}
                    resumeId={resume.id}
                    resumeName={resume.name}
                    updatedAt={resume.updatedAt}
                  />
                ))}
              </div>
            )}
          </ListContent>
        </TabsContent>
        <TabsContent value="optimized">
          <ListContent center={!aiGeneratedResumes?.length}>
            {!aiGeneratedResumes?.length ? (
              <ListEmpty isOptimizeResume={true} />
            ) : (
              <div>
                {aiGeneratedResumes.map((resume, index) => (
                  <ListResumeRow
                    archiveResume={() => handleArchiveResume({ id: resume.id })}
                    createdAt={resume.createdAt}
                    duplicateResume={() => handleDuplicateResume({ id: resume.id })}
                    isArchived={resume.archived}
                    isLast={index === aiGeneratedResumes.length - 1}
                    key={resume.id}
                    restoreResume={() => handleRestoreResume({ id: resume.id })}
                    resumeId={resume.id}
                    resumeName={resume.name}
                    updatedAt={resume.updatedAt}
                  />
                ))}
              </div>
            )}
          </ListContent>
        </TabsContent>
      </Tabs>
    </Shell>
  )
}

const Shell = ({ children }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div className="flex flex-col rounded-bl-lg rounded-br-lg">{children}</div>
)

export const ResumesListSkeleton = () => {
  const resumes = Array(4).fill(null)

  return (
    <Shell>
      <ListHeaderSkeleton />
      <ListContent>
        {resumes.map((_resume, index) => (
          <ListResumeRowSkeleton key={index} />
        ))}
      </ListContent>
    </Shell>
  )
}
