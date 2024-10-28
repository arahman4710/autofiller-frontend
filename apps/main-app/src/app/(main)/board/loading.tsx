'use client'

import { MainShell } from '@rag/ui/MainShell'

import { UsersJobsStatusEnum } from '@gql/graphql'

import { ApplicationCardSkeleton } from './components/ApplicationCard'
import { StatusColumn, StatusHeaderSkeleton } from './components/StatusColumn'
import { Shell } from './modules/Applications'

export default function Loading() {
  const columns = Array(Object.keys(UsersJobsStatusEnum).length).fill(null)

  return (
    <MainShell>
      <Shell>
        {columns.map((_col, index) => (
          <StatusColumn key={index}>
            <StatusHeaderSkeleton />
            {index === 0 || index % 2 === 0 ? <ApplicationCardSkeleton /> : null}
          </StatusColumn>
        ))}
      </Shell>
    </MainShell>
  )
}
