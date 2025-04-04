'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { Exercise } from '@/lib/mockData'

const categoryLabels = {
  NARVARO: 'Närvaro',
  OPPENHET: 'Öppenhet',
  ENGAGEMANG: 'Engagemang',
}

export default function AdminExercises() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [exercises, setExercises] = useState<Exercise[]>([])
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
    if (!confirm('Are you sure you want to delete this exercise?')) return

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
    router.push('/dashboard')
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Exercises</h1>
        <Button onClick={() => router.push('/admin/exercises/new')}>
          Create New Exercise
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exercises.map((exercise) => (
              <tr key={exercise.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {exercise.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {categoryLabels[exercise.category as keyof typeof categoryLabels]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {(exercise as any).order || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(exercise.updatedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => router.push(`/admin/exercises/${exercise.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => deleteExercise(exercise.id)}
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