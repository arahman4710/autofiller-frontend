'use client'

import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'

import {
  PageChecksList_AllPageChecksDocument,
  PageChecksList_ArchivedPageCheckDocument,
} from '@gql/graphql'

import { useUpgradePlanDialog } from '@/hooks/contexts/useUpgradePlanDialog'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { ListContent } from './ListContent'
import { ListHeader } from './ListHeader'
import { ListPageChecksRow } from './ListPageChecksRow'

export const PageChecksList = () => {
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const router = useRouter()
  const viewQueryParam = queryParams?.get('view')
  const upgradePlanDialog = useUpgradePlanDialog()
  const { isPaidPlan } = useCurrentUser()

  const [archivePageCheck] = useMutation(PageChecksList_ArchivedPageCheckDocument, {
    refetchQueries: [PageChecksList_AllPageChecksDocument]
  })

  const handleArchivePageCheck = async (pageCheckId) => {
    archivePageCheck({ variables: {id: pageCheckId } })
  }

  const { data: allPageChecksData } = useQuery(PageChecksList_AllPageChecksDocument)
  const allPageChecks = allPageChecksData?.pageChecks ?? []

  const title = "Active"

  return (
    <Shell>
      <ListHeader isFirst={true} title={title} />
      <ListContent center={!allPageChecks.length}>
        <div>
          {allPageChecks.map((pageCheck, index) => (
            <ListPageChecksRow
            archivePageCheck={() => handleArchivePageCheck(pageCheck.id)}
            isLast={index === allPageChecks.length - 1}
            key={pageCheck.id}
            pageCheckId={pageCheck.id}
            pageCheckInterval={pageCheck.checkInterval}
            pageCheckUrl={pageCheck.pageUrl}
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
