import { MainShell } from '@canyon/ui/MainShell'
import { Skeleton } from '@canyon/ui/Skeleton'

export default function ApplicationLoading() {
  return (
    <MainShell className="mt-3 flex flex-col gap-6">
      <div className="flex flex-row gap-3">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-6 w-[150px]" />
      </div>
      <div>
        <Skeleton className="h-[140px] w-[500px]" />
      </div>
    </MainShell>
  )
}
