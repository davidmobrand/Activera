import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseList } from '@/components/exercises/ExerciseList'
import NotLoggedIn from '@/components/NotLoggedIn'
import { ExerciseCategory, ExerciseCategoryDisplay, ExerciseCategoryDescription } from '@/lib/types'

const validCategories = Object.values(ExerciseCategory)
type Category = typeof validCategories[number]

const categoryMap = {
  'oppenhet': ExerciseCategory.OPPENHET,
  'narvaro': ExerciseCategory.NARVARO,
  'engagemang': ExerciseCategory.ENGAGEMANG,
} as const

interface Props {
  params: {
    category: string
  }
}

export default async function ExercisesPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <NotLoggedIn />
  }

  const category = categoryMap[params.category as keyof typeof categoryMap]
  if (!validCategories.includes(category)) {
    return notFound()
  }

  const exercises = await mockDb.findExercisesByCategory(category)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{ExerciseCategoryDisplay[category]}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {ExerciseCategoryDescription[category]}
        </p>
      </div>
      <ExerciseList exercises={exercises} category={category} />
    </div>
  )
} 