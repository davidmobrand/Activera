'use client'

import Link from 'next/link'
import { Exercise, ExerciseCategoryEnum } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

interface ExerciseListProps {
  exercises: Exercise[]
  category: ExerciseCategoryEnum
}

export function ExerciseList({ exercises, category }: ExerciseListProps) {
  const { language } = useLanguage()

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <Link
          key={exercise.id}
          href={`/exercises/${category.toLowerCase()}/${exercise.id}`}
          className="block"
        >
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {exercise.translations[language].title}
            </h2>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Exercise #{exercise.order}
              </span>
            </div>
          </div>
        </Link>
      ))}

      {exercises.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          No exercises found in this category.
        </p>
      )}
    </div>
  )
} 