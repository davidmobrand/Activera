import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Helper function to create redirect response with logging
function createRedirectResponse(url: string, req: Request, reason: string) {
  const response = NextResponse.redirect(url)
  console.log('[Middleware] Creating redirect:', {
    from: req.url,
    to: url,
    reason,
    timestamp: new Date().toISOString(),
    headers: {
      cookie: req.headers.get('cookie') ? 'present' : 'absent',
      authorization: req.headers.get('authorization') ? 'present' : 'absent'
    }
  })
  return response
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    console.log('[Middleware] Processing request:', {
      path,
      hasToken: !!token,
      tokenDetails: token ? {
        role: token.role,
        email: token.email
      } : null
    })

    // Always allow API routes and static files
    if (path.startsWith('/api/') || path.startsWith('/_next/') || path === '/favicon.ico') {
      return NextResponse.next()
    }

    // Let components handle auth state
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all routes - components will handle auth state
        return true
      }
    }
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