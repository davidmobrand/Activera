import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseDetail } from '@/components/exercises/ExerciseDetail'
import NotLoggedIn from '@/components/NotLoggedIn'

interface Props {
  params: {
    category: string
    id: string
  }
}

export default async function ExercisePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <NotLoggedIn />
  }

  const exercise = mockDb.findExerciseById(params.id)
  if (!exercise || exercise.category.toLowerCase() !== params.category.toLowerCase()) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ExerciseDetail exercise={exercise} />
    </div>
  )
} 