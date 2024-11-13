'use client'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'

import {
  DocumentsList_AllDocumentsDocument,
  DocumentsList_ArchivedDocumentDocument,
} from '@gql/graphql'

import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { ListDocumentRow } from './ListDocumentRow'
import { ListContent } from './ListContent'
import { ListHeader } from './ListHeader'
import { useMutation } from '@apollo/client'

const MAX_RESUMES = 3

export const DocumentsList = () => {
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const router = useRouter()
  const viewQueryParam = queryParams?.get('view')
  const upgradePlanDialog = useUpgradePlanDialog()
  const { isPaidPlan } = useCurrentUser()

  const [archiveDocument] = useMutation(DocumentsList_ArchivedDocumentDocument, {
    refetchQueries: [DocumentsList_AllDocumentsDocument]
  })

  const handleArchiveDocument = async (documentId) => {
    archiveDocument({ variables: {id: documentId } })
  }

  const { data: allDocumentsData } = useQuery(DocumentsList_AllDocumentsDocument)
  const allDocuments = allDocumentsData?.documents ?? []

  const title = "Active"

  return (
    <Shell>
      <ListHeader isFirst={true} title={title} />
      <ListContent center={!allDocuments.length}>
        <div>
          {allDocuments.map((document, index) => (
            <ListDocumentRow
            archiveDocument={() => handleArchiveDocument(document.id)}
            isLast={index === allDocuments.length - 1}
            key={document.id}
            documentId={document.id}
            documentName={document.name}
            documentUrl={document.url || ''}
            />
          ))}
        </div>
      </ListContent>
    </Shell>
  )
}

const Shell = ({ children }: React.HtmlHTMLAttributes<HTMLDivElement>) => (
  <div className="flex flex-col rounded-bl-lg rounded-br-lg">{children}</div>
)

// export const ResumesListSkeleton = () => {
//   const resumes = Array(4).fill(null)

//   return (
//     <Shell>
//       <ListHeaderSkeleton />
//       <ListContent>
//         {resumes.map((_resume, index) => (
//           <ListResumeRowSkeleton key={index} />
//         ))}
//       </ListContent>
//     </Shell>
//   )
// }
