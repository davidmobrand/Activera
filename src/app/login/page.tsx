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
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Debug session state
  useEffect(() => {
    console.log('[Login] Environment:', process.env.NODE_ENV)
    console.log('[Login] Status:', status)
    console.log('[Login] Session:', session)
    console.log('[Login] Current URL:', window.location.href)
  }, [status, session])

  // Handle authenticated state
  useEffect(() => {
    if (status === 'authenticated' && !isRedirecting) {
      console.log('[Login] Auth effect triggered:', { status, isRedirecting })
      setIsRedirecting(true)

      // Force navigation to dashboard using window.location
      console.log('[Login] Forcing navigation to dashboard')
      window.location.href = '/dashboard'
    }
  }, [status, isRedirecting])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isLoading || isRedirecting) return

    setIsLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      console.log('[Login] Attempting sign in with email:', email)
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('[Login] Sign in result:', result)

      if (!result) {
        throw new Error('Sign in failed - no result returned')
      }

      if (result.error) {
        console.log('[Login] Sign in error:', result.error)
        setError('Invalid email or password')
        setIsLoading(false)
        return
      }

      // Success - let the useEffect handle redirection
      console.log('[Login] Sign in successful')
    } catch (error) {
      console.error('[Login] Sign in error:', error)
      setError('An error occurred. Please try again.')
      setIsLoading(false)
      setIsRedirecting(false)
    }
  }

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking session...</p>
        </div>
      </div>
    )
  }

  // If already authenticated, show redirecting state
  if (status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login form
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