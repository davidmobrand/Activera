'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [redirectAttempts, setRedirectAttempts] = useState(0)

  // Debug session object in detail
  useEffect(() => {
    if (session) {
      console.log('[Login] Detailed session info:', {
        user: session.user,
        expires: session.expires,
        role: session.user?.role
      })
    }
  }, [session])

  // Log every render with detailed component state
  console.log('[Login] Component rendered:', {
    status,
    session: session ? {
      exists: true,
      user: session.user,
      expires: session.expires
    } : null,
    error,
    isLoading,
    currentUrl: typeof window !== 'undefined' ? window.location.href : 'SSR',
    searchParams: searchParams ? Object.fromEntries(searchParams.entries()) : {},
    redirectAttempts
  })

  useEffect(() => {
    console.log('[Login] Session effect triggered:', {
      status,
      hasSession: !!session,
      sessionExpiry: session?.expires,
      error,
      isLoading,
      redirectAttempts
    })

    if (status === 'authenticated') {
      console.log('[Login] Authenticated, preparing redirect')
      
      // Add delay to ensure session is fully established
      setTimeout(() => {
        try {
          console.log('[Login] Executing redirect to dashboard')
          setRedirectAttempts(prev => prev + 1)
          
          // Force a hard navigation
          if (redirectAttempts >= 2) {
            console.log('[Login] Multiple redirect attempts detected, forcing hard navigation')
            window.location.href = '/dashboard'
            return
          }

          router.push('/dashboard')
          console.log('[Login] Soft redirect initiated via router.push')
          
          // Add a fallback redirect
          setTimeout(() => {
            if (window.location.pathname === '/login') {
              console.log('[Login] Still on login page after redirect attempt, forcing navigation')
              window.location.href = '/dashboard'
            }
          }, 1000)
        } catch (e) {
          console.error('[Login] Redirect failed:', e)
        }
      }, 500)
    }
  }, [status, session, router, error, isLoading, redirectAttempts])

  // Monitor URL changes
  useEffect(() => {
    const handleRouteChange = () => {
      console.log('[Login] URL changed:', {
        pathname: window.location.pathname,
        search: window.location.search,
        href: window.location.href
      })
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('[Login] Form submitted')

    if (isLoading) {
      console.log('[Login] Submission blocked - already loading')
      return
    }

    setIsLoading(true)
    setError('')
    console.log('[Login] Starting login process')

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      console.log('[Login] Calling signIn with credentials:', { 
        email,
        callbackUrl: '/dashboard',
        timestamp: new Date().toISOString()
      })

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      console.log('[Login] Sign in result:', {
        ok: result?.ok,
        error: result?.error,
        url: result?.url,
        status: result?.status,
        timestamp: new Date().toISOString()
      })

      if (!result) {
        console.error('[Login] No result returned from signIn')
        throw new Error('Sign in failed - no result returned')
      }

      if (result.error) {
        console.log('[Login] Sign in returned error:', result.error)
        setError('Invalid email or password')
        return
      }

      if (result.ok) {
        console.log('[Login] Sign in successful, session update expected')
        // Reset redirect attempts on new login
        setRedirectAttempts(0)
      }
    } catch (error) {
      console.error('[Login] Sign in error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      console.log('[Login] Completing login attempt')
      setIsLoading(false)
    }
  }

  // Log state changes with timestamps
  useEffect(() => {
    console.log('[Login] State changed:', {
      error,
      isLoading,
      status,
      hasSession: !!session,
      timestamp: new Date().toISOString(),
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'SSR'
    })
  }, [error, isLoading, status, session])

  if (status === 'loading') {
    console.log('[Login] Rendering loading state')
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking session state...</p>
        </div>
      </div>
    )
  }

  if (status === 'authenticated') {
    console.log('[Login] Rendering authenticated state')
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Session authenticated ({redirectAttempts} redirect attempts)...
            {redirectAttempts >= 2 ? ' Forcing navigation...' : ' Redirecting...'}
          </p>
        </div>
      </div>
    )
  }

  console.log('[Login] Rendering login form')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to ACTivera
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={error}
              disabled={isLoading}
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
} 