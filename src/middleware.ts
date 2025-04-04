import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Always allow API routes and static files
    if (path.startsWith('/api/') || path.startsWith('/_next/') || path === '/favicon.ico') {
      return NextResponse.next()
    }

    // If on login page and has token, redirect to dashboard
    if (path === '/login' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If no token and not on login page, redirect to login
    if (!token && path !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // If trying to access admin routes without admin role
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
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
} 