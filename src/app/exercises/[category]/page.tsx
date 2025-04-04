import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseCategoryEnum } from '@/lib/types'
import { ExerciseList } from '@/components/exercises/ExerciseList'
import NotLoggedIn from '@/components/NotLoggedIn'

interface Props {
  params: {
    category: string
  }
}

export default async function ExerciseCategoryPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <NotLoggedIn />
  }

  // Convert category string to enum
  const category = params.category.toUpperCase() as ExerciseCategoryEnum
  if (!Object.values(ExerciseCategoryEnum).includes(category)) {
    return notFound()
  }

  const exercises = await mockDb.exercises.findByCategory(category)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {category} Exercises
        </h1>
      </div>

      <ExerciseList exercises={exercises} category={category} />
    </div>
  )
} 