import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Helper function to create redirect response with logging
function createRedirectResponse(url: string, req: Request, reason: string) {
  const response = NextResponse.redirect(url)
  console.log('[Middleware] Creating redirect:', {
    from: req.url,
    to: url,
    reason,
    timestamp: new Date().toISOString()
  })
  return response
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const timestamp = new Date().toISOString()

    console.log('[Middleware] Processing request:', {
      timestamp,
      path,
      hasToken: !!token,
      role: token?.role,
      method: req.method,
      headers: {
        referer: req.headers.get('referer'),
        cookie: req.headers.get('cookie') ? 'present' : 'absent'
      }
    })

    // Always allow API routes and static files
    if (path.startsWith('/api/') || path.startsWith('/_next/') || path === '/favicon.ico') {
      console.log('[Middleware] Skipping auth check for:', path)
      return NextResponse.next()
    }

    const dashboardUrl = new URL('/dashboard', req.url)
    const loginUrl = new URL('/login', req.url)

    // If on login page and has token, redirect to dashboard
    if (path === '/login' && token) {
      console.log('[Middleware] Redirecting authenticated user from login:', {
        userId: token.sub,
        role: token.role
      })
      return createRedirectResponse(dashboardUrl.toString(), req, 'authenticated_user_on_login')
    }

    // If no token and not on login page, redirect to login
    if (!token && path !== '/login') {
      console.log('[Middleware] Redirecting unauthenticated user to login:', {
        path,
        referer: req.headers.get('referer')
      })
      return createRedirectResponse(loginUrl.toString(), req, 'unauthenticated_user')
    }

    // If trying to access admin routes without admin role
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      console.log('[Middleware] Blocking non-admin access:', {
        path,
        userRole: token?.role,
        userId: token?.sub
      })
      return createRedirectResponse(dashboardUrl.toString(), req, 'unauthorized_admin_access')
    }

    console.log('[Middleware] Allowing request:', {
      path,
      userId: token?.sub,
      role: token?.role
    })
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log('[Middleware] Auth check:', {
          hasToken: !!token,
          tokenId: token?.sub,
          role: token?.role,
          path: req?.nextUrl?.pathname,
          timestamp: new Date().toISOString()
        })
        return true
      }
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