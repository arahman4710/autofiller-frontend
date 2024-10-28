import { Loader } from '@rag/ui/Loader'
import { MainShell } from '@rag/ui/MainShell'

export default function InterviewLoading() {
  return (
    <MainShell className="mx-auto flex h-full w-full flex-row flex-col gap-8">
      <Loader />
    </MainShell>
  )
}
