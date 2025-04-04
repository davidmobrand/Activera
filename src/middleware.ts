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

    // Allow public routes and authenticated users
    if (isPublicRoute || token) {
      console.log('[Middleware] Allowing access')
      return NextResponse.next()
    }

    // Redirect to login if no token
    console.log('[Middleware] No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url))
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow the middleware function to handle the logic
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