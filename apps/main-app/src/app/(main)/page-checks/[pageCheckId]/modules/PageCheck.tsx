'use client'

import { useRouter } from 'next/navigation'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'

import { PageCheck_GetPageCheckDocument, PageCheck_ManuallyRunPageCheckDocument } from '@gql/graphql'



interface IPageCheckProps {
    pageCheckId: string
  }
  
export const PageCheck = ({ pageCheckId }: IPageCheckProps) => {
  const router = useRouter()

  const [manuallyRunPageCheck, { loading } ] = useMutation(PageCheck_ManuallyRunPageCheckDocument)
  const { data } = useQuery(PageCheck_GetPageCheckDocument, {
    variables: {
      pageCheckIds: [pageCheckId],
    },
  })
  const pageCheck = data?.pageChecks[0]

  const handleManualRun = () => {
    manuallyRunPageCheck({ variables: {id: pageCheckId } })
  }


  return (
    <div className="flex flex-col">
        <Button className="mb-4" loading={loading} onClick={handleManualRun} variant="cta">
            Manually ron check
        </Button>
        <div className="mb-4">
            ({pageCheck?.checkInterval}) {pageCheck?.pageUrl}
        </div>
        {
            pageCheck?.prompt && (
                <div className="mb-4">
                    {pageCheck?.prompt}
                </div> 
            )
        }
        {pageCheck?.pageCheckResults?.map((pageCheckResult, index) => (
          <div className="flex gap-2" key={index}>
            <div>
                {new Date(pageCheckResult.createdAt).toLocaleString()}
            </div>
            <div>
                {pageCheckResult.result}
            </div>
            <div>
                {/* {pageCheckResult} */}
            </div>
            <div>
                {`${pageCheckResult.sameResultAsLastRun}`}
            </div>
          </div>
        ))}
    </div>
  )
}
