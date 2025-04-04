'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function NewUser() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as string,
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      }

      router.push('/admin/users')
    } catch (error) {
      console.error('Error creating user:', error)
      setError(error instanceof Error ? error.message : 'Failed to create user')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            required
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            required
          >
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Create User'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/users')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
} 