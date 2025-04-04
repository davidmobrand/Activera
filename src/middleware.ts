import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const timestamp = new Date().toISOString()

    console.log('[Middleware] Request started:', {
      timestamp,
      path,
      hasToken: !!token,
      role: token?.role,
      url: req.url,
      method: req.method,
      headers: {
        referer: req.headers.get('referer'),
        userAgent: req.headers.get('user-agent')
      }
    })

    // Always allow API routes and static files
    if (path.startsWith('/api/') || path.startsWith('/_next/') || path === '/favicon.ico') {
      console.log('[Middleware] Allowing API/static route:', {
        path,
        timestamp,
        type: path.startsWith('/api/') ? 'api' : 'static'
      })
      return NextResponse.next()
    }

    // If on login page and has token, redirect to dashboard
    if (path === '/login' && token) {
      console.log('[Middleware] Authenticated user on login page:', {
        timestamp,
        userId: token.sub,
        role: token.role,
        redirectTo: '/dashboard'
      })
      const response = NextResponse.redirect(new URL('/dashboard', req.url))
      console.log('[Middleware] Redirect response created:', {
        timestamp,
        status: response.status,
        redirectUrl: response.headers.get('location')
      })
      return response
    }

    // If no token and not on login page, redirect to login
    if (!token && path !== '/login') {
      console.log('[Middleware] Unauthenticated access attempt:', {
        timestamp,
        path,
        headers: {
          referer: req.headers.get('referer')
        },
        redirectTo: '/login'
      })
      const response = NextResponse.redirect(new URL('/login', req.url))
      console.log('[Middleware] Redirect response created:', {
        timestamp,
        status: response.status,
        redirectUrl: response.headers.get('location')
      })
      return response
    }

    // If trying to access admin routes without admin role
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      console.log('[Middleware] Unauthorized admin access attempt:', {
        timestamp,
        path,
        userRole: token?.role,
        userId: token?.sub,
        redirectTo: '/dashboard'
      })
      const response = NextResponse.redirect(new URL('/dashboard', req.url))
      console.log('[Middleware] Redirect response created:', {
        timestamp,
        status: response.status,
        redirectUrl: response.headers.get('location')
      })
      return response
    }

    console.log('[Middleware] Request allowed:', {
      timestamp,
      path,
      userId: token?.sub,
      role: token?.role
    })
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        const timestamp = new Date().toISOString()
        console.log('[Middleware] Authorization check:', {
          timestamp,
          hasToken: !!token,
          tokenId: token?.sub,
          role: token?.role,
          expires: token?.exp ? new Date((token.exp as number) * 1000).toISOString() : null
        })
        // Let the middleware function handle the logic
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