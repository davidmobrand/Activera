'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white">
        <LoadingSpinner className="h-12 w-12 text-mindful-600" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mindful-50 to-white p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-mindful-100 text-center max-w-md w-full">
          <h1 className="text-2xl font-display text-mindful-800 mb-4">
            {t.common('accessDenied')}
          </h1>
          <p className="text-mindful-600 mb-6">
            {t.common('adminPrivilegesRequired')}
          </p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-mindful-600 hover:bg-mindful-700 text-white"
          >
            {t.common('goToDashboard')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gradient-to-b from-mindful-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display text-mindful-800">
            {t.common('manageExercises')}
          </h1>
          <Button 
            onClick={() => router.push('/admin/exercises/new')}
            className="bg-mindful-600 hover:bg-mindful-700 text-white"
          >
            {t.common('createNewExercise')}
          </Button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-mindful-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-mindful-200">
              <thead className="bg-mindful-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mindful-700">
                    {t.common('title')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mindful-700">
                    {t.common('category')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mindful-700">
                    {t.common('order')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-mindful-700">
                    {t.common('lastUpdated')}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-mindful-700">
                    {t.common('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mindful-200 bg-white">
                {exercises.map((exercise) => (
                  <tr key={exercise.id} className="hover:bg-mindful-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-mindful-800">
                      <div className="text-sm font-medium">
                        {exercise.translations[language].title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-mindful-600">
                      <div className="text-sm">
                        {t.category(exercise.category).name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-mindful-600">
                      <div className="text-sm">{exercise.order}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-mindful-600">
                      <div className="text-sm">
                        {new Date(exercise.updatedAt).toLocaleDateString(
                          language === 'sv' ? 'sv-SE' : 'en-US'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <Button
                        onClick={() => router.push(`/admin/exercises/${exercise.id}`)}
                        className="bg-mindful-100 hover:bg-mindful-200 text-mindful-700"
                      >
                        {t.common('edit')}
                      </Button>
                      <Button
                        onClick={() => deleteExercise(exercise.id)}
                        className="bg-warmth-100 hover:bg-warmth-200 text-warmth-700"
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
      </div>
    </div>
  )
} 