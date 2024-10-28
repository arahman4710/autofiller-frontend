import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { IconText } from '@rag/ui/IconText'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rag/ui/Select'
import { Plus } from '@phosphor-icons/react'

import {
  ApplicationSelect_UsersJobsDocument,
  ApplicationSelect_UsersJobsFragment,
} from '@gql/graphql'

interface IApplicationSelectProps {
  archived?: boolean
  className?: string
  onValueChange: (value: string) => void
  selectItemAppend?: (application: ApplicationSelect_UsersJobsFragment) => React.ReactNode
  value: string
}

export const ApplicationSelect = ({
  archived = false,
  className,
  onValueChange,
  selectItemAppend,
  value,
}: IApplicationSelectProps) => {
  const { data: applicationsData } = useQuery(ApplicationSelect_UsersJobsDocument, {
    variables: { archived },
  })

  const applications = applicationsData?.usersJobs ?? []

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select or create an application"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="create">
          <IconText className="text-accent-foreground" leftIcon={<Plus />}>
            Create new application
          </IconText>
        </SelectItem>
        {applications.map((application) => (
          <SelectItem key={application.id} value={application.id}>
            <div className="flex flex-row items-center gap-2">
              <div>
                <span className="text-accent-foreground">{application.position}</span>
                <span className="mx-2">•</span>
                <span className="text-muted-foreground">{application.companyName}</span>
              </div>
              {selectItemAppend?.(application)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
