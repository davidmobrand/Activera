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

  const exercise = await mockDb.exercises.findById(params.id)
  if (!exercise || exercise.category.toLowerCase() !== params.category.toLowerCase()) {
    return notFound()
  }

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 p-8">
          <ExerciseDetail exercise={exercise} />
        </div>
      </div>
    </div>
  )
} 