'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Exercise } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/types'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

interface ExerciseDetailProps {
  exercise: Exercise
}

export function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [relatedExercises, setRelatedExercises] = useState<Exercise[]>([])
  const translation = exercise.translations[language]

  const isAdmin = session?.user?.role === 'ADMIN'

  const handleDelete = async () => {
    if (!confirm(t.common('confirmDelete'))) return

    try {
      const response = await fetch(`/api/exercises/${exercise.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete exercise')
      
      router.push('/admin/exercises')
    } catch (error) {
      console.error('Error deleting exercise:', error)
    }
  }

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
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100">
      <div className="p-3 sm:p-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="bg-white/80 backdrop-blur-sm py-1 rounded-full text-mindful-600 text-xs sm:text-sm font-medium pl-0">
            {t.category(exercise.category).name}
          </div>
          <div className="bg-white/80 backdrop-blur-sm py-1 rounded-full text-mindful-600 text-xs sm:text-sm font-medium pr-0">
            {exercise.difficulty}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-mindful-800 mb-4 sm:mb-0">
            {translation.title}
          </h1>
          {isAdmin && (
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                onClick={() => router.push(`/admin/exercises/${exercise.id}`)}
                variant="secondary"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {t.common('edit')}
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {t.common('delete')}
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-inner-lg">
          <div className="prose prose-base sm:prose-lg max-w-none prose-headings:font-display prose-headings:text-mindful-700
            prose-p:text-gray-700 prose-strong:text-mindful-700 prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:marker:text-mindful-400">
            <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mb-4">{t.common('introduction')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.introduction }} />

            <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mt-6 sm:mt-8 mb-4">{t.common('duration')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.duration }} />

            <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mt-6 sm:mt-8 mb-4">{t.common('benefits')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.benefits }} />

            <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mt-6 sm:mt-8 mb-4">{t.common('instructions')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.instructions }} />

            <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mt-6 sm:mt-8 mb-4">{t.common('tips')}</h2>
            <div dangerouslySetInnerHTML={{ __html: translation.tips }} />
          </div>
        </div>

        {translation.accessibility && (
          <div className="bg-calm-50 rounded-xl p-4 sm:p-6 mb-6 border border-calm-100">
            <h2 className="text-xl sm:text-2xl font-display text-calm-700 mb-4">{t.common('accessibility')}</h2>
            <div 
              className="prose prose-base sm:prose-lg prose-calm max-w-none"
              dangerouslySetInnerHTML={{ __html: translation.accessibility }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {translation.prerequisites && (
            <div className="bg-mindful-50 rounded-xl p-4 sm:p-6 border border-mindful-100">
              <h2 className="text-xl sm:text-2xl font-display text-mindful-700 mb-4">{t.common('prerequisites')}</h2>
              <div 
                className="prose prose-base sm:prose-lg prose-mindful max-w-none"
                dangerouslySetInnerHTML={{ __html: translation.prerequisites }}
              />
            </div>
          )}

          {translation.progressIndicators && (
            <div className="bg-warmth-50 rounded-xl p-4 sm:p-6 border border-warmth-100">
              <h2 className="text-xl sm:text-2xl font-display text-warmth-700 mb-4">{t.common('progressIndicators')}</h2>
              <div 
                className="prose prose-base sm:prose-lg prose-warmth max-w-none"
                dangerouslySetInnerHTML={{ __html: translation.progressIndicators }}
              />
            </div>
          )}
        </div>

        {relatedExercises.length > 0 && (
          <div className="mt-8 pt-6 border-t border-mindful-200">
            <h2 className="font-display text-xl sm:text-2xl text-mindful-700 mb-4">
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
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-medium text-base sm:text-lg text-mindful-800 group-hover:text-mindful-600 transition-colors">
                          {relatedExercise.translations[language].title}
                        </h3>
                        <p className="text-xs sm:text-sm text-mindful-600">
                          {t.category(relatedExercise.category).name}
                        </p>
                      </div>
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