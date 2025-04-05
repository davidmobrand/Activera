import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseDetail } from '@/components/exercises/ExerciseDetail'
import NotLoggedIn from '@/components/NotLoggedIn'
import type { PageProps } from '@/lib/types'

type Props = PageProps<{
  category: string
  id: string
}>

export default async function ExercisePage({ params, searchParams }: Props) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams])
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <NotLoggedIn />
  }

  const exercise = await mockDb.exercises.findById(resolvedParams.id)
  if (!exercise || exercise.category.toLowerCase() !== resolvedParams.category.toLowerCase()) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-act-50 to-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <ExerciseDetail exercise={exercise} />
      </div>
    </div>
  )
} 