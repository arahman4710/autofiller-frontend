'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import {
  DocumentsList_AllDocumentsDocument,
  DocumentsList_ArchivedDocumentDocument,
} from '@gql/graphql'

import { ListContent } from './ListContent'
import { ListDocumentRow } from './ListDocumentRow'
import { ListHeader } from './ListHeader'

export const DocumentsList = () => {
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
            documentId={document.id}
            documentName={document.name}
            documentUrl={document.url || ''}
            isLast={index === allDocuments.length - 1}
            key={document.id}
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
