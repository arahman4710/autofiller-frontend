// import { getClient } from './apolloClient'
import signJWT from 'jwt-encode'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import z from 'zod'

import {
  AuthProviderTypeEnum,
  CredentialsAuthenticationEmailVerifyDocument,
  CredentialsAuthenticationSignInDocument,
  ProviderAuthenticationDocument,
} from '@gql/graphql'

import { makeApolloClient } from './apolloWrapper'

const useSecureCookies = process.env.NODE_ENV === 'production'

export const authOptions: (any?) => NextAuthOptions = (req = null) => ({
  callbacks: {
    async jwt({ account, profile, token, user }) {
      if (account?.type === 'oauth') {
        const apolloClient = makeApolloClient()

        const { email, name } = profile ?? {
          email: '',
          name: '',
        }

        const splitName = name?.split(' ')
        const firstName = splitName?.[0] ?? ''
        const lastName = splitName?.[1] ?? ''

        const signedJWT = signJWT(email, process.env.GOOGLE_CLIENT_SECRET as string)
        const resumeId = req?.cookies?.['resume-builder-id']
        const referredByUserUniqueId = req?.cookies?.['referral-code']

        const { data, errors } = await apolloClient.mutate({
          mutation: ProviderAuthenticationDocument,
          variables: {
            data: signedJWT,
            firstName,
            lastName,
            provider: AuthProviderTypeEnum.Google,
            referredByUserUniqueId,
            resumeUniqueId: resumeId,
          },
        })

        const { token: sessionToken, user: providerUser } = data?.authProviderAuthenticate ?? {}

        if (!sessionToken) throw new Error('Error authenticating with provider')

        token.accessToken = sessionToken
        token.id = providerUser?.id
      } else if (account?.type === 'credentials') {
        token.accessToken = user.token
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      session.token = token.accessToken as string
      session.user.id = token.id as string

      return session
    },
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        domain: useSecureCookies ? 'ecomm-rag-app-00b12e8466f4.herokuapp.com' : 'localhost',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    signUp: '/auth/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        const { data, errors } = await makeApolloClient().mutate({
          mutation: CredentialsAuthenticationSignInDocument,
          variables: {
            email,
            password,
          },
        })

        const { token: sessionToken, user } = data?.authSignIn ?? {}

        if (!sessionToken) return null

        return {
          id: user?.id ?? '',
          token: sessionToken,
        }
      },
      credentials: {
        email: {},
        password: {},
      },
      id: 'signin',
      name: 'Sign In',
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            emailVerificationCode: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        try {
          const { data, errors } = await makeApolloClient().mutate({
            mutation: CredentialsAuthenticationEmailVerifyDocument,
            variables: {
              emailVerificationCode: parsedCredentials.data.emailVerificationCode,
              firstName: parsedCredentials.data.firstName,
              lastName: parsedCredentials.data.lastName,
              password: parsedCredentials.data.password,
            },
          })

          const { token: sessionToken, user } = data?.userEmailVerify ?? {}

          if (!sessionToken) return null

          return {
            id: user?.id ?? '',
            token: sessionToken,
          }
        } catch (error) {
          console.error('Error during sign up:', error)
          return null
        }
      },
      credentials: {
        emailVerificationCode: {},
        firstName: {},
        lastName: {},
        password: {},
      },
      id: 'signup',
      name: 'Sign Up',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
})
