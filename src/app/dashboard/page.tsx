'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CategoryProgress {
  category: string
  total: number
  completed: number
}

const categoryLabels = {
  NARVARO: 'Närvaro',
  OPPENHET: 'Öppenhet',
  ENGAGEMANG: 'Engagemang',
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [progress, setProgress] = useState<CategoryProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('Dashboard session status:', status)
    console.log('Dashboard session data:', session)
    
    if (status === 'unauthenticated') {
      console.log('Redirecting to login...')
      router.replace('/login')
    } else if (status === 'authenticated') {
      console.log('Fetching progress...')
      fetchProgress()
    }
  }, [status, router, session])

  async function fetchProgress() {
    try {
      setIsLoading(true)
      const [exercisesRes, progressRes] = await Promise.all([
        fetch('/api/exercises'),
        fetch('/api/progress'),
      ])

      if (!exercisesRes.ok || !progressRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const exercises = await exercisesRes.json()
      const progressData = await progressRes.json()

      console.log('Exercises:', exercises)
      console.log('Progress data:', progressData)

      const progressByCategory = exercises.reduce((acc: Record<string, CategoryProgress>, exercise: any) => {
        if (!acc[exercise.category]) {
          acc[exercise.category] = {
            category: exercise.category,
            total: 0,
            completed: 0,
          }
        }
        acc[exercise.category].total++
        if (progressData.some((p: any) => p.exerciseId === exercise.id && p.completed)) {
          acc[exercise.category].completed++
        }
        return acc
      }, {})

      setProgress(Object.values(progressByCategory))
    } catch (error) {
      console.error('Failed to fetch progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {session?.user?.name || 'User'}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {progress.map((cat) => (
          <Link
            key={cat.category}
            href={`/exercises/${cat.category.toLowerCase()}`}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              {categoryLabels[cat.category as keyof typeof categoryLabels]}
            </h2>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${(cat.completed / cat.total) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {cat.completed} of {cat.total} completed
              </p>
            </div>
          </Link>
        ))}
      </div>

      {session?.user?.role === 'ADMIN' && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Admin Actions</h2>
          <div className="space-x-4">
            <Link
              href="/admin/exercises"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Manage Exercises
            </Link>
            <Link
              href="/admin/users"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Manage Users
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 