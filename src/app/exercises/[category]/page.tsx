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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
        <LoadingSpinner className="h-12 w-12 text-act-600" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  const categoryTranslation = t.category(category)

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-act-100 text-act-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {categoryTranslation.name}
          </div>
          <h1 className="font-display text-4xl text-act-800 mb-4">
            {t.common('welcome')} {t.common('to')} {categoryTranslation.name}
          </h1>
          <p className="text-lg text-act-600 max-w-2xl mx-auto">
            {categoryTranslation.description}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 overflow-hidden">
          <ExerciseList exercises={exercises} category={category} />
        </div>
      </div>
    </div>
  )
} 