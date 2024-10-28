import { MainShell } from '@canyon/ui/MainShell'
import { Skeleton } from '@canyon/ui/Skeleton'

export default function ResumeLoading() {
  return (
    <MainShell className="mx-auto mt-3 flex h-full max-w-screen-xl flex-row flex-col gap-8">
      <div className="">
        <Skeleton className="h-5 w-[120px]" />
      </div>
      <div className="flex flex-row justify-between gap-10">
        <div className="flex w-1/2 flex-col gap-4">
          <Skeleton className="h-[170px] w-full" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
          <Skeleton className="h-[60px]" />
        </div>
        <div className="w-1/2">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    </MainShell>
  )
}
