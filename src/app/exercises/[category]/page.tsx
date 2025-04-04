import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseView } from '@/components/exercises/ExerciseView'

const validCategories = ['OPPENHET', 'NARVARO', 'ENGAGEMANG'] as const
type Category = typeof validCategories[number]

interface Props {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return notFound()

  const category = params.category.toUpperCase()
  if (!validCategories.includes(category as Category)) {
    return notFound()
  }

  const exercises = mockDb.findExercisesByCategory(category)
  const progress = mockDb.findExerciseProgress(session.user.id)
  const progressMap = new Map(progress.map(p => [p.exerciseId, p.completed]))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category.charAt(0) + category.slice(1).toLowerCase()} Exercises
      </h1>

      <div className="space-y-8">
        {exercises.map(exercise => (
          <ExerciseView
            key={exercise.id}
            exercise={exercise}
            initialProgress={progressMap.get(exercise.id) || false}
          />
        ))}

        {exercises.length === 0 && (
          <p className="text-gray-600 text-center py-8">
            No exercises found in this category.
          </p>
        )}
      </div>
    </div>
  )
} 