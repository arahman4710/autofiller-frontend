import { SessionProvider } from 'next-auth/react'

interface IAuthProvider {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  return <SessionProvider>{children}</SessionProvider>
}
