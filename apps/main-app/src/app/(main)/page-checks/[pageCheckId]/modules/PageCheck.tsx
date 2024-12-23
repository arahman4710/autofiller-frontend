'use client'

import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { Button } from '@rag/ui/Button'
import { DataTable } from '@rag/ui/DataTable'
import { useRouter } from 'next/navigation'

import {
  PageCheck_GetPageCheckDocument,
  PageCheck_ManuallyRunPageCheckDocument,
  PageCheckIntervalEnum,
} from '@gql/graphql'

import { PageCheckSheet } from '@/components/sheets/PageCheckSheet'

import { columns } from '../components/Columns'

interface IPageCheckProps {
  pageCheckId: string
}

export const PageCheck = ({ pageCheckId }: IPageCheckProps) => {
  const router = useRouter()
  const [isPageSheetOpen, setIsPageSheetOpen] = useState(false)

  const [manuallyRunPageCheck, { loading }] = useMutation(PageCheck_ManuallyRunPageCheckDocument)
  const { data, refetch } = useQuery(PageCheck_GetPageCheckDocument, {
    variables: {
      pageCheckIds: [pageCheckId],
    },
  })
  const pageCheck = data?.pageChecks[0]
  const intervalToColor = {
    [PageCheckIntervalEnum.Daily]: 'bg-emerald-600',
    [PageCheckIntervalEnum.Weekly]: 'bg-amber-500',
  }

  const pageCheckResultsData = (pageCheck?.pageCheckResults || []).map((pageCheckResult) => {
    return {
      createdAt: pageCheckResult.createdAt,
      result: pageCheckResult.result,
      sameResultAsLastRun: pageCheckResult.sameResultAsLastRun,
    }
  })

  const handleManualRun = () => {
    manuallyRunPageCheck({ variables: { id: pageCheckId } })
  }

  return (
    <div className="flex flex-col pr-6">
      <div className="mb-4 flex h-[30px] w-full flex-row items-center justify-between">
        <div className="flex gap-2">
          <Button className="mb-4" loading={loading} onClick={handleManualRun} variant="cta">
            Manually run check
          </Button>
          <Button
            className="gap-1"
            onClick={() => window.open(pageCheck?.pageUrl, '_blank')}
            variant="link"
          >
            Visit page
            <ArrowSquareOut className="cursor-pointer" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button className="mb-4" onClick={() => setIsPageSheetOpen(true)} variant="default">
            View details
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns(refetch)}
        data={pageCheckResultsData}
        // onRowClick={(id: string) => {
        // }}
      />
      <PageCheckSheet
        onOpenChange={setIsPageSheetOpen}
        open={isPageSheetOpen}
        pageCheck={pageCheck}
      />
    </div>
  )
}
