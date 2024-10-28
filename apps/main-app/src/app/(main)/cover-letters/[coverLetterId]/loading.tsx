import { MainShell } from '@rag/ui/MainShell'
import { Skeleton } from '@rag/ui/Skeleton'

export default function ResumeLoading() {
  return (
    <MainShell>
      <div className="mx-auto mt-3 flex h-full max-w-screen-xl flex-row flex-col gap-8">
        <div className="">
          <Skeleton className="h-5 w-[120px]" />
        </div>
        <div className="flex flex-row justify-between gap-10">
          <div className="flex w-1/2 flex-col gap-4">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[150px]" />
            <Skeleton className="h-[150px]" />
            <Skeleton className="h-[150px]" />
          </div>
          <div className="w-1/2">
            <Skeleton className="h-[800px] w-full" />
          </div>
        </div>
      </div>
    </MainShell>
  )
}
