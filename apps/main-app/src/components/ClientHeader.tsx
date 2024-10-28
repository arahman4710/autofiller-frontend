import { IconText } from '@rag/ui/IconText'
import { User } from '@phosphor-icons/react'
import Link from 'next/link'

import { Users } from '@gql/graphql'

interface IClientHeaderProps {
  client?: Pick<Users, 'email' | 'firstName' | 'id' | 'lastName'>
}

export const ClientHeader = ({ client }: IClientHeaderProps) => {
  if (!client) return null

  const clientName = `${client.firstName} ${client.lastName}`

  return (
    <Link href={`/clients/${client.id}`}>
      <IconText
        gap="lg"
        leftIcon={
          <div className="flex  items-center justify-center rounded-lg bg-purple-400 p-1.5">
            <User className="text-purple-800" size={11} weight="fill" />
          </div>
        }
      >
        <h2 className="text-lg">{clientName}</h2>
      </IconText>
    </Link>
  )
}
