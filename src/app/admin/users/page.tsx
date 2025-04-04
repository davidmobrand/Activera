'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
}

export default function AdminUsers() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteUser(id: string) {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete user')
      
      await fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  async function toggleRole(user: User) {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: user.role === 'ADMIN' ? 'CLIENT' : 'ADMIN',
        }),
      })

      if (!response.ok) throw new Error('Failed to update user role')
      
      await fetchUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <Button onClick={() => router.push('/admin/users/new')}>
          Create New User
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name || 'No name'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'ADMIN'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => toggleRole(user)}
                  >
                    Make {user.role === 'ADMIN' ? 'Client' : 'Admin'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 