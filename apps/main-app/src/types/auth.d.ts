import 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface Business {
    id: string
    name: string
  }

  // eslint-disable-next-line
  interface User {
    id: string
    token: string
    business: Business
  }

  // eslint-disable-next-line
  interface Session {
    token: string
    user: User
  }
}
