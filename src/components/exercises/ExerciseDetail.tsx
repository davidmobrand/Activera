'use client'

import { Exercise } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'
import { useTranslation } from '@/lib/i18n/useTranslation'

interface ExerciseDetailProps {
  exercise: Exercise
}

export function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const translation = exercise.translations[language]

  return (
    <div className="bg-gradient-mindful rounded-2xl p-8 shadow-soft">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-mindful-600 text-sm font-medium">
              {t.category(exercise.category).name}
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-mindful-600 text-sm font-medium">
              {exercise.difficulty}
            </div>
          </div>
          <span className="text-mindful-600 font-medium">#{exercise.order}</span>
        </div>

        <h1 className="font-display text-4xl text-mindful-800 mb-8">
          {translation.title}
        </h1>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-inner-lg mb-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-mindful-700
              prose-p:text-gray-700 prose-strong:text-mindful-700 prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-li:marker:text-mindful-400"
            dangerouslySetInnerHTML={{ __html: translation.content }}
          />
        </div>

        {translation.accessibility && (
          <div className="bg-calm-50 rounded-xl p-6 mb-6 border border-calm-100">
            <div 
              className="prose prose-calm max-w-none"
              dangerouslySetInnerHTML={{ __html: translation.accessibility }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translation.prerequisites && (
            <div className="bg-mindful-50 rounded-xl p-6 border border-mindful-100">
              <div 
                className="prose prose-mindful max-w-none"
                dangerouslySetInnerHTML={{ __html: translation.prerequisites }}
              />
            </div>
          )}

          {translation.progressIndicators && (
            <div className="bg-warmth-50 rounded-xl p-6 border border-warmth-100">
              <div 
                className="prose prose-warmth max-w-none"
                dangerouslySetInnerHTML={{ __html: translation.progressIndicators }}
              />
            </div>
          )}
        </div>

        {exercise.relatedExerciseIds && exercise.relatedExerciseIds.length > 0 && (
          <div className="mt-8 pt-6 border-t border-mindful-200">
            <h2 className="font-display text-2xl text-mindful-700 mb-4">
              {t.common('relatedExercises')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercise.relatedExerciseIds.map((id) => (
                <div key={id} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-mindful-100">
                  <span className="text-mindful-600 font-medium">Exercise #{id}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 