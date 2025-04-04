import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { mockDb } from '@/lib/mockData'

interface CategoryProgress {
  category: string
  total: number
  completed: number
}

const categoryLabels = {
  NARVARO: 'Närvaro',
  OPPENHET: 'Öppenhet',
  ENGAGEMANG: 'Engagemang',
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/login')
  }

  // Fetch data server-side
  const exercises = mockDb.findExercises()
  const progressData = mockDb.findExerciseProgress(session.user.id)

  // Calculate progress
  const progressByCategory = exercises.reduce((acc: Record<string, CategoryProgress>, exercise) => {
    if (!acc[exercise.category]) {
      acc[exercise.category] = {
        category: exercise.category,
        total: 0,
        completed: 0,
      }
    }
    acc[exercise.category].total++
    if (progressData.some(p => p.exerciseId === exercise.id && p.completed)) {
      acc[exercise.category].completed++
    }
    return acc
  }, {} as Record<string, CategoryProgress>)

  const progress = Object.values(progressByCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {session.user.name || 'User'}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {progress.map((cat: CategoryProgress) => (
          <Link
            key={cat.category}
            href={`/exercises/${cat.category.toLowerCase()}`}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              {categoryLabels[cat.category as keyof typeof categoryLabels]}
            </h2>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${(cat.completed / cat.total) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {cat.completed} of {cat.total} completed
              </p>
            </div>
          </Link>
        ))}
      </div>

      {session.user.role === 'ADMIN' && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Admin Actions</h2>
          <div className="space-x-4">
            <Link
              href="/admin/exercises"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Manage Exercises
            </Link>
            <Link
              href="/admin/users"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Manage Users
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 