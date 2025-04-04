import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseForm } from '@/components/admin/ExerciseForm'

interface Props {
  params: {
    id: string
  }
}

export default async function EditExercisePage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const exercise = await mockDb.exercises.findById(params.id)
  if (!exercise) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Edit Exercise: {exercise.translations.en.title}
      </h1>

      <ExerciseForm exercise={exercise} />
    </div>
  )
} 