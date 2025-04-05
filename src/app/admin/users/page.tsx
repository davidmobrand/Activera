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

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-mindful-50 to-white">
        <LoadingSpinner className="h-8 w-8 text-mindful-600" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-mindful-50 to-white">
        <div className="max-w-md w-full px-8 py-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-mindful-100 text-center">
          <h1 className="text-2xl font-display text-mindful-800 mb-4">{t.common('accessDenied')}</h1>
          <p className="text-mindful-600 mb-6">{t.common('adminPrivilegesRequired')}</p>
          <Button
            variant="primary"
            onClick={() => router.push('/dashboard')}
          >
            {t.common('goToDashboard')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display text-mindful-800">{t.common('manageUsers')}</h1>
        <Button 
          onClick={() => router.push('/admin/users/new')}
          variant="primary"
        >
          {t.common('createNewUser')}
        </Button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm shadow-soft border border-mindful-100 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-mindful-200">
          <thead className="bg-mindful-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-mindful-600 uppercase tracking-wider">
                {t.common('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mindful-600 uppercase tracking-wider">
                {t.common('email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mindful-600 uppercase tracking-wider">
                {t.common('role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-mindful-600 uppercase tracking-wider">
                {t.common('joined')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-mindful-600 uppercase tracking-wider">
                {t.common('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/60 divide-y divide-mindful-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-mindful-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-mindful-800">
                    {user.name || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-mindful-600">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${
                    user.role === UserRole.ADMIN ? 'text-warmth-600' : 'text-calm-600'
                  }`}>
                    {user.role}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-mindful-600">
                    {new Date(user.createdAt).toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-2"
                    onClick={() => router.push(`/admin/users/${user.id}`)}
                  >
                    {t.common('edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    {t.common('delete')}
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