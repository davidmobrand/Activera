'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise, Media, MediaType } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { useLanguage } from '@/lib/hooks/useLanguage'

interface ExerciseViewProps {
  exercise: Exercise
  onComplete?: () => void
}

export function ExerciseView({ exercise, onComplete }: ExerciseViewProps) {
  const router = useRouter()
  const { currentLanguage } = useLanguage()
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    async function loadMedia() {
      try {
        setLoading(true)
        setError(null)
        const exerciseMedia = await mockDb.media.findByExerciseId(exercise.id)
        setMedia(exerciseMedia)
      } catch (error) {
        console.error('Error loading media:', error)
        setError(error instanceof Error ? error.message : 'Failed to load media')
      } finally {
        setLoading(false)
      }
    }

    loadMedia()
  }, [exercise.id])

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
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  const translation = exercise.translations[currentLanguage]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {translation.title}
      </h1>

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: translation.content }}
      />

      {media.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {media.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden">
                {item.type === MediaType.IMAGE ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-auto"
                  />
                ) : (
                  <audio
                    controls
                    src={item.url}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? 'Completed' : 'Mark as Complete'}
        </Button>
      </div>
    </div>
  )
} 