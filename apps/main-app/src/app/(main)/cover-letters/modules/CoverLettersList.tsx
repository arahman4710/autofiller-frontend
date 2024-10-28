'use client'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Dot } from '@canyon/ui/Dot'
import { IconText } from '@canyon/ui/IconText'
import { ListableCard } from '@canyon/ui/ListableCard'
import parse from 'html-react-parser'
import { useRouter } from 'next/navigation'

import { CoverLettersList_CoverLettersDocument } from '@gql/graphql'

import { useQueryParams } from '@/hooks/useQueryParams'
import { TViewQueryParam } from '@/types/navigation'

import { CoverLettersListEmpty } from '../components/CoverLettersListEmpty'

export const CoverLettersList = () => {
  const { queryParams } = useQueryParams<{ view?: TViewQueryParam }>()
  const viewQueryParam = queryParams?.get('view')
  const router = useRouter()

  const { data } = useSuspenseQuery(CoverLettersList_CoverLettersDocument, {
    variables: {
      archived: viewQueryParam === 'archived',
    },
  })

  const coverLetters = data?.coverLetters ?? []

  const isArchivedView = viewQueryParam === 'archived'

  return (
    <Shell>
      {coverLetters?.map((coverLetter) => (
        <ListableCard
          className="h-[256px] max-h-[300px] w-[320px]"
          content={parse(coverLetter.body ?? '')}
          date={coverLetter.createdAt}
          key={coverLetter.id}
          label={
            <IconText
              leftIcon={
                <Dot
                  borderColor="bg-transparent"
                  dotColor={isArchivedView ? 'bg-yellow-400' : 'bg-green-400'}
                />
              }
            >
              {coverLetter.usersJob?.companyName}
            </IconText>
          }
          onClick={() => router.push(`/cover-letters/${coverLetter.id}`)}
          title={coverLetter.usersJob?.position}
        />
      ))}
      {viewQueryParam !== 'archived' && coverLetters?.length === 0 && (
        <div className="flex w-full flex-row justify-center">
          <CoverLettersListEmpty />
        </div>
      )}
      {viewQueryParam === 'archived' && coverLetters?.length === 0 && (
        <div className="flex w-full flex-row justify-center">
          <h3 className="text-muted-foreground text-center text-lg">No archived cover letters.</h3>
        </div>
      )}
    </Shell>
  )
}

const Shell = ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div className="flex flex-row flex-wrap gap-6" {...props}>
    {children}
  </div>
)

export const CoverLettersListSkeleton = () => {
  const coverLetters = Array(4).fill(null)

  return (
    <Shell>
      {coverLetters.map((_coverLetter, index) => (
        <ListableCard.Skeleton key={index} />
      ))}
    </Shell>
  )
}
