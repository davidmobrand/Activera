'use client'

import { useSession } from 'next-auth/react'
import { notFound } from 'next/navigation'
import { ExerciseCategoryEnum } from '@/lib/types'
import { ExerciseList } from '@/components/exercises/ExerciseList'
import NotLoggedIn from '@/components/NotLoggedIn'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { mockDb } from '@/lib/mockData'
import { useEffect, useState } from 'react'
import { Exercise } from '@/lib/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Props {
  params: {
    category: string
  }
}

export default function ExerciseCategoryPage({ params }: Props) {
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)

  // Convert category string to enum
  const category = params.category.toUpperCase() as ExerciseCategoryEnum
  if (!Object.values(ExerciseCategoryEnum).includes(category)) {
    return notFound()
  }

  useEffect(() => {
    async function loadExercises() {
      try {
        const data = await mockDb.exercises.findByCategory(category)
        setExercises(data)
      } catch (error) {
        console.error('Error loading exercises:', error)
      } finally {
        setLoading(false)
      }
    }

    loadExercises()
  }, [category])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  const categoryTranslation = t.category(category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {categoryTranslation.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          {categoryTranslation.description}
        </p>
      </div>

      <ExerciseList exercises={exercises} category={category} />
    </div>
  )
} 