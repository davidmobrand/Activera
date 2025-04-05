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

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

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

      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-display text-mindful-800 mb-2">
            Welcome to ACTivera
          </h1>
          <p className="text-lg text-mindful-600 mb-8">
            Your journey to mindfulness begins here
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-mindful-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="bg-white/50"
              />
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="bg-white/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-mindful-600 hover:bg-mindful-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            {error && (
              <div className="bg-warmth-50 text-warmth-700 px-4 py-3 rounded-lg border border-warmth-200" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="bg-mindful-50 rounded-lg p-4 text-sm text-mindful-600 border border-mindful-100">
          <p className="font-medium mb-2">Demo Accounts</p>
          <p className="mb-1">Admin: admin@activera.com / admin123</p>
          <p>Client: client@example.com / client123</p>
        </div>
      </div>
    </div>
  )
} 