import { Loader } from '@canyon/ui/Loader'
import { MainShell } from '@canyon/ui/MainShell'

export default function InterviewLoading() {
  return (
    <MainShell className="mx-auto flex h-full w-full flex-row flex-col gap-8">
      <Loader />
    </MainShell>
  )
}
