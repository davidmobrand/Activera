'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
  const [relatedExercises, setRelatedExercises] = useState<Exercise[]>([])
  const translation = exercise.translations[language]

  useEffect(() => {
    async function fetchRelatedExercises() {
      if (!exercise.relatedExerciseIds?.length) return
      
      try {
        const exercises = await Promise.all(
          exercise.relatedExerciseIds.map(async (id) => {
            const response = await fetch(`/api/exercises/${id}`)
            if (!response.ok) throw new Error(`Failed to fetch exercise ${id}`)
            return response.json()
          })
        )
        setRelatedExercises(exercises)
      } catch (error) {
        console.error('Error fetching related exercises:', error)
      }
    }

    fetchRelatedExercises()
  }, [exercise.relatedExerciseIds])

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
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-mindful-700
            prose-p:text-gray-700 prose-strong:text-mindful-700 prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:marker:text-mindful-400">
            <h2>{t.common('introduction')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.introduction }} />

            <h2>{t.common('duration')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.duration }} />

            <h2>{t.common('benefits')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.benefits }} />

            <h2>{t.common('instructions')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.instructions }} />

            <h2>{t.common('tips')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.tips }} />
          </div>
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
              {relatedExercises.map((relatedExercise) => (
                <Link
                  key={relatedExercise.id}
                  href={`/exercises/${relatedExercise.category.toLowerCase()}/${relatedExercise.id}`}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-mindful-100 hover:border-mindful-200 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-mindful-800 group-hover:text-mindful-600 transition-colors">
                          {relatedExercise.translations[language].title}
                        </h3>
                        <p className="text-sm text-mindful-600">
                          {t.category(relatedExercise.category).name}
                        </p>
                      </div>
                      <span className="text-sm text-mindful-500">#{relatedExercise.order}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 