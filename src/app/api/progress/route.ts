import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const progress = await mockDb.exerciseProgress.findByUserId(session.user.id)
    return Response.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { exerciseId, completed } = await request.json()

    if (!exerciseId || typeof completed !== 'boolean') {
      return new Response('Missing required fields', { status: 400 })
    }

    const exercise = await mockDb.exercises.findById(exerciseId)
    if (!exercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    const progress = await mockDb.exerciseProgress.create({
      userId: session.user.id,
      exerciseId,
      completed,
      notes: '',
      startedAt: new Date(),
      completedAt: completed ? new Date() : undefined
    })

    return Response.json(progress)
  } catch (error) {
    console.error('Error creating progress:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 