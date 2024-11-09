'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation, useSubscription } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Loader } from '@rag/ui/Loader'
import { Textarea } from '@rag/ui/Textarea'
import { cn } from '@rag/ui/utils/cn'
import Markdown from 'react-markdown'

import {
  Chat_GetChatDocument,
  Chat_AddMessageDocument,
  ChatsStatusEnum,
  ChatSubscriptionDocument,
  ChatSubscriptionSubscription
} from '@gql/graphql'

import { IntervieweeIcon } from '@/components/IntervieweeIcon'
import { InterviewerIcon } from '@/components/InterviewerIcon'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface IChatProps {
    chatId: string
}

export const Chat = ({ chatId }: IChatProps) => {
  const refChatArray = useRef<ChatSubscriptionSubscription["chat"][]>([])
  const [newMessage, setNewMessage] = useState('')

  const [currMessage, setCurrMessage] = useState('')
  const [voiceSpeaking, setVoiceSpeaking] = useState(false)
  const lastMessageSaid = useRef(false)
  const bottomMessageRef = useRef<HTMLDivElement>(null)
  const inputMessageRef = useRef<HTMLTextAreaElement>(null)
  const enableVoice = false
  const [addMessage, { loading: isAddMessageMutationLoading }] = useMutation(
    Chat_AddMessageDocument
  )

  const { user } = useCurrentUser()
  const name = `${user?.firstName} ${user?.lastName}`

  const { data } = useSuspenseQuery(Chat_GetChatDocument, {
    variables: {
      chatId: [chatId],
    },
  })

  const compareSubscriptionData = (a, b) => {
    return (a.i || 0) - (b.i || 0)
  }

  useSubscription(ChatSubscriptionDocument, {
    onData: ({ data: { data } }) => {
      if (data?.chat?.initial == true) {
        setNewMessage('')
      }
      if (
        data?.chat?.content &&
        data?.chat.chatId == chatId
      ) {
        refChatArray.current.push(data.chat)
        refChatArray.current.sort(compareSubscriptionData)
        setNewMessage(refChatArray.current.map((c) => c.content).join(''))
        const messagesElements = document.getElementsByClassName("message")
        messagesElements[messagesElements.length - 1].scrollIntoView(false)
      }
    },
    variables: {},
  })

  let voice: Maybe<SpeechSynthesisVoice> = null
  if (typeof window !== 'undefined') {
    voice = window?.speechSynthesis
      ?.getVoices()
      ?.filter((voice) => voice.name === 'Samantha' && voice.lang === 'en-US')[0]
  }

  const sayMessage = (message: string) => {
    if (voice && enableVoice) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.voice = voice
      utterance.addEventListener('start', () => {
        setVoiceSpeaking(true)
      })
      utterance.addEventListener('end', () => {
        setVoiceSpeaking(false)
      })
      window?.speechSynthesis?.speak(utterance)
      lastMessageSaid.current = true
    }
  }

  const lastMessage = data?.chats?.[0]?.messages?.[data?.chats?.[0]?.messages.length - 1]
  if (
    lastMessage &&
    !lastMessage.fromUser &&
    !lastMessageSaid.current &&
    voice &&
    data?.chats?.[0]?.status != ChatsStatusEnum.Finished
  ) {
    sayMessage(lastMessage.message)
  }
  const messages = data?.chats?.[0]?.messages || []
  let allMessages = messages
  if (messages.length > 0 && messages[messages.length - 1].fromUser == true && newMessage.length > 0) {
    allMessages = allMessages.concat([{fromUser: false, message: newMessage}])
  }
  const status = data?.chats?.[0]?.status || ChatsStatusEnum.Started

  const handleAddMessage = async () => {
    setNewMessage('')
    refChatArray.current = []
    const response = await addMessage({
      variables: {
        chatId,
        message: currMessage,
      },
    })

    if (
      response?.data?.chatAddMessage?.messages &&
      response?.data?.chatAddMessage?.status != ChatsStatusEnum.Finished
    ) {
      const toSay =
        response.data.chatAddMessage.messages[
          response.data.chatAddMessage.messages.length - 1
        ].message
      sayMessage(toSay)
    }

    if (response?.data?.chatAddMessage) {
      setCurrMessage('')
      inputMessageRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!enableVoice) {
      window?.speechSynthesis?.cancel()
      setVoiceSpeaking(false)
    }
  }, [enableVoice])

  useEffect(() => {
    if (bottomMessageRef.current) {
      bottomMessageRef.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [])

  useEffect(() => {
    if (inputMessageRef.current) {
      inputMessageRef.current.focus()
    }
  }, [inputMessageRef.current])

  return (
    <div className="chat-body flex h-full flex-col justify-between gap-4">
      <div
        className={cn(
          'overflow-y-auto px-2',
          status === ChatsStatusEnum.Finished ? 'h-full' : 'h-[80vh]'
        )}
      >
        {allMessages.map((message, index) => (
          <div className="message mb-6 flex items-start gap-6" key={index}>
            <div className="h-8 w-8">
              {message.fromUser ? <IntervieweeIcon name={name} /> : <InterviewerIcon />}
            </div>
            <div>
              <Markdown
                className={cn(
                  '-mt-[3px] whitespace-pre-wrap',
                  message.fromUser && 'text-muted-foreground'
                )}
              >
                {message.message}
              </Markdown>
            </div>
          </div>
        ))}
        {isAddMessageMutationLoading && <Loader />}
        <div ref={bottomMessageRef} />
      </div>
      <div className="gap sticky flex min-h-[49px] flex-row pr-6">
        {status !== ChatsStatusEnum.Finished && (
          <Textarea
            autoFocus={true}
            className="border-border-accent bg-background/40 min-h-[40px] w-full"
            disabled={voiceSpeaking || isAddMessageMutationLoading}
            key="message"
            onChange={(e) => setCurrMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleAddMessage()
              }
            }}
            placeholder="Type a message..."
            ref={inputMessageRef}
            value={currMessage}
          />
        )}
      </div>
    </div>
  )
}
