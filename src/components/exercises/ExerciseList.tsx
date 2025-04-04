import Link from 'next/link'
import { Exercise } from '@/lib/types'

interface ExerciseListProps {
  exercises: Exercise[]
  category: string
}

export function ExerciseList({ exercises, category }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <Link
          key={exercise.id}
          href={`/exercises/${category.toLowerCase()}/${exercise.id}`}
          className="block"
        >
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {exercise.title}
            </h2>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Exercise #{exercise.order}
              </span>
            </div>
          </div>
        </Link>
      ))}

      {exercises.length === 0 && (
        <p className="text-gray-600 text-center py-8">
          No exercises found in this category.
        </p>
      )}
    </div>
  )
} 