import { ITooltipContentProps, Tooltip, TooltipContent, TooltipTrigger } from '@rag/ui/Tooltip'

interface IATsInfoTooltipProps {
  plural?: boolean
  variant?: ITooltipContentProps['variant']
}

export const ATSInfoTooltip = ({ plural, variant }: IATsInfoTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild underline>
        <span className="cursor-default">
          {plural ? 'Applicant Tracking Systems' : 'Applicant Tracking System'} (ATS)
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-md" side="bottom" sideOffset={5} variant={variant}>
        Applicant Tracking Systems (ATS) are tools used by employers to streamline the hiring
        process and are often automated to filter out applicants that don't fit the job description.
      </TooltipContent>
    </Tooltip>
  )
}
