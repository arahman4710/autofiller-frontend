'use client'

import { Button } from '@rag/ui/Button'

import { useMutation } from '@apollo/client'
import {
    Chat_StartChatDocument,
    ChatSidebar_ChatsDocument,
  } from '@gql/graphql'

import { useRouter } from 'next/navigation'

export const StartChat = () => {
  const [startChat, { loading }] = useMutation(Chat_StartChatDocument, {
    refetchQueries: [ChatSidebar_ChatsDocument]
  })
  const router = useRouter()

  const handleSubmit = async () => {
    const response = await startChat({ variables: {} })
    if (response?.data?.chatStart?.id) {
      router.replace(`/chat/${response.data.chatStart.id}`)
    }
  }

  return (
    <div className="flex justify-center py-[100px]">
    <div className="border-border-secondary bg-background-secondary flex w-[420px] flex-col justify-center gap-4 rounded-lg border p-8 pb-12 pt-8">
      <h2 className="text-lg font-semibold">Start chatting with your dedicated planning assistant</h2>
      <p className="text-muted-foreground">
        Use our assistant to get insights into all your documents and make informed decisions on inventory planning and budgeting.
      </p>
      <Button
        className="mt-4"
        fullWidth={true}
        loading={loading}
        onClick={handleSubmit}
        size="lg"
        type="submit"
        variant="cta"
      >
        Start Chat
      </Button>
    </div>
  </div>
  ) 
}
