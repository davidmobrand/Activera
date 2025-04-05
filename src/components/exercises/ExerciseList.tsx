'use client'

import Link from 'next/link'
import { Exercise, ExerciseCategoryEnum } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

// Helper function to strip HTML tags and decode entities
function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

interface ExerciseListProps {
  exercises: Exercise[]
  category: ExerciseCategoryEnum
}

export function ExerciseList({ exercises, category }: ExerciseListProps) {
  const { language } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exercises.map((exercise) => (
        <Link
          key={exercise.id}
          href={`/exercises/${category.toLowerCase()}/${exercise.id}`}
          className="block group"
        >
          <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-mindful-100 hover:border-mindful-200 transform hover:-translate-y-1">
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-display text-mindful-800 mb-3 group-hover:text-mindful-600 transition-colors">
                {exercise.translations[language].title}
              </h2>
              <p className="text-mindful-600 text-sm mb-4 line-clamp-3">
                {stripHtml(exercise.translations[language].introduction)}
              </p>
              <div className="mt-auto flex items-center justify-end pt-4 border-t border-mindful-100">
                <div className="bg-mindful-50 text-mindful-600 px-3 py-1 rounded-full text-sm font-medium">
                  {exercise.difficulty}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {exercises.length === 0 && (
        <div className="col-span-full">
          <div className="text-center py-12 bg-mindful-50 rounded-xl border border-mindful-100">
            <p className="text-mindful-600 text-lg">
              No exercises found in this category.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 