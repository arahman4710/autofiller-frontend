'use client'

import { MainShell } from '@rag/ui/MainShell'

import { ListHeaderSkeleton } from './components/ListHeader'
import { ListTodoRowSkeleton } from './components/ListTodoRow'

export default function Loading() {
  return (
    <MainShell>
      <div className="mt-3 flex flex-col rounded-bl-lg rounded-br-lg">
        <ListHeaderSkeleton />
        {Array(4)
          .fill(undefined)
          .map((_, index) => (
            <div className="bg-background/40 flex h-full w-full w-full flex-col" key={index}>
              <ListTodoRowSkeleton />
            </div>
          ))}
      </div>
    </MainShell>
  )
}
