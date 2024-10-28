import { IconText } from '@rag/ui/IconText'
import { Users } from '@phosphor-icons/react'
import Link from 'next/link'

import { ClientGroup } from '@gql/graphql'

interface IClientGroupHeaderProps {
  clientGroup?: Pick<ClientGroup, 'id' | 'name'>
}

export const ClientGroupHeader = ({ clientGroup }: IClientGroupHeaderProps) => {
  if (!clientGroup) return null

  return (
    <Link href={`/client-groups/${clientGroup.id}`}>
      <IconText
        gap="lg"
        leftIcon={
          <div className="flex  items-center justify-center rounded-lg bg-emerald-400 p-1.5">
            <Users className="text-emerald-800" size={11} weight="fill" />
          </div>
        }
      >
        <h2 className="text-lg">{clientGroup.name}</h2>
      </IconText>
    </Link>
  )
}
