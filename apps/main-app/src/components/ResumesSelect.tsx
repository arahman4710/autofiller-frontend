import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@canyon/ui/Select'

import { ResumesSelect_ResumesDocument } from '@gql/graphql'

interface IResumesSelectProps {
  archived?: boolean
  onValueChange: (value: string) => void
  optimizedResumes?: boolean
  placeholder?: string
  value: string
}

export const ResumesSelect = ({
  archived = false,
  onValueChange,
  optimizedResumes = true,
  placeholder = 'Select a resume',
  value,
}: IResumesSelectProps) => {
  const { data: resumesData } = useQuery(ResumesSelect_ResumesDocument, {
    variables: { archived, optimized: optimizedResumes },
  })

  const resumes = resumesData?.resumes ?? []

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder}></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {resumes.map((resume) => (
          <SelectItem key={resume.id} value={resume.id}>
            {resume.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
