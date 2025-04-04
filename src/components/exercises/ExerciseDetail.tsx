'use client'

import { Exercise } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'

interface ExerciseDetailProps {
  exercise: Exercise
}

export function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  const { language } = useLanguage()
  const translation = exercise.translations[language]

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