import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const isApiRoute = path.startsWith('/api/')

    console.log('[Middleware] Checking route:', {
      path,
      isApiRoute,
      hasToken: !!token,
      userRole: token?.role,
    })

    // Skip middleware for API routes
    if (isApiRoute) {
      console.log('[Middleware] Skipping API route')
      return NextResponse.next()
    }

    // Admin routes protection
    if (path.startsWith('/admin')) {
      console.log('[Middleware] Checking admin access')
      if (!token) {
        console.log('[Middleware] No token found, redirecting to login')
        return NextResponse.redirect(new URL('/login', req.url))
      }
      if (token.role !== 'ADMIN') {
        console.log('[Middleware] Non-admin user attempting to access admin route')
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
      console.log('[Middleware] Admin access granted')
    }

    // Protected routes
    if (!token && !path.startsWith('/login')) {
      console.log('[Middleware] No token found, redirecting to login')
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    console.log('[Middleware] Access granted')
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        console.log('[Middleware] Authorization check:', {
          path,
          hasToken: !!token,
          isLoginPage: path === '/login',
        })

        // Allow access to login page without token
        if (path === '/login') {
          return true
        }

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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 