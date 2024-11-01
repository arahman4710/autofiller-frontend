import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const pathName = req.nextUrl.pathname
    const isAuthed = !!token
    const isAuthPage = pathName.startsWith('/auth') && pathName !== '/auth/signout'

    // const role = token?.role ?? UsersRoleEnum.Jobseeker
    // const isAdvisoryOrgAccount = advisoryOrgRoles.includes(role as UsersRoleEnum)

    if (isAuthPage) {
      if (isAuthed) {
        return NextResponse.redirect(new URL('/', req.url))
      }

      return null
    }

    if (!isAuthed) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/chat/:path*',
    '/documents/:path*',
    '/dashboard',
    '/auth/:path*',
    '/profile',
  ],
}
