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
  const [hasRedirected, setHasRedirected] = useState(false)

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
    hasRedirected,
    currentUrl: typeof window !== 'undefined' ? window.location.href : 'SSR',
    searchParams: searchParams ? Object.fromEntries(searchParams.entries()) : {}
  })

  useEffect(() => {
    if (status === 'authenticated' && !hasRedirected) {
      console.log('[Login] Authenticated and not yet redirected, initiating redirect')
      setHasRedirected(true)
      
      // Use window.location for a hard redirect
      window.location.href = '/dashboard'
    }
  }, [status, hasRedirected])

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
      }
    } catch (error) {
      console.error('[Login] Sign in error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      console.log('[Login] Completing login attempt')
      setIsLoading(false)
    }
  }

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
            Session authenticated, redirecting to dashboard...
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