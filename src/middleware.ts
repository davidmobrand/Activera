import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    console.log('[Middleware] Path:', path)
    console.log('[Middleware] Token:', token)

    // Admin routes protection
    if (path.startsWith('/admin')) {
      console.log('[Middleware] Checking admin access')
      if (token?.role !== 'ADMIN') {
        console.log('[Middleware] Non-admin user attempting to access admin route')
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      console.log('[Middleware] Admin access granted')
    }

    console.log('[Middleware] Access granted')
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('[Middleware] Checking authorization:', !!token)
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/exercises/:path*',
    '/admin/:path*',
  ],
} 