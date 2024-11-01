'use client'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { cn } from '@rag/ui/utils/cn'
import { useParams, useRouter } from 'next/navigation'

import { ChatSidebar_ChatsDocument } from '@gql/graphql'

export const ChatSidebar = () => {
  const { data, loading } = useQuery(ChatSidebar_ChatsDocument)
  const params = useParams<{ chatId: string }>()
  const chatId = params?.chatId ?? ''

  const router = useRouter()

//   if (loading) {
//     return <InterviewSidebarSkeleton />
//   }

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`)
  }

  const chats = data?.chats ?? []

  return (
    <Shell>
      {chats?.length ? (
        <ul>
          {chats.map(({ id }) => (
            <li
              className={cn(
                'hover:bg-background/40 flex flex-row gap-3 rounded-md px-4 py-2',
                id === chatId && 'bg-background/60'
              )}
              key={id}
              onClick={() => handleChatClick(id)}
            >
              <div className="flex flex-col">
                <div>Chat {id}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted-foreground px-4 py-2">No chats.</div>
      )}
    </Shell>
  )
}

const Shell = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="border-border h-full min-w-80 cursor-pointer overflow-y-auto border-r px-2 py-3">
    {children}
  </div>
)

// export const InterviewSidebarSkeleton = () => {
//   const interviews = Array(5).fill(null)

//   return (
//     <Shell>
//       <div className="px-4">
//         {interviews.map((_, index) => (
//           <Skeleton className="my-6 h-8 w-[75%]" key={index} />
//         ))}
//       </div>
//     </Shell>
//   )
// }
