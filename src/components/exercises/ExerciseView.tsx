'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise, Media, MediaType } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

interface ExerciseViewProps {
  exercise: Exercise
  onComplete?: () => void
}

export function ExerciseView({ exercise, onComplete }: ExerciseViewProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const translation = exercise.translations[language]

  useEffect(() => {
    async function fetchMedia() {
      if (!exercise.mediaIds?.length) return;
      
      try {
        const mediaItems = await Promise.all(
          exercise.mediaIds.map(async (id) => {
            const response = await fetch(`/api/media/${id}`);
            if (!response.ok) throw new Error(`Failed to fetch media ${id}`);
            return response.json();
          })
        );
        setMedia(mediaItems);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    }

    fetchMedia();
  }, [exercise.mediaIds]);

  const handleComplete = async () => {
    try {
      setCompleted(true)
      onComplete?.()
    } catch (error) {
      console.error('Error marking exercise as complete:', error)
      setError(error instanceof Error ? error.message : 'Failed to mark exercise as complete')
      setCompleted(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="h-8 w-8 text-mindful-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
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

          {media.length > 0 && (
            <div className="mt-8 pt-6 border-t border-mindful-200">
              <h2 className="font-display text-2xl text-mindful-700 mb-4">
                {t.common('media')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-mindful-100">
                    {item.type === MediaType.IMAGE ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="p-4">
                        <audio
                          controls
                          src={item.url}
                          className="w-full"
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-warmth-50 text-warmth-700 px-4 py-3 rounded-lg border border-warmth-200">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-mindful-200 text-mindful-700 hover:bg-mindful-50"
        >
          {t.common('back')}
        </Button>
        <Button
          variant="primary"
          onClick={handleComplete}
          disabled={completed}
          className="bg-mindful-600 hover:bg-mindful-700 text-white"
        >
          {completed ? t.common('completed') : t.common('complete')}
        </Button>
      </div>
    </div>
  )
} 