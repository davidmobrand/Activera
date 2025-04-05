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
        <LoadingSpinner className="h-8 w-8 text-mindful-500" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  const categoryTranslation = t.category(category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-mindful-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-mindful-100 text-mindful-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {categoryTranslation.name}
          </div>
          <h1 className="font-display text-4xl text-mindful-800 mb-4">
            {t.common('welcome')} {t.common('to')} {categoryTranslation.name}
          </h1>
          <p className="text-lg text-mindful-600 max-w-2xl mx-auto">
            {categoryTranslation.description}
          </p>
        </div>

        <ExerciseList exercises={exercises} category={category} />
      </div>
    </div>
  )
} 