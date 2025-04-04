import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb, ExerciseCategory } from '@/lib/mockData'
import { ExerciseList } from '@/components/exercises/ExerciseList'
import NotLoggedIn from '@/components/NotLoggedIn'

const validCategories = Object.values(ExerciseCategory)
type Category = typeof validCategories[number]

interface Props {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <NotLoggedIn />
  }

  const category = params.category.toUpperCase() as ExerciseCategory
  if (!validCategories.includes(category)) {
    return notFound()
  }

  const exercises = mockDb.findExercisesByCategory(category)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category.charAt(0) + category.slice(1).toLowerCase()} Exercises
      </h1>

      <ExerciseList exercises={exercises} category={category} />
    </div>
  )
} 