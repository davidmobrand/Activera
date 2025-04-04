'use client'

import { Exercise } from '@/lib/types'
import { useLanguage, Language } from '@/lib/hooks/useLanguage'

interface ExerciseDetailProps {
  exercise: Exercise
}

export function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  const { currentLanguage } = useLanguage()
  const translation = exercise.translations[currentLanguage as Language]

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {translation.title}
      </h1>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: translation.content }}
      />

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Exercise #{exercise.order}
        </p>
      </div>
    </div>
  )
} 