'use client'

import { useEffect, useRef, useState } from 'react'

import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Loader } from '@canyon/ui/Loader'
import { Textarea } from '@canyon/ui/Textarea'
import { cn } from '@canyon/ui/utils/cn'
import Markdown from 'react-markdown'

import {
  Interview_GetInterviewDocument,
  Interviews_InterviewAddMessageDocument,
  InterviewsStatusEnum,
} from '@gql/graphql'

import { IntervieweeIcon } from '@/components/IntervieweeIcon'
import { InterviewerIcon } from '@/components/InterviewerIcon'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useInterviewStore } from '@/store/interviewStore'

interface IInterviewProps {
  interviewId: string
}

export const Interview = ({ interviewId }: IInterviewProps) => {
  const [currMessage, setCurrMessage] = useState('')
  const [voiceSpeaking, setVoiceSpeaking] = useState(false)
  const lastMessageSaid = useRef(false)
  const bottomMessageRef = useRef<HTMLDivElement>(null)
  const inputMessageRef = useRef<HTMLTextAreaElement>(null)
  const enableVoice = useInterviewStore((state) => state.enableVoice)
  const [addMessage, { loading: isAddMessageMutationLoading }] = useMutation(
    Interviews_InterviewAddMessageDocument
  )

  const { user } = useCurrentUser()
  const name = `${user?.firstName} ${user?.lastName}`

  const { data } = useSuspenseQuery(Interview_GetInterviewDocument, {
    variables: {
      interviewId: [interviewId],
    },
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

  const lastMessage = data?.interviews?.[0]?.messages?.[data?.interviews?.[0]?.messages.length - 1]
  if (
    lastMessage &&
    !lastMessage.fromUser &&
    !lastMessageSaid.current &&
    voice &&
    data?.interviews?.[0]?.status != InterviewsStatusEnum.Finished
  ) {
    sayMessage(lastMessage.message)
  }
  const messages = data?.interviews?.[0]?.messages || []
  const status = data?.interviews?.[0]?.status || InterviewsStatusEnum.Started
  const score = data?.interviews?.[0]?.score || null

  const handleAddMessage = async () => {
    const response = await addMessage({
      variables: {
        interviewId,
        message: currMessage,
      },
    })

    if (
      response?.data?.interviewAddMessage?.messages &&
      response?.data?.interviewAddMessage?.status != InterviewsStatusEnum.Finished
    ) {
      const toSay =
        response.data.interviewAddMessage.messages[
          response.data.interviewAddMessage.messages.length - 1
        ].message
      sayMessage(toSay)
    }

    if (response?.data?.interviewAddMessage) {
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
    <div className="flex h-full flex-col justify-between gap-4">
      <div
        className={cn(
          'overflow-y-auto px-2',
          status === InterviewsStatusEnum.Finished ? 'h-full' : 'h-[80vh]'
        )}
      >
        {messages.map((message, index) => (
          <div className="mb-6 flex items-start gap-6" key={index}>
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
        {status !== InterviewsStatusEnum.Finished && (
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
