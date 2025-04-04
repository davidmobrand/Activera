'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      if (!email || !password) {
        setError('Please provide both email and password')
        setIsLoading(false)
        return
      }

      console.log('[Login] Attempting sign in:', { email })

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      console.log('[Login] Sign in result:', result)

      if (!result) {
        setError('An unexpected error occurred')
        setIsLoading(false)
        return
      }

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Only redirect after successful sign in
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('[Login] Error:', error)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to ACTivera
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Admin: admin@activera.com / admin123
            <br />
            Client: client@example.com / client123
          </p>
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
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
} 