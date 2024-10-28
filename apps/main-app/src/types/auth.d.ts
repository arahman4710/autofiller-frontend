import 'next-auth'

import { UsersRoleEnum } from '@gql/graphql'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface User {
    id: string
    role: UsersRoleEnum
    token: string
  }

  // eslint-disable-next-line
  interface Session {
    role: UsersRoleEnum
    token: string
    user: User
  }
}
