'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Exercise as ExerciseType } from '@/lib/types'

export default function AdminExercises() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const [exercises, setExercises] = useState<ExerciseType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      fetchExercises()
    }
  }, [status])

  async function fetchExercises() {
    try {
      const response = await fetch('/api/exercises')
      const data = await response.json()
      setExercises(data)
    } catch (error) {
      console.error('Failed to fetch exercises:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteExercise(id: string) {
    if (!confirm(t.common('confirmDelete'))) return

    try {
      const response = await fetch(`/api/exercises/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete exercise')
      
      await fetchExercises()
    } catch (error) {
      console.error('Error deleting exercise:', error)
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.common('accessDenied')}</h1>
        <p className="text-gray-600">{t.common('adminPrivilegesRequired')}</p>
        <Button
          className="mt-4"
          onClick={() => router.push('/dashboard')}
        >
          {t.common('goToDashboard')}
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.common('manageExercises')}</h1>
        <Button onClick={() => router.push('/admin/exercises/new')}>
          {t.common('createNewExercise')}
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.common('title')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.common('category')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.common('order')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.common('lastUpdated')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.common('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <Link 
                      href={`/exercises/${exercise.category}/${exercise.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {exercise.translations[language].title}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <Link 
                      href={`/exercises/${exercise.category}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {t.category(exercise.category).name}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{exercise.order}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(exercise.updatedAt).toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => router.push(`/admin/exercises/${exercise.id}`)}
                  >
                    {t.common('edit')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => deleteExercise(exercise.id)}
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