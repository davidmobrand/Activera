import { ExerciseCategoryEnum } from '@/lib/constants/categories'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotLoggedIn from '@/components/NotLoggedIn'
import { mockDb } from '@/lib/mockData'
import CategoryPageClient from './CategoryPageClient'

type Props = {
  params: Promise<{
    category: string
  }>
}

export default async function ExerciseCategoryPage({ params }: Props) {
  const [resolvedParams, session] = await Promise.all([
    params,
    getServerSession(authOptions)
  ])

  if (!session?.user?.id) {
    return <NotLoggedIn />
  }

  const category = resolvedParams.category.toUpperCase() as ExerciseCategoryEnum
  if (!Object.values(ExerciseCategoryEnum).includes(category)) {
    return notFound()
  }

  const exercises = await mockDb.exercises.findByCategory(category)

  return <CategoryPageClient category={category} initialExercises={exercises} />
} 