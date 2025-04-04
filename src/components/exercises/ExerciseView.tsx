'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise } from '@/lib/mockData'

interface ExerciseViewProps {
  exercise: Exercise
  initialProgress?: boolean
}

export function ExerciseView({
  exercise,
  initialProgress = false,
}: ExerciseViewProps) {
  const [completed, setCompleted] = useState(initialProgress)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProgressUpdate = async () => {
    setIsUpdating(true)
    setError(null)
    
    try {
      // For now, just toggle the state since we're using mock data
      setCompleted(!completed)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to update progress')
      }
      console.error('Failed to update progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{exercise.title}</h2>
      
      <div className="prose max-w-none mb-6" 
        dangerouslySetInnerHTML={{ __html: exercise.content }} 
      />

      {/* Display media if available */}
      {exercise.media.length > 0 && (
        <div className="mb-6 space-y-4">
          {/* Display images */}
          {exercise.media.filter(m => m.type === 'IMAGE').map(image => (
            <div key={image.id}>
              <img
                src={image.url}
                alt={image.name}
                className="w-full max-h-96 object-contain rounded-lg"
              />
            </div>
          ))}
          
          {/* Display audio */}
          {exercise.media.filter(m => m.type === 'AUDIO').map(audio => (
            <div key={audio.id}>
              <audio controls src={audio.url} className="w-full" />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Button
          onClick={handleProgressUpdate}
          disabled={isUpdating}
          className="w-full sm:w-auto"
          variant={completed ? 'outline' : 'primary'}
        >
          {isUpdating ? (
            <>
              <LoadingSpinner className="mr-2" />
              Updating...
            </>
          ) : completed ? (
            'Mark as Incomplete'
          ) : (
            'Mark as Complete'
          )}
        </Button>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  )
} 