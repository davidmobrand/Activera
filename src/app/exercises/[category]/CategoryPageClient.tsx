'use client'

import { useEffect, useState, Suspense } from 'react'
import { Exercise, ExerciseCategoryEnum } from '@/lib/types'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import dynamic from 'next/dynamic'
import { mockDb } from '@/lib/mockData'

// Separate loading component for better code splitting
const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
    <LoadingSpinner className="h-12 w-12 text-act-600" />
  </div>
)

// Error display component
const ErrorDisplay = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Exercises</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  </div>
)

// Lazy load the ExerciseList component
const ExerciseList = dynamic(
  () => import('@/components/exercises/ExerciseList').then(mod => mod.ExerciseList),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner className="h-12 w-12 text-act-600" />
      </div>
    ),
    ssr: false
  }
)

type Props = {
  category: ExerciseCategoryEnum
  initialExercises: Exercise[]
}

// Separate category content component for better error isolation
function CategoryContent({ category, exercises }: { category: ExerciseCategoryEnum, exercises: Exercise[] }) {
  const { t } = useTranslation()
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

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 overflow-hidden p-6">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner className="h-12 w-12 text-act-600" />}>
              <ExerciseList exercises={exercises} category={category} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default function CategoryPageClient({ category, initialExercises }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadExercises() {
      try {
        setLoading(true)
        const data = await mockDb.exercises.findByCategory(category)
        if (mounted) {
          setExercises(data)
          setError(null)
        }
      } catch (error) {
        console.error('Error loading exercises:', error)
        if (mounted) {
          setError(error instanceof Error ? error : new Error('Failed to load exercises'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadExercises()

    return () => {
      mounted = false
    }
  }, [category])

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return (
    <ErrorBoundary>
      <CategoryContent category={category} exercises={exercises} />
    </ErrorBoundary>
  )
} 