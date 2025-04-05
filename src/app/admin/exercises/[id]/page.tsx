import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseForm } from '@/components/admin/ExerciseForm'
import NotLoggedIn from '@/components/NotLoggedIn'
import type { PageProps } from '@/lib/types'

type Props = PageProps<{
  id: string
}>

export default async function EditExercisePage({ params, searchParams }: Props) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams])
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const exercise = await mockDb.exercises.findById(resolvedParams.id)
  if (!exercise) {
    return notFound()
  }

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 p-8">
          <ExerciseForm exercise={exercise} />
        </div>
      </div>
    </div>
  )
} 