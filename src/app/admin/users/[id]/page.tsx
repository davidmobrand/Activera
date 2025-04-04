'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { User, UserRole } from '@/lib/mockData'

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: 'ADMIN' | 'CLIENT';
  }>({
    name: '',
    email: '',
    role: 'CLIENT'
  })

  useEffect(() => {
    if (status !== 'loading') {
      fetchUser()
    }
  }, [status, params.id])

  async function fetchUser() {
    try {
      const response = await fetch(`/api/users/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      const data = await response.json()
      setUser(data)
      setFormData({
        name: data.name || '',
        email: data.email,
        role: data.role
      })
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to update user')
      
      router.push('/admin/users')
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
        <Button
          className="mt-4"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
        <Button
          className="mt-4"
          onClick={() => router.push('/admin/users')}
        >
          Back to Users
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/admin/users')}
        >
          Back to Users
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'CLIENT' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={UserRole.CLIENT}>Client</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/users')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
} 