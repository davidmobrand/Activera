import { Exercise } from '@/lib/types'

interface ExerciseDetailProps {
  exercise: Exercise
}

export function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {exercise.title}
      </h1>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: exercise.content }}
      />

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Exercise #{exercise.order}
        </p>
      </div>
    </div>
  )
} 