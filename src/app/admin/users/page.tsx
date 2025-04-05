'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { User, UserRole } from '@/lib/types'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function AdminUsers() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const { language } = useLanguage()

  useEffect(() => {
    if (status !== 'loading') {
      fetchUsers()
    }
  }, [status])

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
    if (!confirm(t.common('confirmDelete'))) return

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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
        <LoadingSpinner className="h-12 w-12 text-act-600" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-act-50 to-white p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-act-100 text-center max-w-md w-full">
          <h1 className="text-2xl font-display text-act-800 mb-4">
            {t.common('accessDenied')}
          </h1>
          <p className="text-act-600 mb-6">
            {t.common('adminPrivilegesRequired')}
          </p>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="primary"
          >
            {t.common('goToDashboard')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl sm:text-3xl font-display text-act-800">
            {t.common('manageUsers')}
          </h1>
          <Button 
            onClick={() => router.push('/admin/users/new')}
            variant="primary"
            className="w-full sm:w-auto"
          >
            {t.common('createNewUser')}
          </Button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-act-200">
              <thead className="bg-act-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-medium text-act-700">
                    {t.common('name')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-medium text-act-700">
                    {t.common('email')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-medium text-act-700">
                    {t.common('role')}
                  </th>
                  <th className="px-6 py-4 text-left text-xs sm:text-sm font-medium text-act-700">
                    {t.common('joined')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs sm:text-sm font-medium text-act-700">
                    {t.common('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-act-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-act-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-xs sm:text-sm font-medium text-act-800">
                        {user.name || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs sm:text-sm text-act-600">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-xs sm:text-sm ${
                        user.role === UserRole.ADMIN ? 'text-warmth-600' : 'text-sage-600'
                      }`}>
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs sm:text-sm text-act-600">
                        {new Date(user.createdAt).toLocaleDateString(
                          language === 'sv' ? 'sv-SE' : 'en-US'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 justify-end">
                        <Button
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                          variant="secondary"
                          className="text-xs sm:text-sm"
                        >
                          {t.common('edit')}
                        </Button>
                        <Button
                          onClick={() => deleteUser(user.id)}
                          variant="outline"
                          className="text-xs sm:text-sm text-warmth-600 hover:bg-warmth-50 hover:text-warmth-700 hover:border-warmth-300"
                        >
                          {t.common('delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 