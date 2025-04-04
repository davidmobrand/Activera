import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const isApiRoute = path.startsWith('/api/')
    const isLoginPage = path === '/login'
    const isPublicRoute = isApiRoute || isLoginPage || path.startsWith('/_next') || path === '/favicon.ico'

    console.log('[Middleware] Route check:', {
      path,
      isApiRoute,
      isLoginPage,
      isPublicRoute,
      hasToken: !!token,
      userRole: token?.role,
    })

    // Allow public routes
    if (isPublicRoute) {
      console.log('[Middleware] Public route, allowing access')
      return NextResponse.next()
    }

    // Redirect to login if no token
    if (!token) {
      console.log('[Middleware] No token found, redirecting to login')
      const loginUrl = new URL('/login', req.url)
      // Only use pathname to avoid double-encoding of full URLs
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    // Admin routes protection
    if (path.startsWith('/admin')) {
      console.log('[Middleware] Checking admin access')
      if (token.role !== 'ADMIN') {
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
      authorized: ({ token, req }) => {
        // This is only used to determine if the middleware function should run
        return true
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

// Match all routes except static files and public assets
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /favicon.ico, /sitemap.xml (public files)
     */
    '/((?!api|_next|static|favicon.ico|sitemap.xml).*)',
  ],
} 