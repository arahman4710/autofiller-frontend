'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@rag/ui/Button'
import { DataTable } from '@rag/ui/DataTable'
import { TagPill } from '@rag/ui/TagPill'
import { cn } from '@rag/ui/utils/cn'
import { useRouter } from 'next/navigation'

import { PageCheck_GetPageCheckDocument, PageCheck_ManuallyRunPageCheckDocument, PageCheckIntervalEnum } from '@gql/graphql'

import { columns } from '../components/Columns'


interface IPageCheckProps {
    pageCheckId: string
  }
  
export const PageCheck = ({ pageCheckId }: IPageCheckProps) => {
  const router = useRouter()

  const [manuallyRunPageCheck, { loading } ] = useMutation(PageCheck_ManuallyRunPageCheckDocument)
  const { data, refetch } = useQuery(PageCheck_GetPageCheckDocument, {
    variables: {
      pageCheckIds: [pageCheckId],
    },
  })
  const pageCheck = data?.pageChecks[0]
  const intervalToColor = {
    [PageCheckIntervalEnum.Daily]: "bg-emerald-600",
    [PageCheckIntervalEnum.Weekly]: "bg-amber-500",
  }

  const pageCheckResultsData = (pageCheck?.pageCheckResults || []).map((pageCheckResult) => {
    return {
      createdAt: pageCheckResult.createdAt,
      result: pageCheckResult.result,
      sameResultAsLastRun: pageCheckResult.sameResultAsLastRun,
    }
  })

  const handleManualRun = () => {
    manuallyRunPageCheck({ variables: {id: pageCheckId } })
  }


  return (
    <div className="flex flex-col pr-6">
        <div className="flex flex-row justify-between w-full mb-4 h-[30px] items-center">
            <div className="flex gap-2">
                <TagPill 
                    children={pageCheck?.checkInterval}
                    className={cn('w-[75px] text-center', pageCheck?.checkInterval && intervalToColor[pageCheck?.checkInterval])}
                />
                <Button
                  onClick={() => window.open(pageCheck?.pageUrl, '_blank')}
                  variant="link"
                 >
                    Visit page
                 </Button>
            </div>
            <Button className="mb-4" loading={loading} onClick={handleManualRun} variant="cta">
                Manually run check
            </Button>
        </div>
        {
            pageCheck?.prompt && (
                <div className="mb-4">
                    {pageCheck?.prompt}
                </div> 
            )
        }
        <DataTable
            columns={columns(refetch)}
            data={pageCheckResultsData}
            // onRowClick={(id: string) => {
            // }}
        />
    </div>
  )
}
